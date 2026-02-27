// ~/types.ts
export interface Event {
  id: number;
  date: string;
  dateEnd?: string;
  time?: string;
  title: string;
  description?: string;
  location?: string;
  image: string | null;
  highlightLevel?: number;
}
