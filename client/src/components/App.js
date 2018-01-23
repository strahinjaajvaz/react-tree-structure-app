import React, { Component } from "react";
import Node from "./Node";

class App extends Component {
  values = {
    id: 0,
    name: "_root",
    parent_id: 0,
    amount: 0,
    total_amount: 50881.18,
    children: [
      {
        id: "1",
        name: "Kropf",
        parent_id: "1",
        amount: 48.67,
        total_amount: 50881.18,
        children: [
          {
            id: "2",
            name: "Chive",
            parent_id: "1",
            amount: 19.15,
            total_amount: 29804.03,
            children: []
          }
        ]
      }
    ]
  };
  state = {
    loading: true,
    response: null
  };

  componentDidMount() {
    this.callApi()
      .then(res =>
        this.setState(() => ({ response: res.express, loading: false }))
      )
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/get_data");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  removeAllChildren() {
    this.setState(() => ({ amount: 0, total_amount: 0, children: [] }));
  }

  render() {
    return (
      <div className="App">
        {this.state.loading && <div>Loading</div>}
        {!this.state.loading && (
          <Node
            removeChild={this.removeAllChildren}
            parentCallBack={null}
            node={this.state.response}
          />
        )}
      </div>
    );
  }
}

export default App;
