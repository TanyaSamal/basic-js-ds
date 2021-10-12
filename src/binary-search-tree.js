const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.threeRoot = null;
  }

  root() {
    return this.threeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if(!this.threeRoot){
        this.threeRoot = newNode;
        return this;
    }
    let current = this.threeRoot;
    while(current){
        if(data === current.data) return undefined;
        if(data < current.data){
            if(!current.left){
                current.left = newNode;
                return this;
            }
            current = current.left;
        } else {
            if(!current.right){
                current.right = newNode;
                return this;
            } 
            current = current.right;
        }
    }
  }

  has(data) {
    let current = this.threeRoot;
    while(current){
        if(data === current.data) return true;
        if(data < current.data){
          current = current.left;
        } else {
          current = current.right;
        }
    }
    return false;
  }

  find(data) {
    if(!this.threeRoot) return null;
      
    let current = this.threeRoot;
    let findNode = false;
    while(current && !findNode){
      if(data < current.data){
        current = current.left;
      } else if(data > current.data){
          current = current.right;
        } else {
          findNode = current;
      } 
    }
    return (!findNode) ? null : findNode;
  }

  remove(data) {
      this.threeRoot = this.removeNode(this.threeRoot, data);
  }
   
  removeNode(current, value) {
    const findMinLeaf = (leaf) => {
      return (!leaf.left) ? leaf : findMinLeaf(leaf.left);
    }

    if(!current) return null;

    if(value < current.data) {
        current.left = this.removeNode(current.left, value);
        return current;
    }

    if(value > current.data){
        current.right = this.removeNode(current.right, value);
        return current;
    } 

    if(!current.left && !current.right) {
        current = null;
        return current;
    }

    if(!current.left) {
        current = current.right;
        return current;
    }

    if(!current.right) {
        current = current.left;
        return current;
    }

    let minList = findMinLeaf(current.right);
    current.data = minList.data;
    current.right = this.removeNode(current.right, minList.data);

    return current;
  }

  min() {
    let current = this.threeRoot;
    let minValue = current.data;

    while(current){
      minValue = current.data;
      current = current.left;
    }

    return minValue;
  }

  max() {
    let current = this.threeRoot;
    let maxValue = current.data;

    while(current){
      maxValue = current.data;
      current = current.right;
    }

    return maxValue;
  }

}