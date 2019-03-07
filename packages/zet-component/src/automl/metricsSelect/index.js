import * as React from 'react';
import { Select } from 'antd';
import MetricsConfig from '../config/metrics';
const { Option } = Select;
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.changeMetrics = (val) => {
            this.props.changeMetrics(val);
        };
        this.format = () => {
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
        };
        this.state = {};
    }
    render() {
        const { metricsVal } = this.props;
        const metricsList = this.format().length > 0 && this.format().map((v) => (React.createElement(Option, { value: v.value, key: v.value }, v.name)));
        return (React.createElement(Select, { style: { width: 120 }, value: metricsVal, onSelect: this.changeMetrics }, metricsList));
    }
}
export default Index;
//# sourceMappingURL=index.js.map