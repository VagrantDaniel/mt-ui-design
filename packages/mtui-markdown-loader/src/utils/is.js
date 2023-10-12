const opt = Object.prototype.toString
function isObject(obj) {
    return opt.call(obj) === '[object Object]'
}
exports.isObject = isObject