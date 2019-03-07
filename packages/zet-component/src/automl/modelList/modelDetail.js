import React from 'react';
import { Card, Row, Col, List, Icon, Spin } from 'antd';
import { Rect4 } from '../../components/Charts';
import MetricsConfig from '../config/metrics';
import styles from './index.less';
function CardExtra(props) {
    return (React.createElement("span", null,
        React.createElement("a", { onClick: () => { props.forecast(props.modelId); } }, "\u9884\u6D4B"),
        React.createElement("span", null, " | "),
        React.createElement("a", { onClick: () => { props.openModelDetail(); } }, "\u67E5\u770B"),
        React.createElement("span", null, " | "),
        React.createElement("a", { onClick: () => { props.view(props.id); } }, "\u65E5\u5FD7")));
}
class ModelDetail extends React.Component {
    constructor(props) {
        super(props);
        this.durtion = (startTime, endTime) => {
            /*const timer = moment.duration(moment(endTime) - moment(startTime));
            return timer.asSeconds();*/
        };
        this.getname = (val) => {
            const result = MetricsConfig.filter((i) => i.value === val);
            if (result.length > 0) {
                return result[0].name;
            }
            return '';
        };
        this.view = (blockId) => {
            this.props.getView && this.props.getView(blockId);
        };
        this.forecast = (moduleId) => {
            this.props.getForecast && this.props.getForecast(moduleId);
        };
        this.openModelDetail = () => {
            const { item: { name, modelId }, jobId } = this.props;
            this.props.openModelDetail && this.props.openModelDetail(modelId, name, jobId);
        };
        this.state = {};
    }
    render() {
        const { item: { featureImportance, params, metricList, name, blockId, modelId, jobStatus, trainStatus, trainBeginTime, trainEndTime, } } = this.props;
        if ((jobStatus === 'FAIL' && trainStatus !== 'SUCCESS') || trainStatus === 'FAIL') {
            return (React.createElement("div", { className: styles.mdlItem, id: modelId },
                React.createElement(Card, { title: name, extra: (React.createElement(CardExtra, { modelId: modelId, id: blockId, view: this.view, forecast: this.forecast, openModelDetail: this.openModelDetail })), bordered: false },
                    React.createElement(Row, { className: styles.mdlItemStatusRow, type: 'flex', align: 'middle', justify: 'center' },
                        React.createElement("div", null,
                            React.createElement(Icon, { type: 'close-circle', style: { fontSize: 14, color: 'red' } }),
                            "trainfail")))));
        }
        if (trainStatus === 'CREATE') {
            return (React.createElement("div", { className: styles.mdlItem, id: modelId },
                React.createElement(Card, { title: name, extra: (React.createElement(CardExtra, { modelId: modelId, id: blockId, view: this.view, forecast: this.forecast, openModelDetail: this.openModelDetail })), bordered: false },
                    React.createElement(Row, { className: styles.mdlItemStatusRow, type: 'flex', align: 'middle', justify: 'center' },
                        React.createElement("div", null,
                            React.createElement(Spin, { tip: '等待中' }))))));
        }
        if (trainStatus === 'TRAINING' && !featureImportance && !params && !metricList) {
            return (React.createElement("div", { className: styles.mdlItem, id: modelId },
                React.createElement(Card, { title: name, extra: (React.createElement(CardExtra, { modelId: modelId, id: blockId, view: this.view, forecast: this.forecast, openModelDetail: this.openModelDetail })), bordered: false },
                    React.createElement(Row, { className: styles.mdlItemStatusRow, type: 'flex', align: 'middle', justify: 'center' },
                        React.createElement("div", null,
                            React.createElement(Spin, { tip: '训练中' }))))));
        }
        const paramsData = params ? Object.keys(params).map(p => ({
            name: p, value: params[p],
        })) : [];
        return (React.createElement("div", { className: styles.mdlItem, id: modelId },
            React.createElement(Card, { title: trainStatus === 'SUCCESS' ? (React.createElement("span", null,
                    React.createElement("span", { style: { marginRight: 8 } }, name),
                    React.createElement("span", { style: { marginRight: 8, fontSize: 14, color: 'rgba(16, 38, 58, 0.45)' } }, "\u8BAD\u7EC3\u65F6\u95F4"),
                    React.createElement("span", { style: { fontSize: 14, color: 'rgba(16, 38, 58, 0.45)' } },
                        this.durtion(trainBeginTime, trainEndTime),
                        "s"))) : name, extra: (React.createElement(CardExtra, { modelId: modelId, id: blockId, view: this.view, forecast: this.forecast, openModelDetail: this.openModelDetail })), bordered: false },
                React.createElement(Row, { className: styles.mdlItemRow },
                    React.createElement(Col, { span: 8, className: styles.mdlItemCol },
                        React.createElement("div", { className: styles.mdlItemColName }, "\u53C2\u6570"),
                        paramsData && (React.createElement(List, { dataSource: paramsData, renderItem: d => (React.createElement(List.Item, null,
                                React.createElement(List.Item.Meta, { title: d.name }),
                                d.value)), className: styles.mdlItemColList }))),
                    React.createElement(Col, { span: 8, className: styles.mdlItemCol },
                        React.createElement("div", { className: styles.mdlItemColName }, "featurebl"),
                        React.createElement("div", null, featureImportance && React.createElement(Rect4, { height: 190, data: featureImportance }))),
                    React.createElement(Col, { span: 8, className: styles.mdlItemColEnd },
                        React.createElement("div", { className: styles.mdlItemColName }, "pfzb"),
                        metricList && (React.createElement(List, { dataSource: metricList, renderItem: d => (React.createElement(List.Item, null,
                                React.createElement(List.Item.Meta, { title: this.getname(d.name) }),
                                d.score)), className: styles.mdlItemColList })))))));
    }
}
export default ModelDetail;
//# sourceMappingURL=modelDetail.js.map