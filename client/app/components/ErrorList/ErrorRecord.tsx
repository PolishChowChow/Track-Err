import dateParser from "@/app/utils/dateParser";
import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { StyleSheet, Text, View } from "react-native";
export type ErrorRecordProps = {
  record: ErrorRecordTypeWithId;
};
export default function ErrorRecord({ record }: ErrorRecordProps) {
  const time = dateParser(record.date)
  return (
    <View key={record.id} style={styles.row}>
      <View style = {styles.dateRow}>
        <Text style={styles.cell}>{time}</Text>
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
    borderRadius: 4,
    backgroundColor: "white"

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
