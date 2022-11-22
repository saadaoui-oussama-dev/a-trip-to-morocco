function Error(error, param1, param2, param3) {
  // all errors that help in building the validator instance are declared here
  let errors = {
    schemaType: (schema) => ['TypeError : invalid schema (', schema, ') it should be an object of keys (of the tested object) and methods (and errors)',],
    accuracyItemType: (key) => [
      'TypeError || TypeConflit: invalid item ("', key, '") in schema or the errorsAccuracy does not match the type of item.\n',
      '\tNote : to change the errorsAccuracy, its the second param in the constructor\n',
      "To set an error for the whole schema: just write the error in the first param, and automatically the errorsAccuracy will be 1 if it's 0\n",
      '\tItems should be like : "email min(7)" or', ['required', 'email', 'min(7)'],'\n',
      'To set an error for each field : change errorsAccuracy to 2,\n',
      '\tItems should be like : the above or', { methods: ['email', 'required'] }, '\n',
      'or\t', { methods: ['email', 'required'], error: 'there is an error in this field' }, '\n',
      'or\t', { methods: { required: false, email: 'Email is invalid', 'notInDB(query)': 'this email is aleary used' }, error: 'there is ane error in this field' },
    ],
    methodsMissing: (item, schema) => ['Methods are missing in (', item, '):', schema],
    elementType: (element, object) => ['TypeError : invalid element', element, 'in', object, ': It should be a string, number, array or an object'],
    valueType: (key, attrs, element) => ['Attributes (', attrs.join(', '), ') not found in item', key, ':', element],
    getElementFailed: (element, object) => ['there is an error occurred getting element (', element, ') from object : ', object],
    itemErrorType: (key, method) => ['TypeError : invalid item error in', key + '.', method, ': It schould be a string or number as a message or false to apply mainError'],
    filteredSplitType: (variable) => ['TypeError : invalid variable (', variable, ') it should be a string or array of strings'],
    missingObject: () => ['Verification cannot be completed without an object under test'],
    unknownMethod: (name, allMethods) => ['Uknown method : ' + name + '. methods that are available : \n', allMethods],
    missingAppoloProvider: () => ['Reading from database cannot be completed without an apolloProvider, send it in the second param of the method "finalize"'],
    requiredTarget: value => ["notInDB : The target is required in this case, validating", value, 'could not be completed'],
  }
  console.error(...errors[error](param1, param2, param3))
  return false
}
function clone(variable) {
  // to clone objects and arrays without reference
  return JSON.parse(JSON.stringify(variable))
}
let type = {
  // used in conditions to verifie variables types in the correct way
  isExist: (variable) => variable !== undefined && variable !== null,
  isStr: (variable) => typeof variable == 'string',
  isNum: (variable) => typeof variable == 'number' || (typeof variable == 'string' && !isNaN(variable)),
  isStrNum: (variable) => typeof variable == 'string' || typeof variable == 'number',
  isStrArr: (variable) => typeof variable == 'string' || Array.isArray(variable),
  isObj: (variable) => typeof variable == 'object' && variable && !Array.isArray(variable),
  isObjArr: (variable) => typeof variable == 'object' && variable ? true : false,
  isNormal: (variable) => type.isStrNum(variable) || type.isObjArr(variable),
  toArray: (variable) => Array.isArray(variable) ? clone(variable) : [clone(variable)],
}
function filteredSplit(stringArray, separator = ' ') {
  // accept a string (and split it) OR an array > then it filter duplicated items
  let array = []
  if (type.isStr(stringArray)) array = stringArray.split(separator)
  else if (type.isNum(stringArray)) array = [stringArray.toString()]
  else if (Array.isArray(stringArray)) {
    array = clone(stringArray)
    for (let i in array) {
      if (type.isNum(array[i])) array[i] = [array[i].toString()]
      else if (!type.isStr(array[i])) Error('filteredSplitType', array[i])
    }
  } else {
    Error('filteredSplitType', stringArray)
  }
  return array.filter((item, index) => array.indexOf(item) === index && item !== '')
}
function splitSchema(schema, errorsAccuracy, variables) {
  // transform scopes of schema that are declared in setSchema
  let $schema = {}
  if (type.isObj(schema)) {
    let forAll
    Object.keys(schema).map((item) => {
      $schema[item] = splitItem(item, schema, errorsAccuracy, variables)
      if (item == '_') {
        forAll = clone($schema[item])
        delete $schema[item]
      }
    })
    if (forAll) {
      if (Object.keys($schema).length === 0) {
        $schema['_'] = clone(forAll)
      } else {
        Object.keys($schema).map((item) => ($schema[item] = mergeItems(forAll, $schema[item], errorsAccuracy)))
      }
    }
  } else {
    Error('schemaType', schema)
  }
  return $schema
}
function splitItem(item, schema, accuracy, variables) {
  // transform items of schema from the syntax declared in setSchema to the final result shown in the Vue console
  let $el = { valid: true, methods: [] }
  if (accuracy >= 2) {
    $el = { valid: true, methods: [], mainError: '', error: '' }
  }
  if (type.isStrArr(schema[item])) {
    $el.methods = filteredSplit(schema[item]).map((m) => splitMethod(m, variables))
  } else if (accuracy == 0 || accuracy === 1) {
    Error('accuracyItemType', item)
  } else if (type.isObj(schema[item])) {
    if (type.isStrNum(schema[item].error)) {
      $el.mainError = schema[item].error.toString()
    }
    if (type.isStrArr(schema[item].methods)) {
      $el.methods = filteredSplit(schema[item].methods).map((m) => splitMethod(m, variables))
    } else if (type.isObj(schema[item].methods)) {
      $el.methods = Object.keys(schema[item].methods).map((m) => {
        let $m = splitMethod(m, variables)
        if (type.isStrNum(schema[item].methods[m])) {
          $m.error = schema[item].methods[m].toString()
        } else if (schema[item].methods[m] !== false) {
          Error('itemErrorType', item, m)
        }
        return $m
      })
    } else {
      Error('accuracyItemType', item)
    }
    if (type.isNum(schema[item].priority)) {
      $el.priority = Number(schema[item].priority)
    }
  } else {
    Error('accuracyItemType', item)
  }
  return $el
}
function splitMethod(m, variables) {
  // accept methods and return there names and params if they are exist
  let $m = { valid: true },
    open = m.indexOf('('),
    close = m.indexOf(')')
  $m.name = m
  if (open !== -1 && close !== -1 && open < close) {
    $m.params = m.slice(open + 1, close).split(',').filter((notEmpty) => notEmpty).map((p) => {
      p = p.trim()
      try {
        return eval(p)
      } catch {
        if (p in variables) return variables[p]
      }
      return p
    })
    $m.name = m.slice(0, open)
  }
  return $m
}
function mergeItems(sourceObj, targetObj, accuracy) {
  // when we have the _ 'underscore' item, we need to merge it with all other items
  let $src = clone(sourceObj),
    $targ = clone(targetObj),
    methodExist = (name) => $targ.methods.some((method) => method.name === name)
  if (accuracy < 2) {
    $src.methods.filter((mt) => methodExist(mt.name)).map((mt) => {
      let i = $targ.methods.findIndex((el) => el.name == mt.name)
      if (mt.params && !$targ.methods[i].params) {
        $targ.methods[i].params = mt.params
      }
    })
    $targ.methods = $targ.methods.concat($src.methods.filter((mt) => !methodExist(mt.name)))
  } else {
    if (!$targ.mainError) $targ.mainError = $src.mainError
    $src.methods.filter((mt) => methodExist(mt.name)).map((mt) => {
      let i = $targ.methods.findIndex((m) => m.name === mt.name)
      if (type.isStrNum(mt.error) && !type.isStrNum($targ.methods[i].error)) {
        $targ.methods[i].error = mt.error.toString()
      }
      if (mt.params && !$targ.methods[i].params) {
        $targ.methods[i].params = mt.params
      }
    })
    let newMethods = $src.methods.filter((mt) => !methodExist(mt.name))
    if (newMethods.length) {
      if (!type.isNum($src.priority)) $src.priority = 0.26
      if (!type.isNum($targ.priority)) $targ.priority = 0.51
      if ($src.priority === $targ.priority) $targ.priority++
      if ($src.priority > $targ.priority) {
        $targ.methods = newMethods.concat($targ.methods)
      } else {
        $targ.methods = $targ.methods.concat(newMethods)
      }
    }
  }
  delete $targ.priority
  return $targ
}
function findElement(schema, objectUnderTest, key, attrs) {
  // search for the element from the original object
  let $el, $val
  try {
    try {
      eval(`$el = objectUnderTest.${key}`)
    } catch {
      eval(`$el = objectUnderTest["${key}"]`)
    }
    if (Array.isArray($el) && $el.length === 1) {
      $el = $el[0]
    }
  } catch {
    Error('getElementFailed', key, objectUnderTest)
  }
  if (type.isNormal($el)) {
    schema[key].element = $el
    try {
      $val = findValue(schema[key].element, attrs)
    } catch {}
    if (type.isStrNum($val)) {
      schema[key].value = $val
    } else {
      schema[key].value = undefined
      schema[key].valid = false
      Error('valueType', key, attrs, schema[key].element)
    }
  } else {
    schema[key].element = undefined
    schema[key].value = undefined
    schema[key].valid = false
    Error('elementType', key, objectUnderTest)
  }
  return schema[key]
}
function findValue(element, attrs) {
  // search for the element value from the original object
  if (type.isStrNum(element)) return element
  for (let attr of attrs) {
    if (type.isStrNum(element[attr])) {
      return element[attr]
    }
  }
  for (let attr of attrs) {
    try {
      if (type.isStrNum(eval(`element.${attr}`))) {
        return eval(`element.${attr}`)
      }
    } catch {}
  }
}
export class Validator {
  #object
  #provider
  #errorsAccuracy
  #variables = {}
  #watcherId
  #watchSchema = false
  #minTimeout = 0
  attrs = ['value', 'content', 'data']
  schema = {}
  valid = true
  watchedItems = []
  constructor(schemaError = '', errorsAccuracy = 0, attrs = []) {
    this.#errorsAccuracy = type.isNum(errorsAccuracy) ? parseInt(errorsAccuracy) : 0
    if (errorsAccuracy >= 1) {
      this.schemaError = ''
      this.error = ''
    }
    if (type.isStrNum(schemaError) && schemaError !== '') {
      this.schemaError = schemaError
      if (!this.#errorsAccuracy) this.#errorsAccuracy = 1
      this.error = ''
    }
    this.attrs = filteredSplit(filteredSplit(attrs).concat(this.attrs)).map((attr) => (type.isNum(attr) ? Number(attr) : attr))
    // Object.setPrototypeOf(instance, Validator.prototype)
  }
  setVariables(variables) {
    this.#variables = { ...this.#variables, ...variables }
    return this
  }
  resetVaraibles() {
    this.#variables = {}
  }
  setSchema(schema, reset = true) {
    if (reset) this.schema = {}
    if (Array.isArray(schema)) {
      schema.map((group) => this.setSchema(group, false))
    } else {
      this.schema = {
        ...this.schema,
        ...splitSchema(schema, this.#errorsAccuracy, this.#variables),
      }
    }
    if (this.#object) this.finalize(this.#object, this.#provider)
    return this
  }
  removeFromSchema(keys = []) {
    this.ignore(keys)
    filteredSplit(keys).map((key) => delete this.schema[key])
    return this
  }
  finalize(objectUnderTest = {}, apolloProvider, watch = true) {
    if (apolloProvider) this.#provider = apolloProvider
    if (objectUnderTest) {
      this.#object = objectUnderTest
      Object.keys(this.schema).map((item) => (this.schema[item] = findElement(this.schema, this.#object, item, this.attrs)))
      if (this.watchedItems.length && !this.#watcherId && watch) {
        this.#startWatching()
      }
    }
    return this
  }
  watch(keys) {
    this.watchedItems = filteredSplit(this.watchedItems.concat(filteredSplit(keys))).filter((key) => key in this.schema)
    if (this.#object && !this.#watcherId) this.#startWatching()
    return this
  }
  watchAll() {
    this.watchedItems = Object.keys(this.schema)
    if (this.#object && !this.#watcherId) this.#startWatching()
    return this
  }
  watchSchema() {
    this.#watchSchema = true
    return this
  }
  ignore(keys) {
    this.watchedItems = this.watchedItems.filter((key) => !filteredSplit(keys).includes(key))
    if (this.watchedItems.length === 0) this.ignoreAll()
    return this
  }
  ignoreAll() {
    if (this.#watcherId || this.#watcherId === 0) clearInterval(this.#watcherId)
    this.#watcherId = undefined
    this.watchedItems = []
    return this
  }
  ignoreSchema() {
    this.#watchSchema = false
    return this
  }
  getWatcherId() {
    return this.#watcherId
  }
  #startWatching() {
    this.finalize(this.#object, this.#provider, false)
    let asyncSchema = clone(this.schema)
    if (this.#watcherId) {
      clearInterval(this.#watcherId)
      this.#watcherId = null
    }
    this.#watcherId = setInterval(() => {
      let validSchema = true
      if (this.#object) {
        this.watchedItems.filter((item) => item in this.schema).map(async (item) => {
          this.schema[item] = findElement(this.schema, this.#object, item, this.attrs)
          if (!this.schema[item].valid) validSchema = false
          if (this.schema[item].value !== asyncSchema[item].value) {
            this.schema[item] = await this.#validateOne(clone(this.schema[item]))
          }
        })
        if (this.#watchSchema) {
          this.valid = validSchema
          if (this.#errorsAccuracy) {
            this.error = validSchema ? '' : this.schemaError
          }
        }
        asyncSchema = clone(this.schema)
      } else {
        clearInterval(this.#watcherId)
        this.#watcherId = null
      }
    }, 50)
  }
  setMinTimeout(duration) {
    this.#minTimeout = duration
    return this
  }
  execute() {
    if (type.isObj(this.schema)) {
      let validateItems = async _ => {
        let validSchema = true
        for (let item of Object.keys(this.schema)) {
          this.schema[item] = findElement(this.schema, this.#object, item, this.attrs)
          if (this.#minTimeout) {
            this.schema[item].valid = true
            this.schema[item].error = ''
          }
          let $item = await this.#validateOne(clone(this.schema[item]))
          if (!$item.valid) validSchema = false
          setTimeout(() => {
            this.schema[item] = clone($item)
          }, this.#minTimeout)
        }
        return validSchema
      }
      if (this.#watcherId || this.#watcherId === 0) clearInterval(this.#watcherId)
      this.#watcherId = undefined
      if (this.#minTimeout) {
        this.valid = true
        this.error = ''
      }
      setTimeout(async () => {
        let $valid = await validateItems()
        setTimeout(() => {
          this.valid = $valid
          if (this.#errorsAccuracy) {
            this.error = this.valid ? '' : this.schemaError
          }
          if (this.watchedItems.length) {
            this.#startWatching()
          }
        }, this.#minTimeout)
      }, 0)
    } else {
      Error('missingObject')
      this.valid = false
    }
  }
  async #validateOne(item) {
    item.valid = true
    if (this.#errorsAccuracy >= 2) {
      item.error = ''
    }
    let error = false
    let loopOnMethods = async (meths = clone(item.methods)) => {
      for (let i in meths) {
        let func
        try {
          eval(`func = methods.${meths[i].name}`)
          if (typeof func == 'undefined') throw 'invalid'
          let valid
          if (error === false) {
            if (meths[i].name === 'notInDB') {
              valid = await func(item.value, this.#provider, ...meths[i].params)
            } else {
              valid = Array.isArray(meths[i].params)
              ? func(item.value, ...meths[i].params)
              : func(item.value)
            }
            if (await valid) {
              meths[i].valid = true
            } else {
              item.valid = false
              meths[i].valid = false
              if (error === false)
                error = meths[i].error
            }
          }
        } catch {
          item.valid = false
          meths[i].valid = false
          Error('UnkownMethod', meths[i].name, methods)
        }
      }
      return await meths
    }
    item.methods = await loopOnMethods()
    if (this.#errorsAccuracy >= 2 && !item.valid) {
      item.error = type.isStrNum(error) ? error : item.mainError ? item.mainError : ''
    }
    return item
  }
}

export const methods = {
  // special types
  email: (value) => /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(value),
  required: (value) => /([^\s])/.test(value),
  phone: (value) => /^\s*(\+{0,1}\s{0,2}\d{1,4}\s{0,2})?([(\[{]\s{0,2}\+{0,1}\s{0,2}\d{1,4}\s{0,2}[)\]}])?\s{0,2}(\d+\s{0,2}[.\-]{0,1}\s{0,2})+\d+\s*$/.test(value),
  phoneMoroccan: (value) => /^\s*(\+{0,1}\s{0,2}212\s{0,2})?([(\[{]\s{0,2}\+{0,1}\s{0,2}212\s{0,2}[)\]}])?\s{0,2}0{0,1}\s{0,2}[567]\s{0,2}(\d+\s{0,2}[.\-]{0,1}\s{0,2})+\d+\s*$/.test(value),
  // disallow characters
  noSpaces: (value) => !/\s/.test(value),
  noNumbers: (value) => /^([^0-9\u0660-\u0669]*)$/.test(value),
  noSymbols: (value) => /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678]*$/.test(value),
  // numbers types
  number: (value) => /^([0-9]+(.{0,1}[0-9]+){0,1}){0,1}$/.test(value),
  integer: (value) => /^[0-9]*$/.test(value),
  // to compare strings lengths
  length: (value, length) => value.trim().length == length,
  min: (value, min = 0) => value.trim().length >= min,
  max: (value, max = Infinity) => value.trim().length <= max,
  between: (value, min = 0, max = Infinity) => value.trim().length <= max && value.trim().length >= min,
  // to compare numbers
  numberMin: (value, min = -Infinity) => Number(value) >= Number(min),
  numberMax: (value, max = Infinity) => Number(value) <= Number(max),
  numberBetween: (value, min = -Infinity, max = Infinity) => Number(value) <= Number(max) && Number(value) >= Number(min),
  // texts
  // normal text, (used for descritions, questions, maths, places adresses like (meknes, bassatine nº 15) ...)
  text: (value) => /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD,.٫٬،:\-/()[\]{}&"‘'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;؟٪؛¿؉\uFD3E\uFD3F]*$/.test(value),
  // only caracters : (used for people names ...)
  textAlpha: (value) => /^[A-Za-z\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD']*$/.test(value),
  // only caracters and numbers
  textAlphaNum: (value) => /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/.test(value),
  // only caracters, numbers, comma and point (for simple phrases, names like (Mr. doctor) ...)
  textSimple: (value) => /^[A-Za-z0-9\u0660-\u0669\s,.٫٬،À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/.test(value),
  // only one word: no symbols, no spaces no numbers
  word: (value) => /^[A-Za-zÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/.test(value),
  // only one word with numbers (used for usernames like karim002 )
  wordNum: (value) => /^[A-Za-z0-9\u0660-\u0669À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/.test(value),
  // By default without any prefix it accept arabic and latin characters (english, french and spanish)
  // use prefix FR_ to only allow latin characters
  // use prefix EN_ to only allow english and disallow the special characters in french and spanish ( é ā ē ī ō ũ ū ŷ ... )
  // use prefix AR_ to only allow arabic characters
  // use prefix ONE_ to only allow one language : arabic or latin characters
  // the difference between the default and ONE_ is : 'hello حميد' is valid in the default and not in ONE_
  FR_text: (value) => /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?¿؟@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]*$/.test(value),
  FR_textAlpha: (value) => /^[A-Za-z\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/.test(value),
  FR_textAlphaNum: (value) => /^[A-Za-z0-9\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/.test(value),
  FR_textSimple: (value) => /^[A-Za-z0-9\s,.À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/.test(value),
  FR_word: (value) => /^[A-Za-zÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/.test(value),
  FR_wordNum: (value) => /^[A-Za-z0-9À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/.test(value),
  EN_text: (value) => /^[A-Za-z0-9\s,.:\-/\\()[\]{}&"'`!?@#%|_*+±×÷=<^>~$¢£¥¤°º«»;¿؟]*$/.test(value),
  EN_textAlpha: (value) => /^[A-Za-z\s']*$/.test(value),
  EN_textAlphaNum: (value) => /^[A-Za-z0-9\s']*$/.test(value),
  EN_textSimple: (value) => /^[A-Za-z0-9\s,.']*$/.test(value),
  EN_word: (value) => /^[A-Za-z']*$/.test(value),
  EN_wordNum: (value) => /^[A-Za-z0-9']*$/.test(value),
  AR_text: (value) => /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s0-9\u0660-\u0669,.٫٬،:\-/()[\]{}&"'`‘!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;؟٪؛؉]*$/.test(value),
  AR_textAlpha: (value) => /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s]*$/.test(value),
  AR_textAlphaNum: (value) => /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s0-9\u0660-\u0669‘']*$/.test(value),
  AR_textSimple: (value) => /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s0-9\u0660-\u0669,.٫٬،‘']*$/.test(value),
  AR_word: (value) => /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘'\uFD3E\uFD3F]*$/.test(value),
  AR_wordNum: (value) => /^[0-9\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\u0660-\u0669‘']*$/.test(value),
  ONE_text: (value) => methods.FR_text(value) || methods.AR_text(value),
  ONE_textAlpha: (value) => methods.FR_textAlpha(value) || methods.AR_textAlpha(value),
  ONE_textAlphaNum: (value) => methods.FR_textAlphaNum(value) || methods.AR_textAlphaNum(value),
  ONE_textSimple: (value) => methods.FR_textSimple(value) || methods.AR_textSimple(value),
  ONE_word: (value) => methods.FR_word(value) || methods.AR_word(value),
  ONE_wordNum: (value) => methods.FR_wordNum(value) || methods.AR_wordNum(value),
  // Detecte if an email, phone or username ... is already exist in strapi DB
  notInDB: async (value, apolloProvider, query, filter = '', target = '') => {
    if (!apolloProvider) Error('missingAppoloProvider')
    let searchForParam = (obj) => {
      if (obj === 'PARAM') {
        obj = value
      } else if (Array.isArray(obj)) {
        obj.map(k => {
          if (obj[k] === 'PARAM') obj[k] = value
          else if (type.isObjArr(obj[k])) obj[k] = searchForParam(obj[k])
        })
      } else if (type.isObj(obj)) {
        Object.keys(obj).map(k => {
          if (obj[k] === 'PARAM') obj[k] = value
          else if (type.isObjArr(obj[k])) obj[k] = searchForParam(obj[k])
        })
      }
      return obj
    }
    if (filter) {
      filter = searchForParam(clone(filter))
    } else {
      try {
        let attr = query.definitions[0].selectionSet.selections[0].selectionSet.selections[0].selectionSet.selections[0].selectionSet.selections[0].name.value
        filter = { filters : {} }
        filter.filters[attr] = { eq: value }
      } catch {
        filter = { filters: { id: { eq: value }}}
      }
    }
    try {
      target = target ? target : 'data.' + query.definitions[0].selectionSet.selections[0].name.value + '.data'
    } catch {
      Error('requiredTarget', value)
    }
    let notExist = 0, variables = filter
    try {
      let a = await apolloProvider.query({ query, variables, fetchPolicy: 'no-cache' })
      eval(`notExist = a.${target}.length`)
    } catch (e) {
      console.error(e)
    }
    return notExist === 0
  },
}

export default { Validator, methods }
