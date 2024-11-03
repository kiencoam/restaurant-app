export function formatDateTime(input: string): string {
    const date = new Date(input);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return date.toLocaleString('en-GB', options);
}

//convert from HH:mm:ss dd-MM-yyyy to yyyy-MM-dd HH:mm:ss
export function convertToISODateTime(input: string): string {
    const [time, date] = input.split(' ');
    const [day, month, year] = date.split('-');
    const [hours, minutes, seconds] = time.split(':');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// convert from yyyy-MM-dd HH:mm:ss to HH:mm:ss dd-MM-yyyy
export function formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}