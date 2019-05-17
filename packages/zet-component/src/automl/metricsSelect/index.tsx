import * as React from "react";
import { Select } from "antd";
import MetricsConfig from "../config/metrics";

const { Option } = Select;

export interface MetricsSelectProps {
  metrics: object[];
  metricsVal: string;
  /** 切换标准回调 */
  changeMetrics?: (value: string) => void;
}

export interface MetricsSelectState {}

class Index extends React.Component<MetricsSelectProps, MetricsSelectState> {
  constructor(props: MetricsSelectProps) {
    super(props);
    this.state = {};
  }

  changeMetrics = (val) => {
    this.props.changeMetrics(val);
  }

  format = () => {
    const { metrics } = this.props;
    const arr = [];
    if (metrics && metrics.length > 0) {
      metrics.forEach((val) => {
        MetricsConfig.forEach((v) => {
          if (v.value === val) {
            arr.push(v);
          }
        });
      });
    }
    return arr;
  }

  render() {
    const { metricsVal } = this.props;
    const metricsList =
      this.format().length > 0 &&
      this.format().map((v) => (
        <Option value={v.value} key={v.value}>
          {v.name}
        </Option>
      ));
    return (
      <Select
        style={{ width: 120 }}
        value={metricsVal}
        onSelect={this.changeMetrics}
      >
        {metricsList}
      </Select>
    );
  }
}

export default Index;
