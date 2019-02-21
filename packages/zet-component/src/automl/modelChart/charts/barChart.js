import React, { Component } from 'react';
import {Chart, Geom, Axis, Tooltip} from 'bizcharts';

class AutoChart extends Component {
  fommatBarChart = () => {
    const { jobData, chart } = this.props;
    const res = [...jobData];
    const arr = [];
    if (res.length > 0) {
      res.forEach((v) => {
        if (v.metricList.length > 0) {
          v.metricList.forEach((item) => {
            if (item.name === chart) {
              arr.push({
                x: v.name,
                y: item.score,
              });
            }
          });
        }
      });
    }
    return arr;
  }

  render() {
    const { chart } = this.props;
    return (
      <Chart
        height={300}
        data={this.fommatBarChart()}
        forceFit
        scale={{ y: { alias: chart } }}
        padding={[40, 300, 60, 60]}
      >
        <Axis name='x' />
        <Axis name='y' />
        <Tooltip inPlot={false} crosshairs={{ type: 'rect' }} />
        <Geom size={24} type="interval" color='#13c2c2' position="x*y" />
      </Chart>
    );
  }
}

export default AutoChart;
