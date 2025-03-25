export type ErrorRecordType = {
    date: string
    workstation: string
    reference: string
    tableId: string
    robotId: string
    mountingStation?: string
    content: string
}
export type ErrorRecordTypeWithId = ErrorRecordType & { id: string }