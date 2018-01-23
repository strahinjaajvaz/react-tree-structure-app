/*
    A class that represents a tree node
*/
module.exports = class Node {
  /**
   *
   * @param {string} id - the node id
   * @param {string} name - the name attributed to the node
   * @param {string} parent_id - the id of the parent node
   * @param {number} amount - the amount for this node
   * @param {function} callBack - a closure to update the parent nodes
   *                              by default it is null as _root shouldnt have any callback
   */
  constructor(id, name, parent_id, amount, callBack = null) {
    // values from the spread sheet
    this.id = id;
    this.name = name;
    this.parent_id = parent_id;
    this.amount = amount;

    // values for child nodes
    this.total_amount = amount;
    this.children = [];

    // methods for adding and removing child elements
    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);

    // callback to ensure that we update the total amount
    this.changeTotal = this.changeTotal.bind(this);
    this.changeTotalParent = callBack;
  }

  addChild(node) {
    this.children = [...this.children, node];
    this.changeTotal(node.amount, true);
  }

  removeChild(node) {
    this.children = this.children.filter(child => child.id !== node.id);
    this.changeTotalParent(node.total_amount, false);
  }

  changeTotal(amount, isAdd) {
    /**
     * displaying two decimal spaces
     * without this it would have a trailing floating point number
     *
     */
    this.total_amount = isAdd
      ? parseFloat((this.total_amount + amount).toFixed(2))
      : parseFloat((this.total_amount - amount).toFixed(2));
    // call back to update the parent of the node
    if (this.changeTotalParent !== null) this.changeTotalParent(amount, isAdd);
  }
};
