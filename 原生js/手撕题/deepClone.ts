let obj = {
    name: 'jack',
    fn() {
        console.log(this.name);

    }
}


function deepClone<T>(data: T): T {
    console.log(typeof data);

    if (typeof data !== 'object' || data === null) return data
    let newData = Array.isArray(data) ? [] : {}
    for (let ele in data) {
        if (data.hasOwnProperty(ele)) {
            if (typeof ele === 'object') {
                newData[ele] = deepClone(ele)
            } else {
                newData[ele] = data[ele]
            }

        }
    }
    return newData
}


let obj2 = deepClone(obj)
obj.name = 'Tom'
