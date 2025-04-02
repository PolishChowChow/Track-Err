import { StructureRecordTypeWithId } from "@/types/StructureType";

export default function useGroupedStructuresByType(
  records: StructureRecordTypeWithId[]
) {
  const workstations: string[] = [];
  const references: string[] = [];
  const tables: string[] = [];
  const robots: string[] = [];
  const mountingStations: string[] = ["NONE"];

  records.map((record) => {
    switch (record.type) {
      case "workstation":
        workstations.push(record.name);
        break;
      case "reference":
        references.push(record.name);
        break;
      case "table":
        tables.push(record.name);
        break;
      case "robot":
        robots.push(record.name);
        break;
      case "mountingStation":
        mountingStations.push(record.name);
        break;
    }
  });
  return {
    workstations,
    references,
    tables,
    robots,
    mountingStations,
  };
}
