import React, { Component } from "react";
import Calendar from "./Calendar";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <Calendar />
      </div>
    );
  }
}

export default Home;
