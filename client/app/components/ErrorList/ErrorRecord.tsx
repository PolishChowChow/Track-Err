import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { StyleSheet, Text, View } from "react-native";
export type ErrorRecordProps = {
  record: ErrorRecordTypeWithId;
};
export default function ErrorRecord({ record }: ErrorRecordProps) {
  const dateParser = new Date(record.date);
  const day = dateParser.toLocaleTimeString();
  return (
    <View key={record.id} style={styles.row}>
      <View style = {styles.dateRow}>
        <Text style={styles.cell}>{day}</Text>
      </View>
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.cell}>
          {record.workstation} - {record.reference} - {record.tableId} - {record.robotId} - {record.mountingStation || "none"}
          </Text>
        </View>
        <View style={styles.contentRow}>
          <Text>{record.content}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    width: 300,
    borderRadius: 4

  },
  cell: {
    padding: 5,
    fontWeight: "bold",
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentRow: {
    padding: 5,
    wordWrap: "wrap"
  }
});
