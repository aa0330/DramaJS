/***
 * map[[key,value],[key,value],[key,value]]
 */

class LRU {
    #maxLen;
    #buket;

    constructor(maxlen = 3, arr = []) {
        this.#maxLen = maxlen;
        this.#buket = new Map(arr);
    }
    has(key) {
        return this.#buket.has(key);
    }

    get(key) {
        if (!this.#buket.has(key)) return null;
        let temVal = this.#buket.get(key);
        this.#buket.delete(key);
        this.#buket.set(key, temVal);
        console.log(111, this.#buket);
        return temVal
    }


    add(key, value) {
        if (this.#buket.has(key)) this.#buket.delete(key);
        this.#buket.set(key, value)
        if (this.#buket.size > this.#maxLen) {
            this.#buket.delete(this.#buket.keys().next().value)
        }
        console.log(111, this.#buket);
    }
}


let lru = new LRU(3, [[1, 2]])
lru.add(2, 3)
lru.add(3, 4)
lru.get(1)
lru.add(4, 5)

console.log(lru.get(4));



