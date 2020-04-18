const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return []
    } else {
        return elements
    }
}
const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        log('classname', className, e)
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
// 切换一个元素的 class
const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
// find 函数可以查找 element 的所有子元素
const find = function(element, selector) {
    let e = element.querySelector(selector)
    if (e === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return e
    }
}

const closestClass = function(element, className) {
    let e = element

    while (e !== null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    // 如果找到最上面都没有找到, 直接返回 null
    return null
}

const closestId = function(element, idName) {
    let e = element

    while (e !== null) {
        if (e.id === idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    // 如果找到最上面都没有找到, 直接返回 null
    return null
}

const closestTag = function(element, tagName) {
    let e = element

    while (e !== null) {
        if (e.tagName.toUpperCase() === tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
    // 如果找到最上面都没有找到, 直接返回 null
    return null
}

const closest = function(element, selector) {
    let c = selector[0]
    if (c === '.') {
        // class 选择器
        let className = selector.slice(1)
        let r = closestClass(element, className)
        return r
    } else if (c === '#') {
        let idName = selector.slice(1)
        let r = closestId(element, idName)
        return r
    } else {
        let tag = selector
        let r = closestTag(element, tag)
        return r
    }
}