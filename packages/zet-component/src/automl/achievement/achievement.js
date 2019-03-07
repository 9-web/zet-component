import * as React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { AchieveContext } from './context';
import styles from './index.less';
class Achievement extends React.Component {
    constructor(props) {
        super(props);
        this.unfoldPanel = () => {
            const { unfoldState } = this.state;
            const { onChange } = this.props;
            const currentUnfoldState = unfoldState == 'open' ? 'closed' : 'open';
            this.setState({
                unfoldState: currentUnfoldState
            }, () => {
                onChange('unfold', { ...this.state });
            });
        };
        this.chartHandle = (e, type) => {
            e.stopPropagation();
            if (!type)
                return;
            const { onChange } = this.props;
            this.setState({
                rotateState: type == 'chart' ? 'rotateLeftRight' : 'rotateRightLeft',
                type: type
            }, () => {
                onChange('rotate', { ...this.state });
            });
        };
        this.state = {
            unfoldState: 'open',
            rotateState: '',
            type: 'chart'
        };
    }
    render() {
        const { style, className, headStyle, title, width, height, children, extra, chartIcon, tableIcon } = this.props;
        const styleProps = { width, height, ...style };
        const { unfoldState, rotateState, type } = this.state;
        const cNames = classNames(styles.zetAchievement, className);
        const ChartIcon = chartIcon || React.createElement(Icon, { type: "line-chart" });
        const TableIcon = tableIcon || React.createElement(Icon, { type: "table" });
        return (React.createElement(AchieveContext.Provider, { value: { unfoldState: this.state.unfoldState, extraKeys: this.props.extraKeys } },
            React.createElement("div", { className: `${cNames} ${styles[rotateState]}`, style: styleProps },
                React.createElement("div", { className: styles['zet-achievement-title'], style: headStyle },
                    React.createElement("span", { className: styles['zet-achievement-title-name'] }, title),
                    React.createElement("span", { className: styles['zet-achievement-title-option'], onClick: (e) => { this.chartHandle(e, ''); } },
                        React.createElement("span", { className: `${styles['zet-achievement-title-chart']} ${type == 'chart' && styles['zet-achievement-title-checked']}`, onClick: (e) => { this.chartHandle(e, 'chart'); } }, ChartIcon),
                        React.createElement("span", { className: `${styles['zet-achievement-title-table']} ${type == 'table' && styles['zet-achievement-title-checked']}`, onClick: (e) => { this.chartHandle(e, 'table'); } }, TableIcon)),
                    extra !== false && React.createElement("span", { className: styles['zet-achievement-title-extra'], onClick: this.unfoldPanel },
                        React.createElement("span", null, unfoldState == 'open' ? '收缩' : '展开'))),
                React.createElement("div", { className: styles['zet-achievement-content'] }, React.Children.map(children, (item) => {
                    return item;
                })))));
    }
}
Achievement.defaultProps = {
    extra: true,
    extraKeys: 'all'
};
export default Achievement;
//# sourceMappingURL=achievement.js.map