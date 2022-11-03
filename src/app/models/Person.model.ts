export interface Person {
  id: string;
  name: string;
  surname: string;
  middleName: string;
  fullName?: string;
  visiting: Date[];
  lastVisit: Date | undefined;
}