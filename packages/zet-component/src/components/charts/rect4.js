import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
} from 'bizcharts';
import { DataView } from '@antv/data-set';

function Rect4(props) {
  const { data, height } = props;
  const newData = Object.keys(data).map(key => ({
    x: key, y: data[key],
  }));
  const dv = new DataView().source(newData);
  dv.transform({
    type: 'sort',
    callback(a, b) {
      return a.y - b.y;
    },
  });
  const scale = {
    y: {
      min: 0,
      // max: 1,
      alias: 'value',
    },
  };
  return (
    <Chart height={height} data={dv} forceFit padding={[5, 0, 5, 'auto']} scale={scale}>
      <Coord transpose />
      <Axis
        name='x'
        label={{
          offset: 12,
          formatter: (text) => {
            if (text.length > 20) {
              return `${text.slice(0, 18)}...`;
            }
            return text;
          },
        }}
        grid={null}
        tickLine={null}
        line={null}
      />
      <Axis name='y' visible={false} />
      <Tooltip />
      <Geom
        type='interval'
        position='x*y'
        color='#13c2c2'
        tooltip={
          ['y', (y) => {
            return {
              name: 'value',
              value: `${y * 100}%`,
            };
          }]
        }
      />
    </Chart>
  );
}

export default Rect4;
