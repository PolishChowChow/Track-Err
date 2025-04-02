export type Id = { id: string };
export type ErrorRecordType = {
  date: string;
  workstation: string;
  reference: string;
  tableId: string;
  robotId: string;
  mountingStation?: string;
  content: string;
};
export type ErrorRecordTypeWithId = ErrorRecordType & Id;
export type ErrorRecordFields =
  | "workstation"
  | "reference"
  | "tableId"
  | "robotId"
  | "mountingStation"
  | "content";
