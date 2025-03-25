import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { Button, StyleSheet, Text, View } from "react-native";
type ErrorRecordProps = {
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
          <Text style={styles.cell}>{record.workstation}</Text>
          <Text style={styles.cell}>{record.reference}, </Text>
          <Text style={styles.cell}>{record.tableId}, </Text>
          <Text style={styles.cell}>
            {record.robotId} {record.mountingStation && ", "}{" "}
          </Text>
          <Text style={styles.cell}>{record.mountingStation || "none"}</Text>
        </View>
        <View>
          <Text>{record.content}</Text>
          {/* <Button title="hey" /> */}
          {/* <Button title="hoo" /> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    width: 300
  },
  cell: {
    padding: 5,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
