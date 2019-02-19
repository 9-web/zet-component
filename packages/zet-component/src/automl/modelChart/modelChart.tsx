import * as React from 'react';
import classnames from 'classnames';
import { Radio } from 'antd';
import {AutoChart,RocChart,BarChart} from './charts'

import styles from './index.less';


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
export interface ModelChartProps {
  /** 图表数据 */
  data:any,
  /** 评分指标数据 */
  gradeData:any,
  /** 算法得分 */
  legendScore:any
}

export interface ModelChartState {
  /** 图表类型 */
  chart:string
}
const MetricsConfig =  [
  { value: 'explained_variance', name: 'EVS' },
  { value: 'neg_mean_absolute_error', name: 'MAE' },
  { value: 'neg_mean_squared_error', name: 'MSE' },
  { value: 'neg_mean_squared_log_error', name: 'MSLE' },
  { value: 'neg_median_absolute_error', name: 'MedianAE' },
  { value: 'r2', name: 'R2' },
  { value: 'accuracy', name: 'Accuracy' },
  { value: 'f1', name: 'F1' },
  { value: 'precision', name: 'Precision' },
  { value: 'recall', name: 'Recall' },
  { value: 'roc_auc', name: 'AUC' },
  { value: 'fbeta', name: 'FBeta' },
  { value: 'log_loss', name: 'Log Loss' },
];

class ModelChart extends React.Component<ModelChartProps, ModelChartState> {
  constructor(props: ModelChartProps) {
    super(props);
    this.state = { chart:'auto'}
  }
  params=() => {
    const { gradeData } = this.props;
    const set = new Set([]);
    for (const model of gradeData) {
      if (model.metricList.length > 0) {
        model.metricList.forEach((v) => {
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
  changeChart = (e) => {
    this.setState({
      chart: e.target.value,
    });
  };
  render() {
    const { chart } = this.state;
    const {gradeData, data, legendScore} = this.props;
    const paramsOptionList = this.params().map((item) => {
      return (<RadioButton value={item.value} key={item.value}>{item.name}</RadioButton>);
    });
    console.log('data-gradeData',data,gradeData)
    return (
      <div className={styles.autoParams}>
        <div className={styles.grading}>
          <span>
            评分指标
          </span>
          <div className={styles.ml15}>
            <RadioGroup defaultValue="auto" onChange={this.changeChart}>
              <RadioButton value="auto">自动调参</RadioButton>
              {paramsOptionList}
              <RadioButton value="roc">ROC</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          {chart === 'auto' && (
            <AutoChart
              data={data}
              legendScore={legendScore}
            />
          )}
          {(chart !== 'auto' && chart !== 'roc') && (
            <BarChart chart={chart} jobData={gradeData} />
          )}
          {
            chart === 'roc' && gradeData.length > 0 && (
              <RocChart chart={chart} jobData={gradeData}/>
            )
          }
        </div>
      </div>
    );
  }
}

export default ModelChart
