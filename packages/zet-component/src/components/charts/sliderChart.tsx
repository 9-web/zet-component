import React from 'react';
import {Chart, Geom, Axis, Tooltip, Legend} from "bizcharts";
import DataSet from "@antv/data-set";

import Slider from "bizcharts-plugin-slider";

const colors = ['#6EC379','#F57070','#72ADF3','#92C1F8','#D9DFE3']
export interface SliderChartProps {
  /** 组件行行内样式 */
  data:any,
  height?: number | string,
  titles?:Title[],
  scales?:Scale,
  defaultTimeRange?:any[],
  logInfo?:any,
}

export interface Title{
  alias: string,
  key:string,
  color?:string
}
export interface Scale{
  axisX?:Axis,
  axisY:Axis[]
}
export interface Axis{
  key:string,
  alias?:string,
  type?: string,
  tickCount?: number,
  mask?: string,
  color?: string
}
export interface SliderChartState {

}

function getComponent(dataInfo,props) {
  const {data,begin,end} = dataInfo;
  let {scales={},titles, defaultTimeRange=[],logInfo} = props;
  const ds = new DataSet({
      state: {
        start: begin ? new Date(begin).getTime() : new Date().getTime(),
        end: end ? new Date(end).getTime() : new Date().getTime()
      }
    });
  let axisX = scales.axisX || {key:'x',type:'time',tickCount:8,mask:'MM/DD HH:mm'};
  let axisY = scales.axisY || titles || [{key:'y',alias:'y'}];
  let geoms=[],axis=[],axisYObj={},axisYScale={},defaultYAxis='y';
  const dv = ds.createView("origin").source(data);

  if(defaultTimeRange.length===2){
    ds.setState("start", defaultTimeRange[0]);
    ds.setState("end", defaultTimeRange[1]);
  }
  axisY.forEach((item,index)=>{
    const { key, type, alias, notAllowZero, ...other } = item;
    if(index===0) defaultYAxis = key;
    axisYScale[key] = {
      alias:alias
    };
    axisYObj[key] = {
      notAllowZero,
      ...other
    };
    geoms.push(<Geom
      type={type || 'line'}
      position={`${axisX.key}*${key || 'y'}`}
      color={other.color || colors[index]}
      opacity={0.85}
      {...other}
    />)
    axis.push(<Axis name={key} />)
  })
  const scale = {
    [axisX.key]: {
      type: axisX.type || "time",
      tickCount: axisX.tickCount || 8,
      mask: axisX.mask || "MM/DD HH:mm",
    },
    ...axisYScale
  };
  titles = Array.isArray(titles) && titles.length>0 ? titles : (axisY || []);

  const legendItems =  titles.map((item,index)=>{
      return {
        value: item.alias,
        key:item.key,
        marker: {
          symbol: "circle",
          fill: item.color || colors[index],
          radius: 5
        }
      }
  }) || [];
  let chart;
  const {height} = props;
  if(logInfo){
    console.log('sliderChartLogInfo >> start')
    console.log('data >',data);
    console.log('scale > ',scale);
    console.log('axis > ', axis);
    console.log('axisYScale > ',axisYScale);
    console.log('axisYObj > ',axisYObj);
    console.log('legendItems > ', legendItems);
    console.log('geoms > ', geoms)
    console.log('sliderChartLogInfo >> end')
  }
  dv.transform({
    type: "filter",
    callback(obj) {
      const time = new Date(obj[axisX.key]).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
      let flag = true;
     /* Object.keys(axisYObj).forEach(item=>{
        if(obj[item] === null || (axisYObj[item].notAllowZero && obj[item] === 0)){
          flag = false;
          return;
        }
      })*/
      return flag && time >= ds.state.start && time <= ds.state.end ;
    }
  });
  class SliderChart extends React.Component {
    onChange(obj) {
      const { startValue, endValue } = obj;
      ds.setState("start", startValue);
      ds.setState("end", endValue);
    }
    render() {
      return (
        <div>
          <Chart
            height={height}
            data={dv}
            padding={[40, 40, 40, 80]}
            scale={scale}
            onGetG2Instance={g2Chart => {
              g2Chart.animate(false);
              chart = g2Chart;
            }}
            forceFit
          >
            {axis}
            <Tooltip />
            <Legend
              custom
              position="top"
              items={legendItems}
              onClick={ev => {
                const item = ev['item'];
                const value = item.key;
                const checked = ev['checked'];
                const geoms = chart.getAllGeoms();
                for (let i = 0; i < geoms.length; i++) {
                  const geom = geoms[i];
                  if (geom.getYScale().field === value) {
                    if (checked) {
                      defaultYAxis = value;
                      geom.show();
                    } else {
                      geom.hide();
                    }
                  }
                }
              }}
            />
            {geoms}
          </Chart>
          <div>
            <Slider
              width="auto"
              height={26}
              start={defaultTimeRange[0] || ds.state.start}
              end={defaultTimeRange[1] || ds.state.end}
              xAxis={axisX.key}
              yAxis={defaultYAxis}
              scales={scale}
              data={dv}
              backgroundChart={{
                type: "line"
              }}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
  return SliderChart;
}


class SliderChart extends React.Component<SliderChartProps, SliderChartState> {
  constructor(props: SliderChartProps) {
    super(props);
    this.state = {}
  }
  shouldComponentUpdate(){
    return false;
  }
  render(){
    const {data,...otherProps} = this.props;
    const Chart = getComponent(data,otherProps);
    return <Chart></Chart>
  }
}

export default SliderChart
