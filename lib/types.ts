export interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  badge: string;
}

export interface BrewEvent {
  id: number;
  title: string;
  date: string;         // ISO string e.g. "2026-06-27"
  time: string;         // e.g. "7:00 PM"
  type: "open-mic" | "tasting";
  description: string;
  imageUrl: string;
}

export interface Reservation {
  name: string;
  email: string;
  partySize: number;
  date: string;
  time: string;
}
