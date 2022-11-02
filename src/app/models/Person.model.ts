export interface Person {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  fullName?: string;
  visiting: Date[];
  lastVisit: Date | undefined;
}