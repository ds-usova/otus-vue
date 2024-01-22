export const expirationFormat = (value) => {
    const regex = /^\d{2}\/\d{2}$/
    if (!regex.test(value)) {
        return false
    }

    const [month, year] = value.split('/').map(Number)
    const currentDate = new Date()

    if (month == 0 || month > 12) {
        return false
    }

    const currentMonth = currentDate.getMonth() + 1
    const currentYear = Number(currentDate.getFullYear().toString().substring(3))
    console.log(month + ' ' + year + ' ' + currentDate.getMonth() + ' ' + currentYear)
    return year > currentYear || (year === currentYear && month >= currentMonth)
}