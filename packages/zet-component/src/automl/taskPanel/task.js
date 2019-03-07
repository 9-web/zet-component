import * as React from 'react';
import { Card, Tooltip, Icon, Menu, Anchor, Modal } from 'antd';
import classNames from 'classnames';
import ContrastButton from './contrastButton';
import ZetIcon from '../../components/ZetIcon';
import styles from './index.less';
const MenuItem = Menu.Item;
const { Link } = Anchor;
class Task extends React.Component {
    constructor(props) {
        super(props);
        this.changeJob = (v) => {
            this.props.selectedRow(v);
        };
        this.delJob = (v) => {
            const propsDelJob = this.props.delJob;
            Modal.confirm({
                title: '确定要删除吗？',
                okText: 'OK',
                cancelText: 'Cancel',
                onOk: () => {
                    propsDelJob(v);
                },
            });
        };
        this.title = (v) => {
            this.props.clickTitle(v.jobId, v.workflowVersionId);
        };
        this.changeJobItem = (item) => {
            this.props.setSelectedModelKeys([item.modelId]);
        };
        this.openModelDetail = (e, modelId, jobId, modelName) => {
            e.stopPropagation();
            this.props.openModelDetail(modelId, jobId, modelName);
        };
        this.showContras = (item, jobId, jobName) => {
            const { innerContras } = this.props;
            innerContras && this.setState({
                contrastJobId: jobId
            });
            this.props.showContras(item, jobName);
        };
        this.state = {
            contrastJobId: ''
        };
    }
    render() {
        let { title, jobInfo, modelList, selectedTaskId, contrastIds, selectedModelKeys, anchorContainerId } = this.props;
        title = title || jobInfo.jobName || '';
        modelList = modelList || jobInfo.modelList;
        contrastIds = contrastIds || [];
        const { contrastJobId } = this.state;
        const taskClass = classNames(styles.zetTask, { [styles.selectedTitle]: selectedTaskId === jobInfo.jobId });
        const getContainer = anchorContainerId ? { getContainer: () => document.getElementById(anchorContainerId) } : {};
        return (React.createElement(Card, { title: (React.createElement("div", { className: styles.cardTitle, onClick: () => { this.changeJob(jobInfo); } },
                React.createElement("span", { className: styles.taskListTitle },
                    React.createElement("span", { className: styles.taskListName, title: title },
                        React.createElement("a", { onClick: () => { this.title(jobInfo); } }, title)),
                    React.createElement("span", { className: styles.cardTitleOptions },
                        jobInfo.jobStatus === 'RUNNING' && React.createElement(Icon, { type: "loading", theme: "outlined" }),
                        React.createElement(Tooltip, { title: '删除' },
                            React.createElement(Icon, { style: { marginLeft: 35 }, type: "delete", theme: "outlined", onClick: (e) => { e.stopPropagation(); this.delJob(jobInfo.jobId); } })))))), style: { width: 324 }, key: jobInfo.jobId, className: taskClass },
            React.createElement(Anchor, Object.assign({ affix: false, bounds: 0, className: styles.taskAnchor }, getContainer),
                React.createElement(Menu, { style: { border: 'none' }, selectedKeys: selectedModelKeys }, modelList && modelList.map((item, i) => {
                    return (React.createElement(MenuItem, { key: item.modelId, style: { padding: '0 14px' }, onClick: () => { this.changeJob(jobInfo); this.changeJobItem(item); } },
                        React.createElement(Link, { href: `#${item.modelId}`, title: (React.createElement("div", { className: `${styles.linkWrap} ${(jobInfo.jobStatus === 'FAIL' && (item.modelTrainStatus !== 'SUCCESS')) ? styles.linkWraperr : ''}` },
                                React.createElement("div", { title: item.modelName, onClick: (e) => { this.openModelDetail(e, item.modelId, jobInfo.jobId, item.modelName); }, className: styles.shortName }, item.modelName),
                                React.createElement("div", { style: { width: '110px' } },
                                    React.createElement("span", { style: { display: 'inline-block', width: '25px' } },
                                        item.jobBlockStatus === 5 && React.createElement(Icon, { type: "loading", theme: "outlined" }),
                                        i === 0 && item.score && React.createElement(ZetIcon, { type: 'zeticon-trophy', style: { fontSize: 16, color: 'rgb(25, 118, 210)' } })),
                                    React.createElement("span", null, item.score ? item.score : '--')),
                                React.createElement("div", { style: { width: '80px', textAlign: 'right' } },
                                    React.createElement(ContrastButton, { style: { marginLeft: '0px' }, contrastIds: contrastIds, item: item, jobName: jobInfo.jobName, jobId: jobInfo.jobId, contrastJobId: contrastJobId, showContras: this.showContras })))) })));
                })))));
    }
}
export default Task;
//# sourceMappingURL=task.js.map