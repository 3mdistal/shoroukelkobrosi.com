export function getSeason(date: Date): string {
  const month = date.getMonth()
  switch (month) {
    case 2:
    case 3:
    case 4:
      return 'Spring'
    case 5:
    case 6:
    case 7:
      return 'Summer'
    case 8:
    case 9:
    case 10:
      return 'Autumn'
    default:
      return 'Winter'
  }
}

export function formatSeasonYear(dateString: string): string {
  const date = new Date(dateString)
  const season = getSeason(date)
  const year = date.getFullYear().toString()
  return `${season} ${year}`
}
