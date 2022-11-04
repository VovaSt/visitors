export interface Person {
  id: string;
  firstName: string;
  surname: string;
  middleName: string;
  fullName?: string;
  visiting: Date[];
  lastVisit: Date | undefined;
}