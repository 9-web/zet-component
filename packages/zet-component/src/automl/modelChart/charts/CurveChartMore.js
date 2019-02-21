import React, { PureComponent } from 'react';
import { Chart, Tooltip, Axis, Legend, Geom, View } from 'bizcharts';
import { DataView } from '@antv/data-set';

class CurveChartMore extends PureComponent {
  render() {
    const { data, height, type } = this.props;
    const chartdata = [];
    for (const model of data) {
      if (model.roc && model.roc[type]) {
        model.roc[type].data.forEach(point => chartdata.push({ x: point['False positive rate'], y: point['True positive rate'], name: model.name }));
      }
    }
    chartdata.push({
      x: 0,
      y: 0,
    });
    chartdata.push({
      x: 1,
      y: 1,
    });
    const dv = new DataView().source(chartdata);
    const dv2 = new DataView().source([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
    const scale = {
      x: {
        min: 0,
        max: 1,
        alias: 'False positive rate',
        tickCount: 11,
        formatter: (value) => {
          return `${(value * 100).toFixed(0).toString()}%`;
        },
      },
      y: {
        min: 0,
        max: 1,
        alias: 'True positive rate',
        tickCount: 11,
        formatter: (value) => {
          return `${(value * 100).toFixed(0).toString()}%`;
        },
      },
    };
    return (
      <Chart forceFit height={height} data={dv.rows} scale={scale} padding={[40, 300, 60, 60]}>
        <Tooltip />
        <Legend position='right-center' name='name' marker='circle' />
        <View data={dv.rows}>
          <Axis />
          <Geom type='line' position='x*y' color='name' />
        </View>
        <View data={dv2.rows}>
          <Geom type='line' shape='dash' position='x*y' color="#e56285" tooltip={false} />
        </View>
      </Chart>
    );
  }
}

export default CurveChartMore;
