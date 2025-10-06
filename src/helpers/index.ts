export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(dateStr: Date) : string {
    const dateObj = new Date(dateStr);
    const options : Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    } 
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}