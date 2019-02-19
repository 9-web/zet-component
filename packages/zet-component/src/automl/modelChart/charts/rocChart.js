import React, { Component } from 'react';
import { Select } from 'antd';
import CurveChartMore from './CurveChartMore'
import styles from '../index.less';

const { Option } = Select;
class RocChart extends Component {
  state = {
    chartType: '',
  };

  changeChartType=(val) => {
    this.setState({
      chartType: val,
    });
  }

  rocList=() => {
    const { jobData } = this.props;
    const set = new Set([]);
    for (const model of jobData) {
      if (model.roc) {
        for (const cn of Object.keys(model.roc)) {
          set.add(cn);
        }
      }
    }
    const arr = [];
    set.forEach(a => arr.push(a));
    return arr;
  }

  render() {
    const { jobData } = this.props;
    const { chartType } = this.state;
    const optionList = this.rocList().map((item) => {
      return (<Option value={item} key={item}>{item}</Option>);
    });
    return (
      <div>
        <Select value={chartType === '' ? this.rocList()[0] : chartType} onChange={this.changeChartType} className={styles.chartSelect}>
          {optionList}
        </Select>
        <CurveChartMore
          data={jobData}
          type={chartType === '' ? this.rocList()[0] : chartType}
          height={250}
        />
      </div>
    );
  }
}

export default RocChart;
