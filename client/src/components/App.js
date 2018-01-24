import React, { Component } from "react";
import Node from "./Node";

class App extends Component {
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
        {this.state.loading && <div class="loader"></div>}
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
