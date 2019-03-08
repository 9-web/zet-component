import React from 'react';
import { Card, Row, Col, List, Icon, Spin } from 'antd';
import moment from 'moment';
import { Components } from '../../index';
import styles from './index.less';
import sliderData from './_mock/chartData';
import {start} from "repl";

const {Chart:{ SliderChart }} = Components;

function CardExtra(props) {
  return (
    <span>
      <a onClick={() => { props.forecast(props.modelId); }}>预测</a>
      <span> | </span>
      <a onClick={() => { props.openModelDetail(); }}>查看</a>
      <span> | </span>
      <a onClick={() => { props.view(props.id); }}>日志</a>
    </span>
  );
}

export interface ModelChartProps {
  /** 组件行行内样式 */
  data?:any,
  item?:any,
  jobId?:string,
  getView?:(blockId:string)=>void,
  getForecast?:(moduleId:string)=>void,
  openModelDetail?:(modelId:string,modelName:string,jobId:string)=>void
}

export interface ModelChartState {

}

class ModelChart extends React.Component<ModelChartProps, ModelChartState> {
  constructor(props: ModelChartProps) {
    super(props);
    this.state = {}
  }
  durtion = (startTime, endTime) => {
    return moment(endTime).diff(moment(startTime),'seconds');
  }
  view = (blockId) => {
    this.props.getView && this.props.getView(blockId);
  }

  forecast = (moduleId) => {
    this.props.getForecast && this.props.getForecast(moduleId);
  }

  openModelDetail = () => {
    const {item: {name, modelId}, jobId} = this.props;
    this.props.openModelDetail && this.props.openModelDetail(modelId,name,jobId)
  }
  render() {
    const { item: {blockId, modelId, repository,name,trainBeginTime,trainEndTime}, ...otherProps} = this.props;

    return (
      <div className={styles.mdlItem} id={modelId}>
        <Card
          title={
            <span>
              <span style={{ marginRight: 8 }}>Metric名称</span>
              <span style={{ marginRight: 8, fontSize: 14, color: 'rgba(16, 38, 58, 0.45)' }}>{name}</span>
              <span style={{ fontSize: 14, color: 'rgba(16, 38, 58, 0.45)' }}>{this.durtion(trainBeginTime, trainEndTime)}</span>
            </span>
          }
          extra={(
            <CardExtra
              modelId={modelId}
              id={blockId}
              view={this.view}
              forecast={this.forecast}
              openModelDetail={this.openModelDetail}
            />
          )}
          bordered={false}
          // style={{ width: 300 }}
        >
         <div>
           {
             repository && <SliderChart
               data={repository}
               {...otherProps}
             />
           }
         </div>
        </Card>
      </div>
    );
  }
}

export default ModelChart
