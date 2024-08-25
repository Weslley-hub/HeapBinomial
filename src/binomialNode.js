class BinomialNode {
    constructor(key, data) {
        this.key = key;
        this.data = data;
        this.parent = null;
        this.child = null;
        this.sibling = null;
        this.degree = 0;
    }
}

module.exports = BinomialNode;