// Methods to use directly to force change inputs values before validation
// Ex : change 'last name' to upperCase
// It is recommended to use corrector.trim() in any context
//    [ if it's used, there's no need to validator.required() ]

const corrector = {
  trim(items, attr = null) {
    // to remove white spaces from the beginning and the end of text
    return corrector.byFunction(items, attr, (str) => str.trim())
  },
  // to change characters depending on method
  lower(items, attr = null) {
    return corrector.byFunction(items, attr, (str) => str.toLowerCase())
  },
  upper(items, attr = null) {
    return corrector.byFunction(items, attr, (str) => str.toUpperCase())
  },
  upFirst(items, attr = null) {
    return corrector.byFunction(items, attr, (str) =>
      str.trim().charAt(0).toUpperCase() + str.trim().substring(1).toLowerCase()
    )
  },
  upWord(items, attr = null) {
    return corrector.byFunction(items, attr, (str) => {
      let words = str.trim().toLowerCase().split(/[\s,.:\-/()[\]{}&"'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;¿]+/).map(word => {
        return word.trim().charAt(0).toUpperCase() + word.trim().substring(1)
      })
      words = words.filter(notEmpty => notEmpty)
      let newStr = ''
      str = str.toLowerCase()
      words.map(word => {
        newStr += str.substring(0, str.indexOf(word.toLowerCase())).trim() + ' ' + word
        str = str.substring(str.indexOf(word.toLowerCase()) + word.length)
      })
      return newStr.trim()
    })
  },
  upSentence(items, attr = null) {
    return corrector.byFunction(items, attr, (str) => {
      let sentences = str.trim().toLowerCase().split(/[.:!?;¿]+/).map(sentence => {
        return sentence.trim().charAt(0).toUpperCase() + sentence.trim().substring(1)
      })
      sentences = sentences.filter(notEmpty => notEmpty)
      let newStr = ''
      str = str.toLowerCase()
      sentences.map(sentence => {
        newStr += str.substring(0, str.indexOf(sentence.toLowerCase())).trim() + ' ' + sentence
        str = str.substring(str.indexOf(sentence.toLowerCase()) + sentence.length)
      })
      return newStr.trim()
    })
  },
  byFunction(items, attr, func) {
    if (typeof items == 'string') {
      items = func(items)
    } else if (typeof items == 'object' && items) {
      Object.keys(items).map(field => {
        if (typeof items[field] == 'string') {
          items[field] = func(items[field])
        } else if (
          (typeof attr == 'number' || typeof attr == 'string') &&
          items[field] && typeof items[field] == 'object' && typeof items[field][attr] == 'string'
        ) {
          items[field][attr] = func(items[field][attr])
        } else {
          console.error('invalid attribute : "' , attr,'" or item ', items[field], ' in ', items)
        }
      })
    } else {
      console.error('invalid params: items: ', items, ', attribute : ', attr)
    }
    return items
  },
}

export default corrector
