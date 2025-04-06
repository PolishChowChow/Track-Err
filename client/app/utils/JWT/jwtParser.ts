const jwtParser = {
    extractJwt: (headerRecord: string) => {
        const headerArray = headerRecord.split(";")
        const [name, value] = headerArray[0].split("=")
        return value
    }
}
export default jwtParser;