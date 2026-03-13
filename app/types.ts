// ~/types.ts

// --- Layout & Spacing ---
export type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type Responsive<T> = T | Partial<Record<Breakpoint | 'base', T>>
export type RoundedSide = boolean | 'top' | 'bottom' | 'both'

// --- Data Models ---
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
