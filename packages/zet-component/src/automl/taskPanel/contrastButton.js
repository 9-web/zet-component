import * as React from 'react';
import { Button } from 'antd';
import styles from './index.less';
class ContrastButton extends React.Component {
    constructor(props) {
        super(props);
        this.showContras = (e, item, jobId, jobName) => {
            e.stopPropagation();
            this.props.showContras(item, jobId, jobName);
        };
        this.isDisabled = () => {
            const { item, contrastIds, contrastJobId, jobId } = this.props;
            if (contrastJobId && contrastJobId === jobId) {
                return true;
            }
            if (item.modelTrainStatus) {
                return contrastIds.indexOf(item.modelId) !== -1 || item.modelTrainStatus !== 'SUCCESS';
            }
            if (item.trainStatus) {
                return contrastIds.indexOf(item.modelId) !== -1 || item.trainStatus !== 'SUCCESS';
            }
            return contrastIds.indexOf(item.modelId) !== -1;
        };
        this.state = {};
    }
    render() {
        const { contrastIds, item, jobName, style, jobId } = this.props;
        return (React.createElement(Button, { size: 'small', style: style, className: styles.ml15, disabled: this.isDisabled(), onClick: (e) => {
                this.showContras(e, item, jobId, jobName);
            } }, contrastIds.indexOf(item.modelId) !== -1 ? '已添加' : '对比'));
    }
}
export default ContrastButton;
//# sourceMappingURL=contrastButton.js.map