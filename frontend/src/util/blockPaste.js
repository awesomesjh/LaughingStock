const blockPaste = (event) => {
  const pastedText = event.clipboardData.getData('text')
  if (!validString('+-.eE', pastedText)) {
    event.preventDefault()
  }
}

const validString = (str1, str2) => {
  for (let i = 0; i < str1.length; i++) {
    if (str2.includes(str1[i])) {
      return false
    }
  }
  return true
}

export default blockPaste