import * as React from "react";
import { TreeSelect as TreeSelect_ } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
class TreeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
        };
        this.onChange = (value) => {
            this.setState({ value });
        };
    }
    render() {
        const { style, className, treeData, showSearch, allowClear, treeDefaultExpandAll, treeNodeFilterProp, treeSelectProps } = this.props;
        const classNames = classnames(styles.zetSelect, className);
        const defuleStyle = {
            width: 300,
            ...style,
        };
        return (React.createElement(TreeSelect_, Object.assign({ style: defuleStyle, className: classNames, value: this.state.value, onChange: this.onChange, treeData: treeData, showSearch: showSearch, allowClear: allowClear, treeNodeFilterProp: treeNodeFilterProp, treeDefaultExpandAll: treeDefaultExpandAll }, treeSelectProps)));
    }
}
TreeSelect.defaultProps = {
    showSearch: true,
    allowClear: true,
    treeDefaultExpandAll: true,
    treeNodeFilterProp: 'title',
};
export default TreeSelect;
//# sourceMappingURL=tree-select.js.map