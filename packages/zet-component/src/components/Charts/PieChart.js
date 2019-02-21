import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Guide, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Html } = Guide;

class PieChart extends React.Component {
  getCols = () => {
    return {
      percent: {
        formatter: val => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
  };

  render() {
    const { data = [], chart = {}, tooltip = {},
      coord = {}, guideHtml = {}, geom = {}, legend = {}, color = ['#13c2c2', '#f0f2f5'] } = this.props;
    const legendObj = legend === true ? {} : legend;
    const dv = new DataView().source(data).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    });
    const cols = this.getCols();
    return (
      <div>
        <Chart
          height={160}
          data={dv}
          scale={cols}
          padding={[20, 0, 0, 0]}
          forceFit
          {...chart}
        >
          <Coord type="theta" radius={0.75} innerRadius={0.8} {...coord} />
          <Axis name="percent" />
          {!!legend && (
            <Legend
              itemFormatter={(name) => {
                if (name === 'fail') {
                  return '失败';
                } if (name === 'success') {
                  return '成功';
                }
                return name;
              }}
              {...legendObj}
            />
          )}
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            {...tooltip}
          />
          <Guide>
            <Html
              position={['50%', '50%']}
              alignX="middle"
              alignY="middle"
              {...guideHtml}
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={['x', color]}
            tooltip={[
              'x*percent',
              (item, percent) => {
                percent = `${Math.round(percent * 100)}%`;
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
            {...geom}
          />
        </Chart>
      </div>
    );
  }
}

export default PieChart;
