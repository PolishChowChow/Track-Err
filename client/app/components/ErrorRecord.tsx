import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { Text } from "react-native";
type ErrorRecordProps = {
    record: ErrorRecordTypeWithId
}
export default function ErrorRecord({record}:ErrorRecordProps){
    return <Text key={record.id}>{record.robotId}</Text>
}