// GET

export const getWhatsappNumber = () => {
  try {
    const whatsappNumber = localStorage.getItem('whatsappNumber')
    return whatsappNumber ? JSON.parse(whatsappNumber) : []
  } catch (error) {
    console.error('Error reading recent whatapp number:', error)
    return []
  }
}

// SET
export const setWhatsappNumber = (number) => {
  try {
    const whatsappNumber = JSON.stringify(number)
    localStorage.setItem('whatsappNumber', whatsappNumber)
    return true
  } catch (error) {
    console.error('Error reading recent whatapp number:', error)
    return false
  }



}