import React, { Component } from 'react'

export default class StateComponent extends Component {
state= {
    count: 0
}

handleClick = () => {
    const fans = Math.floor(Math.random() * 10); // 8
    setTimeout(() => {
        console.log('宏任务')
    },0)
    new Promise((resolve, reject) => {
      resolve('微任务')
    }).then((res) => {
      console.log('res',res);
    }

)
    // Promise.resolve().then(() => console.log('promise then') /* callback */)
    this.setState((state, props)=>({
        count: state.count + fans // 0 + 8
    }), () => {
        console.log('state:', this.state.count)
    })
}
// constructor() {
//     super()
//     this.state = {
//       val: 0
//     }
//   }

//   clickHandler = () => {
//     console.log('--- start ---')

//     Promise.resolve().then(() => console.log('promise then') /* callback */)

//     // “异步”
//     this.setState(
//       { val: this.state.val + 1 },
//       () => { console.log('state...', this.state) } // callback
//     )

//     console.log('--- end ---')
//   }


  render() {

    return (
      <div onClick={this.handleClick}>{this.state.count}</div>
    )
  }
}
