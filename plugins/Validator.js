// Version 2.1.0

function Error(error, param1, param2, param3) {
  // all errors that help in building the validator instance are declared here
  let errors = {
    schemaType: (schema) => ['TypeError : invalid schema (', schema, ') it should be an object of keys (of the tested object) and methods (and errors)'],
    accuracyItemType: (key) => ['TypeError invalid item ("', key, '") in schema : if you are specifying errors for some fields, put', 2, 'in the second param of the constructor'],
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
    asyncExecuteInstead: () => ["When using notInDB, use asyncExecute instead of execute"]
  }
  console.error(...errors[error](param1, param2, param3))
  return false
}
function clone(variable) {
  // to clone objects and arrays without reference
  return JSON.parse(JSON.stringify(variable))
}
let type = {
  // used in conditions to verify variables types in the correct way
  isExist: (variable) => variable !== undefined && variable !== null,
  isStr: (variable) => typeof variable == 'string',
  isNum: (variable) => typeof variable == 'number' || (typeof variable == 'string' && !isNaN(variable)),
  isStrNum: (variable) => typeof variable == 'string' || typeof variable == 'number',
  isStrArr: (variable) => typeof variable == 'string' || Array.isArray(variable),
  isObj: (variable) => typeof variable == 'object' && variable && !Array.isArray(variable),
  isObjArr: (variable) => typeof variable == 'object' && variable ? true : false,
  isNormal: (variable) => type.isStrNum(variable) || type.isObjArr(variable),
  toArray: (variable) => Array.isArray(variable) ? variable : [variable],
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
  setVariables(variables = false) {
    this.#variables = variables === false ? {} : { ...this.#variables, ...variables }
    return this
  }
  setSchema(schema, reset = true) {
    if (reset) this.schema = {}
    if (Array.isArray(schema)) {
      schema.map((group) => this.setSchema(group, false))
    } else {
      this.schema = {
        ...this.schema,
        ...this.#splitSchema(schema),
      }
    }
    if (this.#object) this.finalize(this.#object, this.#provider)
    return this
  }
  removeFromSchema(keys = []) {
    this.watch(keys, false)
    filteredSplit(keys).map((key) => delete this.schema[key])
    return this
  }
  finalize(objectUnderTest = {}, apolloProvider, watch = true) {
    if (apolloProvider) this.#provider = apolloProvider
    if (objectUnderTest) {
      this.#object = objectUnderTest
      Object.keys(this.schema).map((item) => this.#findElement(item))
      if (this.watchedItems.length && !this.#watcherId && watch) this.#startWatching()
    }
    return this
  }
  watch(keys = [], state = true, schema = true) {
    this.watchedItems = state === true
      ? keys === true ? Object.keys(this.schema) : filteredSplit(this.watchedItems.concat(filteredSplit(keys))).filter((key) => key in this.schema)
      : keys === true ? [] : this.watchedItems.filter((key) => !filteredSplit(keys).includes(key))
    if (this.#object && !this.#watcherId) this.#startWatching()
    if (type.isStrNum(this.#watcherId) && this.watchedItems.length === 0) {
      clearInterval(this.#watcherId)
      this.#watcherId = undefined
    }
    this.#watchSchema = schema
    return this
  }
  getWatcherId() {
    return typeof this.#watcherId == 'number' ? this.#watcherId : -1
  }
  async asyncExecute() {
    let validateSchema = async _ => {
      let validateItems = async _ => {
        let loopOnItems = async _ => {
          let validSchema = true
          for (let key of Object.keys(this.schema)) {
            this.#findElement(key)
            if (this.#minTimeout) {
              this.schema[key].valid = true
              this.schema[key].error = ''
            }
            let $item = await this.#asyncValidateOne(clone(this.schema[key]))
            if (!$item.valid) validSchema = false
            setTimeout(() => {
              this.schema[key] = $item
            }, this.#minTimeout)
          }
          return validSchema
        }
        return await loopOnItems()
      }
      if (type.isStrNum(this.#watcherId)) clearInterval(this.#watcherId)
      this.#watcherId = undefined
      if (this.#minTimeout) {
        this.valid = true
        this.error = ''
      }
      let $valid = await validateItems()
      setTimeout(_ => {
        this.valid = $valid
        if (this.#errorsAccuracy) {
          this.error = $valid ? '' : this.schemaError
        }
        if (this.watchedItems.length) {
          this.#startWatching()
        }
      }, this.#minTimeout)
      return $valid
    }
    if (type.isObj(this.schema)) {
      return await validateSchema()
    } else {
      Error('missingObject')
      this.valid = false
      return false
    }
  }
  execute(keys) {
    if (type.isObj(this.schema)) {
      let validSchema = true
      if (keys) {
        keys = filteredSplit(keys).filter((key) => key in this.schema)
      } else {
        keys = Object.keys(this.schema)
      }
      for (let key of keys) {
        this.#findElement(key)
        if (this.#minTimeout) {
          this.schema[key].valid = true
          if (this.#errorsAccuracy > 1)
            this.schema[key].error = ''
        }
        let $item = this.#validateOne(clone(this.schema[key]))
        if (!$item.valid) validSchema = false
        setTimeout(() => {
          this.schema[key] = $item
        }, this.#minTimeout)
      }
      if (type.isStrNum(this.#watcherId)) clearInterval(this.#watcherId)
      this.#watcherId = undefined
      if (this.#minTimeout && keys.length === Object.keys(this.schema).length) {
        this.valid = true
        this.error = ''
      }
      setTimeout(_ => {
        if (keys.length === Object.keys(this.schema).length) {
          this.valid = validSchema
          if (this.#errorsAccuracy) {
            this.error = validSchema ? '' : this.schemaError
          }
          if (this.watchedItems.length) {
            this.#startWatching()
          }
        }
      }, this.#minTimeout)
      return validSchema
    } else {
      Error('missingObject')
      this.valid = false
      return false
    }
  }
  test(keys, defaultVal = true) {
    let valid = defaultVal
    if (this.schema) {
      if (keys) {
        keys = filteredSplit(keys).filter((key) => key in this.schema)
      } else {
        keys = Object.keys(this.schema)
      }
      for(let key of keys) {
        if (!this.schema[key].valid) {
          valid = false
          break
        }
      }
    }
    return valid
  }
  setMinTimeout(duration) {
    this.#minTimeout = duration
    return this
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
        this.watchedItems.filter((key) => key in this.schema).map(async (key) => {
          this.#findElement(key)
          if (!this.schema[key].valid) validSchema = false
          if (this.schema[key].value !== asyncSchema[key].value) {
            this.schema[key] = await this.#asyncValidateOne(clone(this.schema[key]))
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
  async #asyncValidateOne(item) {
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
            let params = type.toArray(meths[i].params)
            if (meths[i].name === 'notInDB') params = [this.#provider, ... params]
            valid = await func(item.value, ... params)
            meths[i].valid = valid
            if (!valid) { error = meths[i].error; item.valid = false }
          }
        } catch {
          item.valid = false
          meths[i].valid = false
          Error('unknownMethod', meths[i].name, methods)
        }
      }
      return await meths
    }
    item.methods = await loopOnMethods()
    if (this.#errorsAccuracy >= 2 && !item.valid) item.error = type.isStrNum(error) ? error : item.mainError ? item.mainError : ''
    return item
  }
  #validateOne(item) {
    item.valid = true
    if (this.#errorsAccuracy >= 2) {
      item.error = ''
    }
    let error = false
    for (let i in item.methods) {
      let func
      try {
        eval(`func = methods.${item.methods[i].name}`)
        if (typeof func == 'undefined') throw 'invalid'
        let valid
        if (item.methods[i].name === 'notInDB') Error('asyncExecuteInstead')
        if (error === false) {
          let params = type.toArray(item.methods[i].params)
          if (item.methods[i].name === 'notInDB') params = [this.#provider, ... params]
          valid = func(item.value, ... params)
          item.methods[i].valid = valid
          if (!valid) { error = item.methods[i].error; item.valid = false }
        }
      } catch {
        item.valid = false
        item.methods[i].valid = false
        Error('unknownMethod', item.methods[i].name, methods)
      }
    }
    if (this.#errorsAccuracy >= 2 && !item.valid) item.error = type.isStrNum(error) ? error : item.mainError ? item.mainError : ''
    return item
  }
  #splitSchema(schema) {
    // transform scopes of schema that are declared in setSchema
    let $schema = {}
    if (type.isObj(schema)) {
      let forAll
      Object.keys(schema).map((item) => {
        $schema[item] = this.#splitItem(item, schema)
        if (item == '_') {
          forAll = clone($schema[item])
          delete $schema[item]
        }
      })
      if (forAll) {
        if (Object.keys($schema).length === 0) {
          $schema['_'] = clone(forAll)
        } else {
          Object.keys($schema).map((item) => ($schema[item] = this.#mergeItems(forAll, $schema[item])))
        }
      }
    } else {
      Error('schemaType', schema)
    }
    return $schema
  }
  #splitItem(item, schema) {
    // transform items of schema from the syntax declared in setSchema to the final result shown in the Vue console
    let splitMethod = (m) => {
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
            if (p in this.#variables) return this.#variables[p]
          }
          return p
        })
        $m.name = m.slice(0, open)
      }
      return $m
    }
    let $el = { valid: true, methods: [] }
    if (this.#errorsAccuracy >= 2) {
      $el = { valid: true, methods: [], mainError: '', error: '' }
    }
    if (type.isStrArr(schema[item])) {
      $el.methods = filteredSplit(schema[item]).map((m) => splitMethod(m))
    } else if (this.#errorsAccuracy == 0 || this.#errorsAccuracy === 1) {
      Error('accuracyItemType', item)
    } else if (type.isObj(schema[item])) {
      if (type.isStrNum(schema[item].error)) {
        $el.mainError = schema[item].error.toString()
      }
      if (type.isStrArr(schema[item].methods)) {
        $el.methods = filteredSplit(schema[item].methods).map((m) => splitMethod(m))
      } else if (type.isObj(schema[item].methods)) {
        $el.methods = Object.keys(schema[item].methods).map((m) => {
          let $m = splitMethod(m)
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
  #mergeItems(sourceObj, targetObj) {
    // when we have the _ 'underscore' item, we need to merge it with all other items
    let $src = clone(sourceObj),
      $targ = clone(targetObj),
      methodExist = (name) => $targ.methods.some((method) => method.name === name)
    if (this.#errorsAccuracy < 2) {
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
  #findElement(key) {
    // search for the element from the original object
    let $el, $val, $object = this.#object
    try {
      try {
        eval(`$el = $object.${key}`)
      } catch {
        eval(`$el = $object["${key}"]`)
      }
      if (Array.isArray($el) && $el.length === 1) {
        $el = $el[0]
      }
    } catch {
      Error('getElementFailed', key, this.#object)
    }
    if (type.isNormal($el)) {
      this.schema[key].element = $el
      try {
        if (type.isStrNum(this.schema[key].element)) $val = this.schema[key].element
        for (let attr of this.attrs) {
          if (type.isStrNum(this.schema[key].element[attr])) {
            $val = this.schema[key].element[attr]
          }
        }
        for (let attr of attrs) {
          try {
            if (type.isStrNum(eval(`this.schema[key].element.${attr}`))) {
              $val = eval(`this.schema[key].element.${attr}`)
            }
          } catch {}
        }
      } catch {}
      if (type.isStrNum($val)) {
        this.schema[key].value = $val
      } else {
        this.schema[key].value = undefined
        this.schema[key].valid = false
        Error('valueType', key, this.attrs, this.schema[key].element)
      }
    } else {
      this.schema[key].element = undefined
      this.schema[key].value = undefined
      this.schema[key].valid = false
      Error('elementType', key, this.#object)
    }
  }
}

export const methods = {
  email: (value) => /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(value),
  required: (value) => /([^\s])/.test(value),
  phone: (value, morrocan) => morrocan
    ? /^\s*(\+{0,1}\s{0,2}212\s{0,2})?([(\[{]\s{0,2}\+{0,1}\s{0,2}212\s{0,2}[)\]}])?\s{0,2}0{0,1}\s{0,2}[5678]\s{0,2}(\d+\s{0,2}[.\-]{0,1}\s{0,2})+\d+\s*$/.test(value)
    : /^\s*(\+{0,1}\s{0,2}\d{1,4}\s{0,2})?([(\[{]\s{0,2}\+{0,1}\s{0,2}\d{1,4}\s{0,2}[)\]}])?\s{0,2}(\d+\s{0,2}[.\-]{0,1}\s{0,2})+\d+\s*$/.test(value),
  noSpaces: (value) => !/\s/.test(value),
  noNumbers: (value) => /^([^0-9\u0660-\u0669]*)$/.test(value),
  noSymbols: (value) => /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678]*$/.test(value),
  number: (value) => typeof value == "number" || /^([0-9]+(.{0,1}[0-9]+){0,1}){0,1}$/.test(value),
  integer: (value) => (typeof value == "number" && value % 1 === 0) || /^[0-9]*$/.test(value),
  length: (value, length) => value.trim().length == length,
  min: (value, min = 0) => value.trim().length >= min,
  max: (value, max = Infinity) => value.trim().length <= max,
  between: (value, min = 0, max = Infinity) => value.trim().length <= max && value.trim().length >= min,
  numberMin: (value, min = -Infinity) => Number(value) >= Number(min),
  numberMax: (value, max = Infinity) => Number(value) <= Number(max),
  numberBetween: (value, min = -Infinity, max = Infinity) => Number(value) <= Number(max) && Number(value) >= Number(min),
  text: (value, lang) => {
    let fr = /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;¿؟À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ]*$/,
      en = /^[A-Za-z0-9\s,.:\-/()[\]{}&"'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;¿؟]*$/,
      ar = /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s0-9\u0660-\u0669,.٫٬،:\-/()[\]{}&"'`‘!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;؟٪؛؉]*$/,
      all = /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD,.٫٬،:\-/()[\]{}&"‘'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;؟٪؛¿؉\uFD3E\uFD3F]*$/
    return lang == 'fr' ? fr.test(value) : lang == 'en' ? en.test(value) : lang == 'ar' ? ar.test(value) : lang == 'one' ? (ar.test(value) || fr.test(value)) : all.test(value)
  },
  textAlpha: (value, lang) => {
    let fr = /^[A-Za-z\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/,
      en = /^[A-Za-z\s']*$/,
      ar = /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s]*$/,
      all = /^[A-Za-z\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD']*$/
    return lang == 'fr' ? fr.test(value) : lang == 'en' ? en.test(value) : lang == 'ar' ? ar.test(value) : lang == 'one' ? (ar.test(value) || fr.test(value)) : all.test(value)
  },
  textAlphaNum: (value, lang) => {
    let fr = /^[A-Za-z0-9\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/,
      en = /^[A-Za-z0-9\s']*$/,
      ar = /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s0-9\u0660-\u0669‘']*$/,
      all = /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/
    return lang == 'fr' ? fr.test(value) : lang == 'en' ? en.test(value) : lang == 'ar' ? ar.test(value) : lang == 'one' ? (ar.test(value) || fr.test(value)) : all.test(value)
  },
  textSimple: (value, lang) => {
    let fr = /^[A-Za-z0-9\s,.À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/,
      en = /^[A-Za-z0-9\s,.']*$/,
      ar = /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s0-9\u0660-\u0669,.٫٬،‘']*$/,
      all = /^[A-Za-z0-9\u0660-\u0669\s,.٫٬،À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/
    return lang == 'fr' ? fr.test(value) : lang == 'en' ? en.test(value) : lang == 'ar' ? ar.test(value) : lang == 'one' ? (ar.test(value) || fr.test(value)) : all.test(value)
  },
  word: (value, lang) => {
    let fr = /^[A-Za-zÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/,
      en = /^[A-Za-z']*$/,
      ar = /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘'\uFD3E\uFD3F]*$/,
      all = /^[A-Za-zÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/
    return lang == 'fr' ? fr.test(value) : lang == 'en' ? en.test(value) : lang == 'ar' ? ar.test(value) : lang == 'one' ? (ar.test(value) || fr.test(value)) : all.test(value)
  },
  wordNum: (value, lang) => {
    let fr = /^[A-Za-z0-9À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/,
      en = /^[A-Za-z0-9']*$/,
      ar = /^[0-9\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\u0660-\u0669‘']*$/,
      all = /^[A-Za-z0-9\u0660-\u0669À-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD‘']*$/
    return lang == 'fr' ? fr.test(value) : lang == 'en' ? en.test(value) : lang == 'ar' ? ar.test(value) : lang == 'one' ? (ar.test(value) || fr.test(value)) : all.test(value)
  },
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
