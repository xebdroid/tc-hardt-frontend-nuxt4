<?php
// Fehleranzeige für Debugging (auf dem Live-Server später ggf. ausschalten)
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS erlauben (wichtig, falls Nuxt und PHP unterschiedliche Origins haben)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Methode nicht erlaubt"]);
    exit;
}

// 1. Manuelles Einbinden der PHPMailer Klassen
// Achte darauf, dass der Ordner "PHPMailer" im gleichen Verzeichnis liegt
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// --- ENVIRONMENT VARIABLEN LADEN ---
// Das Passwort wird via GitHub Actions in diese Datei geschrieben
$envFile = __DIR__ . '/env.php';
if (!file_exists($envFile)) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Server-Konfiguration fehlt (env.php)."]);
    exit;
}
$env = require $envFile;
$smtpPassword = isset($env['smtp_pass']) ? $env['smtp_pass'] : '';
$smtpUser = isset($env['smtp_user']) ? $env['smtp_user'] : 'kontakt@tc-hardt.de';
$smtpHost = isset($env['smtp_host']) ? $env['smtp_host'] : 'mx2fcf.netcup.net';

if (empty($smtpPassword)) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "SMTP Passwort ist nicht konfiguriert."]);
    exit;
}

// 2. Daten einlesen
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// --- VALIDIERUNG & SICHERHEIT ---

// A. Honeypot (Bot-Schutz)
// Wenn das unsichtbare Feld "website" gefüllt ist, ist es ein Bot.
if (!empty($data['website'])) {
    // Wir täuschen Erfolg vor, damit der Bot nicht weitersucht
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(["success" => true, "message" => "Nachricht erfolgreich gesendet!"]);
    exit;
}

// Form-Typ ermitteln (Standard ist Kontakt)
$formType = isset($data['formType']) ? $data['formType'] : 'contact';

// B. Pflichtfelder prüfen & Variablen vorbereiten
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$messageText = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

$mailSubject = "";
$mailBody = "";
$recipient = "info@tc-hardt.de";
$replyToEmail = "info@tc-hardt.de"; // Standard-Reply-To
$replyToName = "Website Besucher";

if ($formType === 'jubilaeum') {
    // Validierung Jubiläum
    $ticketCount = isset($data['ticketCount']) ? (int)$data['ticketCount'] : 0;
    $ticketType = isset($data['ticketType']) ? strip_tags(trim($data['ticketType'])) : '';
    $paymentMethod = isset($data['paymentMethod']) ? strip_tags(trim($data['paymentMethod'])) : '';

    if (empty($name) || $ticketCount <= 0 || empty($ticketType) || empty($paymentMethod)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Bitte füllen Sie alle erforderlichen Felder aus."]);
        exit;
    }

    $recipient = isset($data['to']) ? strip_tags(trim($data['to'])) : 'jubilaeum@tc-hardt.de';
    $mailSubject = "Neue Anmeldung zum Jubilaeum: $name";

    $ticketTypeLabel = $ticketType === 'student' ? 'Student / Schüler' : 'Normalzahler';
    $paymentLabel = $paymentMethod === 'invoice' ? 'Auf TC Hardt Rechnung setzen' : 'Barbezahlung';

    $mailBody = "Neue Anmeldung zur Jubilaeumsfeier:\n\n" .
                "Name: $name\n" .
                "Anzahl der Tickets: $ticketCount\n" .
                "Ticketart: $ticketTypeLabel\n" .
                "Zahlungsart: $paymentLabel\n\n" .
                "Persönliche Nachricht:\n" .
                (!empty($messageText) ? $messageText : "- keine -") . "\n\n" .
                "--------------------------------------------------\n" .
                "Gesendet am: " . date("d.m.Y H:i");

    $replyToName = $name;
} else {
    // Validierung Kontakt
    $email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';

    if (empty($name) || empty($messageText) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Bitte füllen Sie alle Felder korrekt aus."]);
        exit;
    }

    $mailSubject = "Neue Kontaktanfrage: $name";
    $replyToEmail = $email;
    $replyToName = $name;

    $mailBody = "Neue Nachricht über das Kontaktformular:\n\n" .
                "Name: $name\n" .
                "E-Mail: $email\n\n" .
                "--------------------------------------------------\n\n" .
                $messageText . "\n\n" .
                "--------------------------------------------------\n" .
                "Gesendet am: " . date("d.m.Y H:i");
}

// --- E-MAIL VERSAND ---

$mail = new PHPMailer(true);

try {
    // Servereinstellungen (Netcup)
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPassword; // Passwort aus den Environment Variables (env.php)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL (Port 465)
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // Absender & Empfänger
    // Absender muss zwingend die Netcup-Adresse sein!
    $mail->setFrom('kontakt@tc-hardt.de', 'TC Hardt Website');

    // Empfänger
    $mail->addAddress($recipient);

    // Antwort an
    $mail->addReplyTo($replyToEmail, $replyToName);

    // Inhalt
    $mail->isHTML(false); // Reintext ist sicherer gegen Spamfilter
    $mail->Subject = $mailSubject;
    $mail->Body    = $mailBody;

    $mail->send();

    echo json_encode(["success" => true, "message" => "Nachricht erfolgreich gesendet!"]);

} catch (Exception $e) {
    // Bei Fehler: Sende HTTP 500
    http_response_code(500);
    // Optional: $mail->ErrorInfo loggen, aber nicht dem User zeigen
    error_log("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode(["success" => false, "message" => "Es gab einen Fehler beim Versand. Bitte später versuchen."]);
}
?>
