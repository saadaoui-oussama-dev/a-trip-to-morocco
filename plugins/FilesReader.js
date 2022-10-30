const FilesReader = {
  image(input, that) {
    return FilesReader.setPreview(input, that, 'image', ['IMG'])
  },
  video(input, that) {
    return FilesReader.setPreview(input, that, 'video', ['VIDEO'])
  },
  insert(fakeInput, that, stopRecursive = false) {
    let ref = FilesReader.getRef(fakeInput, that),
      input = that.$refs['input-' + ref]
    if(Array.isArray(input)) {
      for (let el of input) {
        if (el.nodeName == 'INPUT') {
          input = el
          break
        }
      }
    }
    if (input) {
      let breakParentEvent = (e) => e.stopPropagation()
      if (input.parentNode == fakeInput) {
        input.addEventListener('click', breakParentEvent)
      }
      input.click()
      if (input.parentNode == fakeInput) {
        input.removeEventListener('click', breakParentEvent)
      }
    } else if (! stopRecursive && typeof ref != 'boolean') {
      console.log(`%c HTML Input element not found, 'input-${ref}' in `, "color: #f00e", that.$refs)
    }
    return input
  },
  setPreview: (input, that, type, HtmlEls) => {
    let ref = FilesReader.getRef(input, that),
      prevEls = [],
      file = input.files[0]
    if (ref) {
      Object.keys(that.$refs).map(el => {
        for (let part of el.split(' ')) {
          if (part == 'prev-' + ref) {
            if (Array.isArray(that.$refs[el])) {
              prevEls = prevEls.concat(that.$refs[el])
            } else {
              prevEls.push(that.$refs[el])
            }
          }
        }
      })
      if (file && file.type.slice(0, type.length) == type) {
        if (input.getAttribute('store'))
          eval(`that.${input.getAttribute('store')} = file`)
        prevEls.map(el => {
          if (HtmlEls.indexOf(el.nodeName) != -1) {
            el.src = URL.createObjectURL(file)
          } else {
            el.style.backgroundImage = 'url("' + URL.createObjectURL(file) + '")'
          }
        })
      }
    }
    return { input, prevEls, ref, file }
  },
  getRef: (el, that) => {
    let index = Object.values(that.$refs).indexOf(el)
    if (index == -1) {
      Object.values(that.$refs).map((e, i) => {
        if (e[0] == el) {
          index = i
        }
      })
    }
    index = Object.keys(that.$refs)[index]
    if (index) {
      for (let part of index.split(' ')) {
        part = part.split('-')
        if (part[0] == 'input') {
          return part.splice(1).join('-')
        }
      }
    }
    if (el.parentNode) {
      FilesReader.insert(el.parentNode, that, true)
      return false
    } else {
      console.log(`%c Invalid ref, it should start by 'input-...`, "color: #f00e")
    }
  },
}

export default FilesReader
