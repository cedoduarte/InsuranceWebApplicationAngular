export function getYMD(dateString: string) {
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
        return null;
    }
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    return { year, month, day };
}

export function formatDate(dateString: string) {
    const ymd = getYMD(dateString);
    let month: string = `${ymd?.month}`;
    if (ymd?.month! < 10) {
        month = `0${month}`;
    }
    let day: string = `${ymd?.day}`;
    if (ymd?.day! < 10) {
        day = `0${day}`;
    }
    return `${ymd?.year}-${month}-${day}`;
}