export const loadState = () => {
  try {
    const solidState = localStorage.getItem('state')
    if ( solidState === null) {
      return undefined
    }
    return JSON.parse(solidState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const solidState = JSON.stringify(state)
    localStorage.setItem('state', solidState)
  } catch (err) {
    // Ignore Write Errors
  }
}
