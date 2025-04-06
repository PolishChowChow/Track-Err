const jwtParser = {
    extractJwt: (headerRecord: string) => {
        const headerArray = headerRecord.split(";")
        const [name, value] = headerArray[0].split("=")
        console.log("jwtValue", value);
        return value
    }
}
export default jwtParser;