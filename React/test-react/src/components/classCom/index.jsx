import React, { Component } from "react";
import { Button } from "antd";

export default class Index extends Component {
  state = {
    value: 1,
    name: "张三",
  };

  log = () => {
    setTimeout(() => {
      alert(this.state.value);
    }, 3000);
  };
  handleName = () => {
    this.setState({
      name: this.state.name + "~",
    });
    this.setState({
      name: this.state.name + "~",
    });
    this.setState({
      name: this.state.name + "~",
    });
    console.log(this.state.name);
  };
  handleName2 = () => {
    this.setState((pre) => ({
      name: pre.name + "~",
    }));
    this.setState((pre) => ({
      name: pre.name + "~",
    }));
    this.setState((pre) => ({
      name: pre.name + "~",
    }));
    console.log(this.state.name);
  };
  handleName3 = () => {
    // 此处的name没有闭包特性，name为改变之后的name，先显示张三~，然后在现实张三~！

    this.setState({
      name: this.state.name + "~",
    });
    setTimeout(() => {
      this.setState({
        name: this.state.name + "!",
      });
      this.setState({
        name: this.state.name + "!",
      });
      this.setState({
        name: this.state.name + "!",
      });
      console.log(this.state.name);
    }, 1000);
  };
  render() {
    console.log("render");
    return (
      <>
        <div>{this.state.value}</div>
        <Button onClick={this.log}>alert</Button>
        <Button onClick={() => this.setState({ value: this.state.value + 1 })}>
          add
        </Button>
        <Button onClick={this.handleName}>{this.state.name}</Button>
        <Button onClick={this.handleName2}>{this.state.name}</Button>
        <Button onClick={this.handleName3}>{this.state.name}</Button>
      </>
    );
  }
}
