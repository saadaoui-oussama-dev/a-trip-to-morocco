const Validator = {
  latinWord: {
    // at least one character ( && numbers if alphaNum ) && no spaces && no symbols
    normal(items, src = 0, attribute = 'value', extra = false) {
      // lower || upperFisrt || upper
      let regEx = extra
        ? /^(([A-ZÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒ]{1}[a-zà-öù-ýÿāēīōũūŷœ]*)|([a-zà-öù-ýÿāēīōũūŷœ]+)|([A-ZÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒ]+)){1}$/
        : /^(([A-Za-z]{1}[a-z]*)|([a-z]+)|([A-Z]+)){1}$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    lower(items, src = 0, attribute = 'value', extra = false) {
      // soufiane : lowercase
      let regEx = extra ? /^[a-zà-öù-ýÿāēīōũūŷœ]+$/ : /^[a-z]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    upperFisrt(items, src = 0, attribute = 'value', extra = false) {
      // Soufiane : Only the first letter is capital and the rest are not
      let regEx = extra ? /^([A-ZÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒ]{1}[a-zà-öù-ýÿāēīōũūŷœ]*){1}$/ : /^([A-Z]{1}[a-z]*){1}$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    upper(items, src = 0, attribute = 'value', extra = false) {
      // ALAOUI : uppercase
      let regEx = extra ? /^[A-ZÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒ]+$/ : /^[A-Z]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    ignoreCases(items, src = 0, attribute = 'value', extra = false) {
      // iBrAhiM : Cases are ignored
      let regEx = extra ? /^[A-Za-zÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/ : /^[A-Za-z]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    alphaNum(items, src = 0, attribute = 'value', extra = false) {
      // Mix between letters lower and upper, and numbers
      let regEx = extra ? /^[A-Za-z0-9À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/ : /^[A-Za-z0-9]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
  },
  arabicWord: {
    // at least one character ( && numbers if alphaNum ) && no spaces && no symbols
    normal(items, src = 0, attribute = 'value', extra = false) {
      // Arabic letters
      let regEx = extra
        ? /^[\u0620-\u063F\u0641-\u065F\u066E-\u06EF\u06FA-\u08FF]+$/
        : /^[\u0621-\u063A\u0641-\u065F]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    alphaNum(items, src = 0, attribute = 'value', extra = false) {
      // Mix between Arabic letters and numbers 0-9 and indian numbers : ٩-٠
      let regEx = extra
        ? /^[0-9|\u0660-\u0669\u0620-\u063F\u0641-\u065F\u066E-\u06EF\u06FA-\u08FF]+$/
        : /^[0-9|\u0660-\u0669\u0621-\u063A\u0641-\u065F]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
  },
  latinText: {
    alpha(items, src = 0, attribute = 'value', extra = false) {
      // letters lower and upper, spaces
      let regEx = extra ? /^[A-Za-z\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/ : /^[A-Za-z\s]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    alphaNum(items, src = 0, attribute = 'value', extra = false) {
      // letters lower and upper, numbers, spaces
      let regEx = extra ? /^[A-Za-z\s0-9À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/ : /^[A-Za-z\s0-9]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    phrase(items, src = 0, attribute = 'value', extra = false) {
      // letters lower and upper, numbers, spaces, comma, point
      let regEx = extra ? /^[A-Za-z\s,.0-9À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/ : /^[A-Za-z\s,.0-9]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    normal(items, src = 0, attribute = 'value', extra = false) {
      // letters lower and upper, numbers, spaces, normal symbols : ,.:-/()[]{}&"'`!?
      let regEx = extra
        ? /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/
        : /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    complexe(items, src = 0, attribute = 'value', extra = false) {
      // letters lower and upper, numbers, spaces, complexe symbols : ,.:-/()[]{}&"'`!?@#%\|_*+±×÷=<^>~$¢£¥¤°º«»;¿
      let regEx = extra
        ? /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;¿À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]+$/
        : /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;¿]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
  },
  phone: {
    normal(items, src = 0, attribute = 'value') {
      // it can start by : 321 || + 2654 || (32) || (+313) || ( + 321 ) || none   and    () == [] == {}
      // the rest can be separeted by (space - .) : 654-62 || 654.5466 || 654621 31 || 654.54-3.664.54
      let regEx = /^\s*(\+{0,1}\s*\d*\s*)?([(\[{]\s*\+{0,1}\s*\d+\s*[)\]}])?[\s.-\d]+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
    moroccan(items, src = 0, attribute = 'value') {
      // it's included in phone.normal
      // it can start by : (+ 212) || + 212 || + ( 212 ) || none
      // the rest can be : 6... || 5... || 7... || 06... || 05... || 07... and separeted by (space - .)
      let regEx = /^\s*(\+{0,1}\s*212\s*)?([(\[{]\s*\+{0,1}\s*212\s*[)\]}])?\s*0{0,1}[567][\s.-\d]+\d+$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    },
  },
  email: {
    normal(items, src = 0, attribute = 'value') {
      let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/
      return Validator.stringRegExp(items, src, attribute, regEx)
    }
  },
  required: {
    normal(items, src = 0, attribute = 'value') {
      // if string is empty or not
      return Validator.stringRegExp(items, src, attribute, /([^\s])/)
    },
    lengthMin(items,  minLength, src = 0, attribute = 'value') {
    },
    lengthMax(items,  maxLength, src = 0, attribute = 'value') {
    },
    lengthMinMax(items, minLength, maxLength, src = 0, attribute = 'value') {
    },
    length(items, length, src = 0, attribute = 'value') {
    }
  },
  getElements(items, src) {
    let $src, $elements, $items
    try {
      $elements =
        (typeof items == 'number' || (typeof items == 'string')) ? [items] :
        (typeof items == 'object') ? items : (! items) ? null : undefined
      $src = (typeof src == 'object' && src) ? src : (!src) ? null : undefined
      if (typeof $src == 'undefined' || typeof $elements == 'undefined')
        return [{ element: undefined, value: undefined, valid: false, error: 'Invalid parameters !' }]
      $items = typeof $src == 'undefined'
        ? [undefined]
        : ! $src ? $elements
        : ! $elements ? Object.values($src)
        : Array.isArray($elements) ? $elements.map(item => $src[item])
        : [undefined]
      $items = Array.isArray($items) ? $items : [$items]
      return $items.map(item =>
        (item || typeof item == 'number' || typeof item == 'string') && typeof item != 'boolean'
          ? { element: item, value: item, valid: true }
          : { element: item, value: item, valid: false, error: 'Invalid element value || Element not found !' }
      )
    } catch { return [{ element: undefined, valid: false, error: 'Unknown error in getting element !' }] }
  },
  getValue(item, attr) {
    attr = typeof attr  == 'boolean' ? null : attr
    let element = item.element
    try {
      return (typeof element == 'number' || typeof element == 'string') && ! attr
        ? { element, value: element, valid: true }
        : typeof element == 'number' || typeof element == 'string'
        ? { element, value: element, valid: true, error: 'Useless Attribute !' }
        : typeof attr == 'object' && attr
        ? { element, value: undefined, valid: false, error: 'Invaild Attribute !' }
        : ! item
        ? { element, value: element, valid: false, error: 'Invalid element value !' }
        : typeof item == 'object'
        ? attr in element && (typeof element[attr] == 'number' || typeof element[attr] == 'string')
        ? { element, value: element[attr], valid: true }
        : attr in element || typeof attr == 'number' || typeof attr == 'string'
        ? { element, value: element[attr], valid: false, error: 'Invalid element value !' }
        : ! attr && typeof attr != 'number' && typeof attr != 'string'
        ? { element, value: element, valid: false, error: 'Invalid element value !' }
        : { element, value: undefined, valid: false, error: 'Unknown key in object / array !' }
        : { element, value: undefined, valid: false, error: 'Unknown error in getting element value' }
    } catch {
      return { element, value: undefined, valid: false, error: 'Unknown error in getting element value' }
    }
  },
  stringRegExp(items, src = 0, attribute = 'value', regExp) {
    attribute = typeof attribute  == 'boolean' ? null : attribute
    let res = { valid: true, details: [] }, $valid
    let $elements = Validator.getElements(items, src)
    res.details = $elements.map($el => {
      $el = $el.valid ? $el = Validator.getValue($el, attribute) : $el
      $el.valid = $el.valid && typeof $el.value == 'string' ? RegExp(regExp).test($el.value) : false
      if (! $el.valid) res.valid = false
      return $el
    })
    if (res.details.length == 1)
      res = res.details[0]
    else if (res.details.length == 0)
      res = { valid: false, error: 'Dont send empty object to validate'}
    return res
  },
  groupByMethod(schema = {}, mode = 'AND') {
    let res = {}, notNesting = ['regExp', 'schema', 'groupByMethod', 'groupByValue']
    mode = mode == 'OR' || mode == 'or' ? 'OR' : 'AND'
    res.valid = mode != 'OR'
    res.details = Object.entries(schema).map(method => {
      let extra, name = method[0].split('_').filter(notEmpty => notEmpty), params = method[1]
      if (name[name.length - 1] == 'extra') {
        name.pop()
        extra = true
      }
      name[1] = ! name[1] ? 'normal' : name[1]
      if (notNesting.indexOf(name[0]) != -1) name = [name[0]]
      name = name.join('.')
      params[2] = typeof params[2] != 'undefined' ? params[2] : 'value'
      params[2] = typeof params[2]  == 'boolean' ? null : typeof params[2] == 'undefined'? 'value' : params[2]
      params[3] = params[3] || typeof params[2] == 'number' ? params[3] : extra
      try {
        let result = eval(`Validator.${name}(params[0], params[1], params[2], params[3], params[4])`)
        res.valid =
          mode == 'AND' && ! result.valid ? false :
          mode == 'OR' && result.valid ? true : res.valid
        return result
      } catch { return { valid: false, error: `Unknown method !, ${name}` } }
    })
    if (res.details.length == 1) {
      res = res.details[0]
      mode = 'AND'
    } else if (res.details.length == 0)
      res = { valid: false, error: 'Dont send empty object to validate'}
    res.schema = `groupByMethod (${mode})`
    return res
  },
  groupByValues(schema = [], mode = 'AND') {
    mode = mode == 'OR' || mode == 'or' ? 'OR' : 'AND'
    let res = { valid: false, error: 'script of Schema[ groupByValues ] does\'t exist yet !' }
    res.schema = `groupByValues (${mode})`
    return res
  },
  schema(schema, mode = 'AND') {
    mode = mode == 'OR' || mode == 'or' ? 'OR' : 'AND'
    try {
      let method = Array.isArray(schema)
        ? 'groupByValue'
        :  typeof schema == 'object' && schema
        ? 'groupByMethod'
        : 'none'
      return (method != 'none')
        ? Validator[method](schema, mode)
        : { valid: false, error: 'Schema should be an object or an array'}
    } catch {
      return { valid: false, error: 'An unhandled error was detected while executing the scheme !'}
    }
  },
}

export default Validator
