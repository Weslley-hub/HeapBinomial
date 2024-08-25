const BinomialNode = require('./binomialNode');

class BinomialHeap {
    constructor() {
        this.head = null;
    }

    insert(key, data) {
        const newHeap = new BinomialHeap();
        newHeap.head = new BinomialNode(key, data);
        this.head = this.union(newHeap).head;
    }

    extractMin() {
        if (this.head === null) return null;

        let minNode = this.head;
        let minPrev = null;
        let current = this.head;
        let prev = null;

        while (current.sibling !== null) {
            if (current.sibling.key < minNode.key) {
                minNode = current.sibling;
                minPrev = prev;
            }
            prev = current;
            current = current.sibling;
        }

        if (minPrev === null) {
            this.head = minNode.sibling;
        } else {
            minPrev.sibling = minNode.sibling;
        }

        const childList = this.reverse(minNode.child);
        const newHeap = new BinomialHeap();
        newHeap.head = childList;

        this.head = this.union(newHeap).head;
        return minNode;
    }

    union(otherHeap) {
        const newHeap = new BinomialHeap();
        let thisCurrent = this.head;
        let otherCurrent = otherHeap.head;
        let newCurrent = null;

        while (thisCurrent !== null && otherCurrent !== null) {
            if (thisCurrent.degree < otherCurrent.degree) {
                this.addToHeap(newHeap, thisCurrent);
                thisCurrent = thisCurrent.sibling;
            } else {
                this.addToHeap(newHeap, otherCurrent);
                otherCurrent = otherCurrent.sibling;
            }
        }

        while (thisCurrent !== null) {
            this.addToHeap(newHeap, thisCurrent);
            thisCurrent = thisCurrent.sibling;
        }

        while (otherCurrent !== null) {
            this.addToHeap(newHeap, otherCurrent);
            otherCurrent = otherCurrent.sibling;
        }

        return this.merge(newHeap);
    }

    addToHeap(heap, node) {
        node.sibling = heap.head;
        heap.head = node;
    }

    isEmpty() {
        return this.head === null;
    }

    merge(heap) {
        if (this.head === null) return heap;
        if (heap.head === null) return this;

        let newHead = null;
        let current = null;
        let thisCurrent = this.head;
        let otherCurrent = heap.head;

        while (thisCurrent !== null && otherCurrent !== null) {
            if (thisCurrent.degree < otherCurrent.degree) {
                if (newHead === null) {
                    newHead = thisCurrent;
                    current = newHead;
                } else {
                    current.sibling = thisCurrent;
                    current = current.sibling;
                }
                thisCurrent = thisCurrent.sibling;
            } else {
                if (newHead === null) {
                    newHead = otherCurrent;
                    current = newHead;
                } else {
                    current.sibling = otherCurrent;
                    current = current.sibling;
                }
                otherCurrent = otherCurrent.sibling;
            }
        }

        while (thisCurrent !== null) {
            current.sibling = thisCurrent;
            current = current.sibling;
            thisCurrent = thisCurrent.sibling;
        }

        while (otherCurrent !== null) {
            current.sibling = otherCurrent;
            current = current.sibling;
            otherCurrent = otherCurrent.sibling;
        }

        return this;
    }

    reverse(node) {
        let prev = null;
        let current = node;
        let next = null;

        while (current !== null) {
            next = current.sibling;
            current.sibling = prev;
            prev = current;
            current = next;
        }

        return prev;
    }
}

module.exports = BinomialHeap;