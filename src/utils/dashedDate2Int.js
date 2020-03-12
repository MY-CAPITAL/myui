// YYYY-MM-DD -> YYYYMMDD
export default date => {
  return Number(date.replace(/-/g, ''))
}
