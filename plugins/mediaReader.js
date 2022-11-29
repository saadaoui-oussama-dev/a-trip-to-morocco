function setFile(input, that, types, HtmlEls, readType) {
  input = checkElementOrEvent(input)
  let prevEls = [],
    ref = getRef(that, input, 'input'),
    store = getRef(that, input, 'store'),
    valid = false,
    file = input.files[0]
  if (ref && file) {
    if (types == 'just to store') {
      if (store) eval(`that.$data.${store.name} = file`)
      valid = true
    } else {
      prevEls = getPreviewElements(that, ref.name)
      for (let type of toArray(types)) {
        if (file.type.slice(0, type.length) == type) {
          try {
            if (type.slice(0, 4) == 'text' && readType == 'text') {
              let reader = new FileReader()
              reader.onload = function (e) {
                prevEls.filter((el) => el.nodeName == 'TEXTAREA').map((el) => (el.value = e.target.result))
                if (store) eval(`that.$data.${store.name} = e.target.result`)
              }
              reader.readAsText(file)
            } else {
              if (store) eval(`that.$data.${store.name} = file`)
              prevEls.map((el) => {
                if (HtmlEls.indexOf(el.nodeName) != -1) {
                  el.src = URL.createObjectURL(file)
                } else if (type.slice(0, 5) == 'image') {
                  el.style.backgroundImage = 'url("' + URL.createObjectURL(input.files[0]) + '")'
                }
              })
            }
            valid = true
          } catch {}
          break
        }
      }
    }
  }
  input.value = ''
  let name = store ? store.name : ''
  return { input, ref: ref.fullRef, name: ref.name, store: name, prevEls, valid, file }
}
function getInput(that, fakeInput, prefix = 'insert') {
  let ref = getRef(that, fakeInput, prefix)
  if (ref) {
    let input = searchByRef(that, ref.name, 'input')
    if (input) {
      let store = getRef(that, input.element, 'store'),
        storeName = store ? store.name : undefined
      return { element: input.element, store: storeName, name: ref.name, ref: input.fullRef }
    }
    console.error("Input not found, its ref should contains 'input-" + ref.name + "'")
  }
  if (fakeInput.parentNode) return getInput(that, fakeInput.parentNode)
  else console.error(`Invalid element ref, it should contains '${prefix}-...'`)
}
function getPreviewElements(that, ref) {
  let prevEls = []
  Object.keys(that.$refs).map((rf) => {
    if (rf.split(' ').indexOf('prev-' + ref) != -1)
      prevEls = prevEls.concat(toArray(that.$refs[rf]))
  })
  return prevEls
}
function getRef(that, element, type) {
  for (let ref of Object.keys(that.$refs)) {
    let index = toArray(that.$refs[ref]).indexOf(element)
    if (index != -1) {
      let parts = ref.split(' ').filter((notEmpty) => notEmpty)

      for (let part of parts) {
        if (part.split('-')[0] == type) {
          return { name: part.split('-').slice(1).join('-'), fullRef: ref }
        }
      }
    }
  }
}
function searchByRef(that, ref, type) {
  for (let rf of Object.keys(that.$refs)) {
    for (let part of rf.split(' ').filter((notEmpty) => notEmpty)) {
      if (part.split('-')[0] == type && part.split('-').slice(1).join('-') == ref) {
        let element = Array.isArray(that.$refs[rf])
          ? that.$refs[rf][0]
          : that.$refs[rf]
        return { element, fullRef: rf }
      }
    }
  }
}
function checkElementOrEvent(clickSrc) {
  if (clickSrc.target && typeof clickSrc.target == 'object') {
    clickSrc.stopPropagation()
    return clickSrc.target
  }
  return clickSrc
}
let toArray = (variable) => Array.isArray(variable) ? variable : [variable]

const mediaReader = {
  image: (input, that) => setFile(input, that, 'image', ['IMG']),
  audio: (input, that) => setFile(input, that, 'audio', ['AUDIO']),
  video: (input, that) => setFile(input, that, 'video', ['VIDEO']),
  pdf: (input, that) => setFile(input, that, 'application/pdf', ['IFRAME']),
  doc: (input, that) => setFile(input, that, ['text', 'application/pdf'], ['IFRAME']),
  text: (input, that, readType = 'text') => setFile(input, that, 'text', ['IFRAME'], readType),
  other: (input, that) => setFile(input, that, 'just to store'),
  insert(fakeInput, that) {
    fakeInput = checkElementOrEvent(fakeInput)
    let input = getInput(that, fakeInput, 'insert')
    if (input) input.element.click()
    return input
  },
  remove(button, that) {
    button = checkElementOrEvent(button)
    let input = getInput(that, button, 'remove'), prevEls = []
    if (input) {
      input.element.value = ''
      if (input.store) eval(`that.${input.store} = null`)
      prevEls = getPreviewElements(that, input.name)
      prevEls.map(el => {
        if (el.nodeName == 'TEXTAREA') {
          el.innerHTML = ''
          el.value = ''
        } else {
          el.src = ''
          el.style.backgroundImage = ''
        }
      })
      return { ... input, element: button, input: input.element, prevEls }
    }
  },
  stopPropagation(that) {
    let breakParentEvent = (event) => event.stopPropagation()
    Object.keys(that.$refs).map((ref) => {
      for (let part of ref.split(' ')) {
        if (part.slice(0, 6) == 'input-') {
          toArray(that.$refs[ref]).map((inp) => inp.addEventListener('click', breakParentEvent))
        }
      }
    })
  },
}
export default mediaReader
