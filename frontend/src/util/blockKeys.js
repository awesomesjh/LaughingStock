const blockKeys = (event) => {
  const keys = ['+', '-', '.', 'e', 'E']
  if (keys.includes(event.key)) {
    event.preventDefault()
  }
}

export default blockKeys