import * as React from 'react';
import classnames from 'classnames';
import { Layout, Menu } from 'antd';
import styles from './index.less';
const { Header, Content, Sider } = Layout;
const { ItemGroup: MenuItemGroup, Item: MenuItem } = Menu;
export default class Design extends React.Component {
    constructor(props) {
        super(props);
        this.getInitSelectData = (leftData) => {
            return (Array.isArray(leftData)
                && leftData.length > 0
                && leftData[0].children
                && leftData[0].children.length > 0
                && leftData[0].children[0]) || {};
        };
        this.onMenuClick = (data) => {
            const { onSelect } = this.props;
            this.setState({
                selectedKeys: [data.key],
                selectedData: data,
            });
            onSelect && onSelect(data);
        };
        /**
         * 左侧面板内容
         */
        this.getLeftContent = () => {
            const { leftData, leftRender, leftMenuProps } = this.props;
            const { selectedKeys } = this.state;
            if (leftData) {
                return React.createElement(Menu, Object.assign({ style: { border: 'none' }, selectedKeys: selectedKeys }, leftMenuProps), Array.isArray(leftData) && leftData.map(item => (React.createElement(MenuItemGroup, { key: item.key, title: item.value }, Array.isArray(item.children) && item.children.map(child => (React.createElement(MenuItem, { onClick: () => this.onMenuClick(child), key: child.key }, child.value)))))));
            }
            return leftRender;
        };
        const initSelectData = this.getInitSelectData(props.leftData);
        this.state = {
            selectedKeys: [initSelectData.key],
            selectedData: initSelectData,
        };
    }
    render() {
        const { style, className, leftSiderProps, children, } = this.props;
        const { selectedData } = this.state;
        const classNames = classnames(styles.zetAmlDesign, className);
        return (React.createElement(Layout, { className: classNames, style: style },
            React.createElement(Sider, Object.assign({ className: styles.zetAmlDesignSider, width: 240, theme: 'light' }, leftSiderProps), this.getLeftContent()),
            React.createElement(Layout, null,
                React.createElement(Header, { className: styles.zetAmlDesignHeader }, selectedData.value),
                React.createElement(Content, { className: styles.zetAmlDesignContent }, children))));
    }
}
//# sourceMappingURL=index.js.map