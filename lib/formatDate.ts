export function formatDate(date: string, locale = 'en-US') {
  const d = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  return d.toLocaleDateString(locale, options)
}
