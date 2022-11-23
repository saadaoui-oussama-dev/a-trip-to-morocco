function clone(variable) {
  return JSON.parse(JSON.stringify(variable))
}
let type = {
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
  finalize(objectUnderTest = {}, apolloProvider, watch = true) {
    if (apolloProvider) this.#provider = apolloProvider
    if (objectUnderTest) {
      this.#object = objectUnderTest
      Object.keys(this.schema).map((item) => this.#findElement(item))
    }
    return this
  }
  execute() {
    if (type.isObj(this.schema)) {
      let validSchema = true
      for (let key of Object.keys(this.schema)) {
        this.#resetItemErrors(key)
        let $item = this.#validateOne(clone(this.schema[key]))
        if (!$item.valid) validSchema = false
        setTimeout(() => {
          this.schema[key] = $item
        }, this.#minTimeout)
      }
      this.#resetSchemaErrors()
      this.#newSchemaErrors(validSchema)
    } else {
      Error('missingObject')
      this.valid = false
    }
    return this.valid
  }
  setMinTimeout(duration) {
    this.#minTimeout = duration
    return this
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
          item.methods[i] = this.#setMethodErrors(valid, item.methods[i])
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
  #resetItemErrors(key) {
    this.#findElement(key)
    if (this.#minTimeout) {
      this.schema[key].valid = true
      this.schema[key].error = ''
    }
  }
  #resetSchemaErrors() {
    if (this.#minTimeout) {
      this.valid = true
      this.error = ''
    }
  }
  #newSchemaErrors(valid) {
    setTimeout(_ => {
      this.valid = valid
      if (this.#errorsAccuracy) {
        this.error = valid ? '' : this.schemaError
      }
    }, this.#minTimeout)
  }
  #setMethodErrors(valid, method) {
    if (valid) {
      method.valid = true
    } else {
      method.valid = false
    }
    return method
  }
}

export const methods = {
  email: (value) => /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/.test(value),
  required: (value) => /([^\s])/.test(value),
  phone: (value) => /^\s*(\+{0,1}\s{0,2}\d{1,4}\s{0,2})?([(\[{]\s{0,2}\+{0,1}\s{0,2}\d{1,4}\s{0,2}[)\]}])?\s{0,2}(\d+\s{0,2}[.\-]{0,1}\s{0,2})+\d+\s*$/.test(value),
  text: (value) => /^[A-Za-z0-9\u0660-\u0669\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD,.٫٬،:\-/()[\]{}&"‘'`!?@#%\\|_*+±×÷=<^>~$¢£¥¤°º«»;؟٪؛¿؉\uFD3E\uFD3F]*$/.test(value),
  FR_textAlpha: (value) => /^[A-Za-z\sÀ-ÖÙ-ÝĀĒĪŌŪŨŶŸŒà-öù-ýÿāēīōũūŷœ']*$/.test(value),
  AR_textAlpha: (value) => /^[\u0621-\u063B\u0640-\u065Fچڅڢڤکڪگںڡھہۃۇۈیۍۑە\u066E-\u0678\uFDF2-\uFDFD\s]*$/.test(value),
  ONE_textAlpha: (value) => methods.FR_textAlpha(value) || methods.AR_textAlpha(value),
}

export default { Validator, methods }
