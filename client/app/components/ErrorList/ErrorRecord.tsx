import dateParser from "@/app/utils/queries/dateParser";
import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
export type ErrorRecordProps = {
  record: ErrorRecordTypeWithId;
};
export default function ErrorRecord({ record }: ErrorRecordProps) {
  const time = dateParser(record.date)
  const theme = useTheme();
  const textColor = { color: theme.colors.onBackground}
  return (
    <View key={record.id} style={{
      ...styles.row,
      backgroundColor: theme.colors.background,
    }}>
      <View style = {styles.dateRow}>
        <Text style={[styles.cell, textColor]}>{time}</Text>
      </View>
      <View>
        <View style={styles.titleRow}>
          <Text style={[styles.cell, textColor]}>
          {record.workstation} - {record.reference} - {record.tableId} - {record.robotId} - {record.mountingStation || "none"}
          </Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={textColor}>{record.content}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    // marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    width: 300,
    borderRadius: 0,
    // backgroundColor: "white"
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
  }
});
