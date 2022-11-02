export interface Person {
  id: number;
  name: string;
  surname: string;
  fullName?: string;
  visiting: Date[];
  lastVisit: Date | undefined;
}