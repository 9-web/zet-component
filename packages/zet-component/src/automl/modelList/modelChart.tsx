import React from "react";
import { Card, Row, Col, List, Icon, Spin } from "antd";
import moment from "moment";
import Chart from "../../components/charts";
import { LocaleReceiverHoc } from "../../utils/hoc";
import CardExtra from './CardExtra';
import "./index.less";
// import sliderData from './_mock/chartData';
// import {start} from "repl";

const { SliderChart } = Chart;

export interface ModelChartProps {
  /** 组件行行内样式 */
  data?: any;
  autoMLInfo?: any;
  item?: any;
  intl?: any;
  jobId?: string;
  getView?: (blockId: string) => void;
  getForecast?: (moduleId: string) => void;
  openModelDetail?: (modelId: string, modelName: string, jobId: string) => void;
}

export interface ModelChartState {}

class ModelChart extends React.Component<ModelChartProps, ModelChartState> {
  constructor(props: ModelChartProps) {
    super(props);
    this.state = {};
  }
  durtion = (startTime, endTime) => {
    const result = moment(endTime).diff(moment(startTime), "seconds");
    return isNaN(result) ? 0 : result;
  }
  view = blockId => {
    this.props.getView && this.props.getView(blockId);
  }

  forecast = moduleId => {
    this.props.getForecast && this.props.getForecast(moduleId);
  }

  openModelDetail = () => {
    const {
      item: { name, modelId },
      jobId,
    } = this.props;
    this.props.openModelDetail &&
      this.props.openModelDetail(modelId, name, jobId);
  }
  render() {
    const {
      item: {
        blockId,
        modelId,
        repository,
        name,
        trainBeginTime,
        trainEndTime,
      },
      autoMLInfo = {},
      intl = {},
      ...otherProps
    } = this.props;

    return (
      <div className={"mdlItem"} id={modelId}>
        <Card
          title={
            <span>
              <span style={{ marginRight: 8 }}>{autoMLInfo.metricName}</span>
              <span
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  color: "rgba(16, 38, 58, 0.45)",
                }}
              >
                {name}
              </span>
              <span style={{ fontSize: 14, color: "rgba(16, 38, 58, 0.45)" }}>
                {intl.runTime || "运行时间"}{" "}
                {this.durtion(trainBeginTime, trainEndTime)}s
              </span>
            </span>
          }
          extra={
            <CardExtra
              modelId={modelId}
              id={blockId}
              view={this.view}
              forecast={this.forecast}
              openModelDetail={this.openModelDetail}
            />
          }
          bordered={false}
          // style={{ width: 300 }}
        >
          <div>
            {repository && <SliderChart data={repository} {...otherProps} />}
          </div>
        </Card>
      </div>
    );
  }
}

export default LocaleReceiverHoc('AutoML')(ModelChart);
