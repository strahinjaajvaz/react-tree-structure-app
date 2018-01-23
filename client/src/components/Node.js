import React from "react";
import AddModal from "./AddModal";

class Node extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.node.id,
      name: this.props.node.name,
      parent_id: this.props.node.parent_id,
      amount: this.props.node.amount,
      total_amount: this.props.node.total_amount,
      children: this.props.node.children,
      hide_children: false
    };

    this.hideChildren = this.hideChildren.bind(this);

    this.updateTotal = this.updateTotal.bind(this);

    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);

    this.parentRemoveChild = this.props.removeChild;

    this.removeChildHander = this.removeChildHander.bind(this);
  }

  hideChildren() {
    this.setState(prevState => ({ hide_children: !prevState.hide_children }));
  }

  updateTotal(amount, isAdd) {
    this.setState(prevState => ({
      total_amount: isAdd
        ? prevState.total_amount + amount
        : prevState.total_amount - amount
    }));
    if (this.props.parentCallBack !== null)
      this.props.parentCallBack(amount, isAdd);
  }

  addChild(node) {
    this.setState(prevState => {
      return { children: [...prevState.children, node] };
    });
    this.updateTotal(node.total_amount, true);
  }

  removeChild({ id, total_amount }) {
    this.setState(prevState => {
      return {
        children: prevState.children.filter(c => c.id !== id)
      };
    });
    this.updateTotal(total_amount, false);
  }

  removeChildHander(id, total_amount) {
    this.parentRemoveChild({ id, total_amount });
  }

  render() {
    return (
      <div className="node_container">
        <p>{"{"}</p>
        <p>id: {this.state.id}</p>
        <p>name: {this.state.name}</p>
        <p>parent_id: {this.state.parent_id}</p>
        <p>amount: {this.state.amount}</p>
        <p>total_amount: {this.state.total_amount}</p>
        <p
          className={
            this.state.children.length > 0
              ? this.state.hide_children
                ? "node_container__collapsed"
                : "node_container__collapsor"
              : ""
          }
          onClick={this.hideChildren}
        >
          children: {this.state.children.length < 1 && <span>[]</span>}
        </p>
        {this.state.children.length > 0 && this.state.hide_children ? (
          <span>[...]</span>
        ) : (
          this.state.children.length > 0 &&
          this.state.children.map(c => (
            <Node
              parentCallBack={this.updateTotal}
              removeChild={this.removeChild}
              key={c.id}
              node={c}
            />
          ))
        )}
        <AddModal
          parentId={this.state.parent_id}
          id={this.state.id}
          total_amount={this.state.total_amount}
          addChild={this.addChild}
          removeChild={this.removeChildHander}
        />
        <p>{"}"}</p>
      </div>
    );
  }
}

export default Node;
