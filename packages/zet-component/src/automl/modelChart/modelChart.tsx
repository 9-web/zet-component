import * as React from "react";
import { Radio } from "antd";
import { AutoChart, RocChart, BarChart } from "./charts";
import { LocaleReceiverHoc } from "../../utils/hoc";
import MetricsConfig from "../config/metrics";

import "./index.less";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
export interface ModelChartProps {
  /** 图表数据 */
  data: any;
  /** 评分指标数据 */
  gradeData: any;
  /** 算法得分 */
  legendScore: any;
  intl?: any;
}

export interface ModelChartState {
  /** 图表类型 */
  chart: string;
}
class ModelChart extends React.Component<ModelChartProps, ModelChartState> {
  constructor(props: ModelChartProps) {
    super(props);
    this.state = { chart: "auto" };
  }
  params = () => {
    const { gradeData } = this.props;
    const set = new Set([]);
    for (const model of gradeData) {
      if (model.metricList.length > 0) {
        model.metricList.forEach(v => {
          set.add(v.name);
        });
      }
    }
    const arr = [];
    MetricsConfig.forEach(v => {
      set.forEach(a => {
        if (a === v.value) {
          arr.push(v);
        }
      });
    });
    return arr;
  }
  changeChart = e => {
    this.setState({
      chart: e.target.value,
    });
  }
  render() {
    const { chart } = this.state;
    const { gradeData, data, legendScore, intl = {} } = this.props;
    const paramsOptionList = this.params().map(item => {
      return (
        <RadioButton value={item.value} key={item.value}>
          {item.name}
        </RadioButton>
      );
    });
    return (
      <div className={"autoParams"}>
        <div className={"grading"}>
          <span>{intl.grading || "评分指标"}</span>
          <div className={"ml15"}>
            <RadioGroup defaultValue="auto" onChange={this.changeChart}>
              <RadioButton value="auto">
                {intl.autoParams || "自动调参"}
              </RadioButton>
              {paramsOptionList}
            </RadioGroup>
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          {chart === "auto" && (
            <AutoChart data={data} legendScore={legendScore} />
          )}
          {chart !== "auto" && chart !== "roc" && (
            <BarChart chart={chart} jobData={gradeData} />
          )}
          {chart === "roc" && gradeData.length > 0 && (
            <RocChart chart={chart} jobData={gradeData} />
          )}
        </div>
      </div>
    );
  }
}

export default LocaleReceiverHoc("AutoML")(ModelChart);
