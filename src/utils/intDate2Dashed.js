// YYYYMMDD -> YYYY-MM-DD
export default date => {
  if (!date) return date

  return `${date}`.replace(/^(\d{4})(\d{2})(\d{2})$/, function (x, a, b, c) {
    return `${a}-${b}-${c}`
  })
}
