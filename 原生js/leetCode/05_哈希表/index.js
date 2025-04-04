/* 初始化哈希表 */
const map = new Map();
/* 添加操作 */
// 在哈希表中添加键值对 (key, value)
map.set(12836, '小哈');
map.set(15937, '小啰');
map.set(16750, '小算');
map.set(13276, '小法');
map.set(10583, '小鸭');

/* 查询操作 */
// 向哈希表中输入键 key ，得到值 value
let name = map.get(15937);

/* 删除操作 */
// 在哈希表中删除键值对 (key, value)
map.delete(10583);

/* 遍历哈希表 */
console.info('\n遍历键值对 Key->Value');
for (const [k, v] of map.entries()) {
    console.info(k + ' -> ' + v);
}
console.info('\n单独遍历键 Key');
for (const k of map.keys()) {
    console.info(k);
}
console.info('\n单独遍历值 Value');
for (const v of map.values()) {
    console.info(v);
}



/* 键值对 Number -> String */
class Pair {
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

/* 基于数组实现的哈希表 */
class ArrayHashMap {
    #buckets;
    constructor() {
        // 初始化数组，包含 100 个桶
        this.#buckets = new Array(100).fill(null);
    }

    /* 哈希函数 */
    #hashFunc(key) {
        return key % 100;
    }

    /* 查询操作 */
    get(key) {
        let index = this.#hashFunc(key);
        let pair = this.#buckets[index];
        if (pair === null) return null;
        return pair.val;
    }

    /* 添加操作 */
    set(key, val) {
        let index = this.#hashFunc(key);
        this.#buckets[index] = new Pair(key, val);
    }

    /* 删除操作 */
    delete(key) {
        let index = this.#hashFunc(key);
        // 置为 null ，代表删除
        this.#buckets[index] = null;
    }

    /* 获取所有键值对 */
    entries() {
        let arr = [];
        for (let i = 0; i < this.#buckets.length; i++) {
            if (this.#buckets[i]) {
                arr.push(this.#buckets[i]);
            }
        }
        return arr;
    }

    /* 获取所有键 */
    keys() {
        let arr = [];
        for (let i = 0; i < this.#buckets.length; i++) {
            if (this.#buckets[i]) {
                arr.push(this.#buckets[i].key);
            }
        }
        return arr;
    }

    /* 获取所有值 */
    values() {
        let arr = [];
        for (let i = 0; i < this.#buckets.length; i++) {
            if (this.#buckets[i]) {
                arr.push(this.#buckets[i].val);
            }
        }
        return arr;
    }

    /* 打印哈希表 */
    print() {
        let pairSet = this.entries();
        for (const pair of pairSet) {
            console.info(`${pair.key} -> ${pair.val}`);
        }
    }
}
