const blockNonAlphabetPaste = (event) => {
  const pastedText = event.clipboardData.getData('text')
  if (!validString(pastedText)) {
    event.preventDefault()
  }
}

const validString = (str) => {
  for (let i = 0; i < str.length; i++) {
    const ascii = str.charCodeAt(i)
    if (!((ascii > 64 && ascii < 91) || (ascii > 96 && ascii < 123) || (ascii === 46))) {
      return false
    }
  }
  return true
}

export default blockNonAlphabetPaste