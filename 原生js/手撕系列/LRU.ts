/**
 * 最近使用
 */

class LRUCache {
    #cache = new Map();
    #Len;
    constructor(len) {
        this.#Len = len;
    }

    get(key) {
        if (!this.#cache.get([key])) return;
        const val = this.#cache.get(key)
        this.#cache.delete(key);
        this.#cache.set(key, val);
        return val;
    }

    set(key, val) {
        if (this.#cache.get(key)) {
            this.#cache.delete(key);
        }
        this.#cache.set(key, val);
        if (this.#cache.size > this.#Len) {
            this.#cache.delete(this.#cache.keys().next().value)
        }
    }
}

