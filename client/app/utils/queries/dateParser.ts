export default function dateParser(prevDate: string){
    const date = new Date(prevDate)
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`
}