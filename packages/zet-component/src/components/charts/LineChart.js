import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

class LineChart extends React.PureComponent {
  state = {}

  render() {
    const { data = [], cols = {}, chart = {}, axisH = {}, axisV = {},
      tooltip = {}, geomLine = {}, geomPoint = {}, showxy = true, yName } = this.props;

    if (this.chartI) {
      this.chartI.forceFit();
    }
    return (
      <Chart
        height={300}
        data={data}
        scale={cols}
        forceFit
        padding={[40, 40, 60, 60]}
        {...chart}
        onGetG2Instance={(chartI) => {
          this.chartI = chartI;
        }}
      >
        {showxy && (<Axis name="x" {...axisH} />)}
        {showxy && <Axis name="y" {...axisV} />}
        <Tooltip crosshairs={{ type: 'y' }} {...tooltip} />
        <Geom
          type="line"
          shape="smooth"
          position="x*y"
          size={2}
          {...geomLine}
          tooltip={
            ['x*y', (x, y) => {
              return {
                title: x,
                name: yName || '',
                value: y,
              };
            }]
          }
        />
        <Geom
          type="point"
          position="x*y"
          size={4}
          shape="circle"
          style={{
            stroke: '#fff',
            lineWidth: 1,
          }}
          tooltip={
            ['x*y', (x, y) => {
              return {
                title: x,
                name: yName || 'y',
                value: y,
              };
            }]
          }
          {...geomPoint}
        />
      </Chart>
    );
  }
}

export default LineChart;
