import * as React from 'react';
import { Icon, Tooltip } from 'antd';
import moment from 'moment';
import { LineChart } from '../../components/Charts';
import Timer from '../../components/Timer';
import styles from './index.less';
class ModelItem extends React.Component {
    constructor(props) {
        super(props);
        this.timeStatus = () => {
            const { data } = this.props;
            if (data.startTime && data.endTime) {
                return '';
            }
            if (data.status === 5) {
                return 'start';
            }
            return 'stop';
        };
        this.iconStatus = (status) => {
            switch (status) {
                // case 0: return intl.get('project.job.block.Queued');
                // case 1: return intl.get('project.job.block.Sent');
                // case 2: return intl.get('project.job.block.Received');
                // case 3: return intl.get('project.job.block.ImgPulling');
                // case 4: return intl.get('project.job.block.ImgPulled');
                case 5:
                    return React.createElement("span", { className: styles.status },
                        React.createElement(Icon, { type: "loading", theme: "outlined", style: {
                                color: '#dark-blue-grey-65',
                                marginRight: 5
                            } }),
                        "\u8FD0\u884C\u4E2D");
                // case 6: return intl.get('project.job.block.Cancel');
                case 7:
                    return React.createElement("span", { className: styles.status },
                        React.createElement(Icon, { type: "close-circle-o", style: {
                                color: 'rgba(245, 34, 45, 0.85)',
                                marginRight: 5
                            } }),
                        "\u5F02\u5E38");
                case 8:
                    return React.createElement("span", { className: styles.status },
                        React.createElement(Icon, { type: "check-circle-o", style: {
                                color: '#13c2c2',
                                marginRight: 5
                            } }),
                        "\u5B8C\u6210");
                // case 9: return intl.get('project.job.block.Canceling');
                // case 10: return intl.get('project.job.block.Canceled');
                // case 11: return intl.get('project.job.block.Hold');
                // case 12: return intl.get('project.job.block.Stopping');
                // case 13: return intl.get('project.job.block.Stopped');
                // case 14: return intl.get('project.job.block.Terminating');
                // case 15: return intl.get('project.job.block.Terminated');
                // case 16: return intl.get('project.job.block.Paused');
                default:
                    return '';
            }
        };
        this.onSeeLogClick = (dataId) => {
            // this.props.onSeeLogClick(dataId)
        };
        this.formatCpu = () => {
            const { data } = this.props;
            const cpus = data.metricData.cpu;
            if (data.status === 5) {
                return cpus.length > 0 ? (cpus[cpus.length - 1].y * data.resource.cpus).toFixed(2) : 0;
            }
            return data.resource.cpus;
        };
        this.formatMem = () => {
            const { data } = this.props;
            const mem = data.metricData.mem;
            if (data.status === 5) {
                return mem.length > 0 ? ((mem[mem.length - 1].y * data.resource.mem) / 1024).toFixed(3) : 0;
            }
            if (data.resource.mem) {
                return (data.resource.mem / 1024).toFixed(3);
            }
            return 0;
        };
        this.formatMGpu = () => {
            const { data } = this.props;
            const gpu = data.metricData.gpu;
            if (data.status === 5) {
                return gpu.length > 0 ? (gpu[gpu.length - 1].y * data.resource.gpus).toFixed(2) : 0;
            }
            return data.resource.gpus;
        };
        this.state = {};
    }
    render() {
        const { data } = this.props;
        const cpu = data.metricData.cpu;
        const mem = data.metricData.mem;
        const gpu = data.metricData.gpu;
        return (React.createElement("div", null,
            React.createElement("div", { className: styles.item, id: data.moduleId },
                React.createElement("div", { className: styles.itemInfo },
                    React.createElement("h3", { className: styles.itemTitle },
                        React.createElement("span", { className: styles.shortName, style: { fontSize: 16, color: 'rgba(16, 38, 58, 0.85)' } }, data.alias),
                        this.iconStatus(data.status),
                        React.createElement(Tooltip, { title: '\u67E5\u770B\u65E5\u5FD7' },
                            React.createElement("span", { onClick: () => { this.onSeeLogClick(data.id); } }))),
                    React.createElement("div", { style: { color: 'rgba(16, 38, 58, 0.45)', fontSize: 12 } }, data.mouduleDescription)),
                React.createElement("div", { className: styles.chartItem },
                    React.createElement("div", null,
                        this.formatCpu(),
                        " CPU(Cores)"),
                    data.metricData && data.metricData.cpu.length > 0 && (React.createElement(LineChart, { data: cpu, chart: {
                            height: 40,
                            padding: [2, 0],
                        }, geomLine: {
                            type: 'area',
                            opacity: 1,
                            color: ['#1c7aee'],
                            tooltip: ['x*y', (x, y) => {
                                    return {
                                        title: moment(x).format('YYYY-MM-DD HH:mm:ss'),
                                        value: y,
                                    };
                                }],
                        }, geomPoint: {
                            size: 0,
                        }, showxy: false }))),
                React.createElement("div", { className: styles.chartItem },
                    React.createElement("div", null,
                        this.formatMem(),
                        " MEM(GB)"),
                    data.metricData && data.metricData.mem.length > 0 && (React.createElement(LineChart, { data: mem, chart: {
                            height: 40,
                            padding: [2, 0],
                        }, tooltip: {
                        // triggerOn: 'none',
                        }, geomLine: {
                            type: 'area',
                            opacity: 1,
                            color: ['#ffc53d'],
                            tooltip: ['x*y', (x, y) => {
                                    return {
                                        title: moment(x).format('YYYY-MM-DD HH:mm:ss'),
                                        value: y,
                                    };
                                }],
                        }, geomPoint: {
                            size: 0,
                        }, showxy: false }))),
                React.createElement("div", { className: styles.chartItem },
                    React.createElement("div", null,
                        this.formatMGpu(),
                        " GPU(S)"),
                    data.metricData && data.metricData.gpu.length > 0 && (React.createElement(LineChart, { data: gpu, chart: {
                            height: 40,
                            padding: [2, 0],
                        }, tooltip: {
                        // triggerOn: 'none',
                        }, geomLine: {
                            type: 'area',
                            opacity: 1,
                            color: ['#13c2c2'],
                            tooltip: ['x*y', (x, y) => {
                                    return {
                                        title: moment(x).format('YYYY-MM-DD HH:mm:ss'),
                                        value: y,
                                    };
                                }],
                        }, geomPoint: {
                            size: 0,
                        }, showxy: false }))),
                React.createElement("div", null, data.status !== 0 ? (React.createElement(Timer, { start: data.startTime, end: data.endTime, status: this.timeStatus(), data: this.props.data })) : (React.createElement("div", { className: styles.timer },
                    React.createElement("div", { className: styles.timerTit }, "\u8017\u65F6"),
                    React.createElement("div", { className: styles.userTimer }, "- - : - - : - -")))))));
    }
}
export default ModelItem;
//# sourceMappingURL=modelItem.js.map