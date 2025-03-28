export default function dateParser(prevDate: string){
    return new Date(prevDate).toLocaleTimeString()
}