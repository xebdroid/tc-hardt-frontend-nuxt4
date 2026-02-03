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

// 2. Daten einlesen
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// --- VALIDIERUNG & SICHERHEIT ---

// A. Honeypot (Bot-Schutz)
// Wenn das unsichtbare Feld "website" gefüllt ist, ist es ein Bot.
if (!empty($data['website'])) {
    // Wir täuschen Erfolg vor
    echo json_encode(["success" => true, "message" => "Gesendet"]);
    exit;
}

// B. Mathe-Aufgabe (Bot-Schutz)
// Im Frontend fragen wir 3 + 4. Das Ergebnis muss 7 sein.
$challenge = isset($data['challenge']) ? (int)$data['challenge'] : 0;
if ($challenge !== 7) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Sicherheitsfrage falsch beantwortet."]);
    exit;
}

// C. Pflichtfelder prüfen
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$messageText = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

if (empty($name) || empty($messageText) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Bitte füllen Sie alle Felder korrekt aus."]);
    exit;
}

// --- E-MAIL VERSAND ---

$mail = new PHPMailer(true);

try {
    // Servereinstellungen (Netcup)
    $mail->isSMTP();
    $mail->Host       = 'mx2fcf.netcup.net';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'tc-hardt-contact@v0id.de'; // Dein Login
    $mail->Password   = '8m9wKUcH5t2]ldOhW3'; // <--- !!! PASSWORT HIER !!!
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL (Port 465)
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // Absender & Empfänger
    // Absender muss zwingend die Netcup-Adresse sein!
    $mail->setFrom('tc-hardt-contact@v0id.de', 'TC Hardt Website');

    // Empfänger (Der Verein)
    // $mail->addAddress('info@tc-hardt.de');
    $mail->addAddress('info@v0id.de');

    // Antwort an: Wenn du auf "Antworten" klickst, geht es an den Besucher
    $mail->addReplyTo($email, $name);

    // Inhalt
    $mail->isHTML(false); // Reintext ist sicherer gegen Spamfilter
    $mail->Subject = "Neue Kontaktanfrage: $name";
    $mail->Body    = "Neue Nachricht über das Kontaktformular:\n\n" .
                     "Name: $name\n" .
                     "E-Mail: $email\n\n" .
                     "--------------------------------------------------\n\n" .
                     $messageText . "\n\n" .
                     "--------------------------------------------------\n" .
                     "Gesendet am: " . date("d.m.Y H:i");

    $mail->send();

    echo json_encode(["success" => true, "message" => "Nachricht erfolgreich gesendet!"]);

} catch (Exception $e) {
    // Bei Fehler: Sende HTTP 500
    http_response_code(500);
    // Optional: $mail->ErrorInfo loggen, aber nicht dem User zeigen
    echo json_encode(["success" => false, "message" => "Es gab einen Fehler beim Versand. Bitte später versuchen."]);
}
?>
