function myNew(fn: Function, ...arg) {
    let obj = {}
    obj.__proto__ = fn.prototype
    let result = fn.apply(obj, arg)
    return result instanceof Object ? result : obj
}


// test
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayName = function () {
    console.log(this.name);

}

const per = myNew(Person, 'tom', 20)
per.sayName()
