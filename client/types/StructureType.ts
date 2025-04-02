import { Id } from "./ErrorRecordType";

export type StructureType =
  | "workstation"
  | "table"
  | "robot"
  | "reference"
  | "mountingStation";
export type StructureRecordType = {
  name: string;
  type: StructureType;
};
export type StructureRecordTypeWithId = StructureRecordType & Id;
