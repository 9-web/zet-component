import React from 'react';
import ModuleListItem from './modelItem';
import ModelDetail from './modelDetail';
import styles from './index.less';
class ModelList extends React.Component {
    constructor(props) {
        super(props);
        this.sort = () => {
            const { data } = this.props;
            const arr = data.filter(v => [5, 7, 8].indexOf(v.status) !== -1);
            return arr;
        };
        this.getContent = () => {
            const { contentType } = this.props;
            if (contentType === 'list') {
                return (React.createElement("div", { className: styles.mudoleList },
                    React.createElement("div", { className: styles.listWrap }, this.sort().length > 0 && this.sort().map((v) => {
                        if (v.mouduleName) {
                            return (React.createElement(ModuleListItem, { data: v }));
                        }
                        return '';
                    }))));
            }
            else {
                const { jobData, jobId } = this.props;
                return (React.createElement("div", { className: styles.mdlMain }, jobData.map((item, index) => {
                    return React.createElement(ModelDetail, { item: item, jobId: jobId, key: index, getView: this.props.getView, getForecast: this.props.getForecast, openModelDetail: this.props.openModelDetail });
                })));
            }
        };
        this.state = {};
    }
    render() {
        return (React.createElement("div", null, this.getContent()));
    }
}
export default ModelList;
//# sourceMappingURL=modelList.js.map