import React from "react";
import Modal from "react-modal";
import uuid from "uuid";
import PropTypes from "prop-types";

import validateForm from "../utils/helper";

class AddModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: undefined, name: "", amount: "" };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.submitHandler = this.submitHandler.bind(this);

    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  }

  handleInputChanged(e) {
    e.persist();
    const value = e.target.value;
    const name = e.target.name;

    this.setState(() => ({
      [name]: value
    }));
  }

  submitHandler(e) {
    e.preventDefault();
    console.log(this.state.name, this.state.amount);
    const errors = validateForm({
      name: this.state.name,
      amount: this.state.amount
    });
    if (errors) {
      this.setState(() => ({
        errors: [...errors]
      }));
    } else {
      this.props.addChild({
        id: uuid(),
        name: e.target.elements.name.value,
        parent_id: this.props.parentId,
        amount: parseFloat(e.target.elements.amount.value),
        total_amount: parseFloat(e.target.elements.amount.value),
        children: []
      });
      this.setState({ modalIsOpen: false });
    }
  }

  render() {
    return (
      <div>
        <div>
          <button className="btn btn--Add" onClick={this.openModal}>
            Add
          </button>
          <button
            className="btn btn--Remove"
            onClick={() =>
              this.props.removeChild(this.props.id, this.props.total_amount)
            }
          >
            Remove
          </button>
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
          className="modal"
        >
          {this.state.errors && (
            <div className="modal__error">
              {this.state.errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              className="add_form"
              placeholder="Name"
              name="name"
              onChange={this.handleInputChanged}
            />
            <input
              type="text"
              className="add_form"
              placeholder="Amount (123.12)"
              name="amount"
              onChange={this.handleInputChanged}
            />

            <div>
              <input value="Add" type="submit" />
              <button onClick={this.closeModal}>close</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

AddModal.prototype = {
  parentId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  total_amount : PropTypes.number.isRequired,
  addChild: PropTypes.func.isRequired,
  removeChild: PropTypes.func.isRequired
}

export default AddModal;
