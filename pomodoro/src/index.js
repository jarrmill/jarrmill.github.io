import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CountDown from './CountDown.js'
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {currentCount:5, workState:0, currentMin:50, currentSec:30,
    initWorkCount: 60, initRestCount:30, isOpen:false};
    this.timer = this.timer.bind(this);
    this.changeWorkTime = this.changeWorkTime.bind(this);
  }
  startTimer(){
    var intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId});
  }
  stopTimer(){
    clearInterval(this.state.intervalId);
  }
  checkZero(){
    if(this.state.currentCount <= true){
      this.setState({workState: !this.state.workState});
      if(this.state.workState === true){
        this.setState({currentCount:this.state.initWorkCount});
      }
      else{
        this.setState({currentCount:this.state.initRestCount});
      }
    }
  }
  timer(){
    this.checkZero();
    var newTime = this.state.currentCount - 1;
    var minutes = Math.floor(newTime / 60);
    var seconds = newTime % 60;

    minutes = minutes < 10 ? "0" + minutes.toString() : minutes;
    seconds = seconds < 10 ? "0" + seconds.toString() : seconds;
    console.log(minutes + ":" + seconds)

    this.setState({currentCount: newTime, currentMin: minutes, currentSec: seconds});

  }
  toggleModal(){
    this.setState({isOpen: !this.state.isOpen});
  }
  changeWorkTime(event){
    var newCount = this.state.currentCount - (this.state.initWorkCount - event.target.value);
    this.setState({currentCount: newCount, initWorkCount: event.target.value});
  }
  render() {
    return(
    <div>
      <CountDown minutes={this.state.currentMin} seconds={this.state.currentSec} />
      <button onClick={() => this.startTimer()}>Start Timer</button>
      <button onClick={() => this.stopTimer()}>Stop Timer</button>
      <button onClick={() => this.toggleModal()}>ToggleModal</button>
      <div className='modal' style={{display: this.state.isOpen ? 'block' : 'none'}}>
        <input type='range' name='Work Time' min='60' max='300' value={this.state.initWorkCount} onChange={this.changeWorkTime}></input>
      </div>
    </div>
  )}
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
