import * as React from 'react';
import { Radio } from 'antd';
import { AutoChart, RocChart, BarChart } from './charts';
import MetricsConfig from '../config/metrics';
import styles from './index.less';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class ModelChart extends React.Component {
    constructor(props) {
        super(props);
        this.params = () => {
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
        };
        this.changeChart = (e) => {
            this.setState({
                chart: e.target.value,
            });
        };
        this.state = { chart: 'auto' };
    }
    render() {
        const { chart } = this.state;
        const { gradeData, data, legendScore } = this.props;
        const paramsOptionList = this.params().map((item) => {
            return (React.createElement(RadioButton, { value: item.value, key: item.value }, item.name));
        });
        return (React.createElement("div", { className: styles.autoParams },
            React.createElement("div", { className: styles.grading },
                React.createElement("span", null, "\u8BC4\u5206\u6307\u6807"),
                React.createElement("div", { className: styles.ml15 },
                    React.createElement(RadioGroup, { defaultValue: "auto", onChange: this.changeChart },
                        React.createElement(RadioButton, { value: "auto" }, "\u81EA\u52A8\u8C03\u53C2"),
                        paramsOptionList,
                        React.createElement(RadioButton, { value: "roc" }, "ROC")))),
            React.createElement("div", { style: { overflow: 'hidden' } },
                chart === 'auto' && (React.createElement(AutoChart, { data: data, legendScore: legendScore })),
                (chart !== 'auto' && chart !== 'roc') && (React.createElement(BarChart, { chart: chart, jobData: gradeData })),
                chart === 'roc' && gradeData.length > 0 && (React.createElement(RocChart, { chart: chart, jobData: gradeData })))));
    }
}
export default ModelChart;
//# sourceMappingURL=modelChart.js.map