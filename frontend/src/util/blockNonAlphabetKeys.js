const blockNonAlphabetKeys = (event) => {
  const ascii = event.key.charCodeAt(0)
  if (!((ascii > 64 && ascii < 91) || (ascii > 96 && ascii < 123) || (ascii === 46))) {
    event.preventDefault()
  }
}

export default blockNonAlphabetKeys