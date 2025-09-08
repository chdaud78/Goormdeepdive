class HashTable {
  constructor(size = 10) {
    this.table = new Array(size);
  }
  hash(key) {
    let hash = 0;
    for(let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.table.length
  }
  set(key,value) {
    const idx = this.hash(key);
    if(!this.table(idx)) this.table[idx] = []
    this.table[idx].push([key,value])
  }
  get(key) {
    const idx = this.hash(key);
    if(!this.table[idx]) return undefined
    for(let [k,v] of this.table[idx]) {
      if(k === key) return v;
    }
  }
}

const ht = new HashTable()
ht.set("chong", 100)
ht.set("mm", 95)

console.log(ht.get("chong"))
console.log(ht.get("mm"))