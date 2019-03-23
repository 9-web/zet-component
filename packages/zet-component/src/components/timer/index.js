import React, { Component } from 'react';
import moment from 'moment';
// import intl from 'utils/intl';
import { getServerCurrentTime } from '../../utils/utils';
import styles from './index.less';


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: moment(props.start || 0).valueOf(),
      end: moment(props.end || props.start || 0).valueOf(),
    };
  }

  componentDidMount() {
    if (this.props.status === 'start') {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    const preTick = this.props.status;
    const nextTick = nextProps.status;
    if (preTick !== nextTick && nextTick === 'start') {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
    }
    if (preTick !== nextTick && (nextTick === 'stop' || nextTick === '')) {
      this.stopTick();
      this.setState({
        end: moment(nextProps.end).valueOf(),
      });
    }
  }

  componentWillUnmount() {
    this.stopTick();
  }

  stopTick = () => {
    clearInterval(this.interval);
    this.interval = null;
  }

  tick = () => {
    const end = getServerCurrentTime().format('x');
    this.setState({
      end,
    });
  }

  addZero = (num) => {
    return num < 10 ? `0${num}` : num;
  }

  render() {
    const timer = moment.duration(this.state.end - this.state.start, 'ms');
    const hours = timer.get('hours');
    const mins = timer.get('minutes');
    const sec = timer.get('seconds');
    return (
      <div className={styles.timer}>
        <div className={styles.timerTit}>耗时</div>
        <div className={styles.userTimer}>
          {this.addZero(hours)} : {this.addZero(mins)} : {this.addZero(sec)}
        </div>
      </div>
    );
  }
}

export default Timer;
