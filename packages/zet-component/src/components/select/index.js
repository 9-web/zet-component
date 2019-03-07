import TreeSelect from './tree-select';
import * as React from "react";
import { Dropdown, Button, Icon, Select as Select_ } from 'antd';
const Option = Select_.Option;
class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.handleVisibleChange = (flag) => {
            this.setState({ visible: flag });
        };
        this.handleChange = (value) => {
            const { onChange } = this.props;
            onChange && onChange(value);
        };
    }
    render() {
        const { visible } = this.state;
        const { data } = this.props;
        const children = [];
        for (let i of data) {
            children.push(React.createElement(Option, { key: i }, i));
        }
        return (React.createElement(Dropdown, { overlay: React.createElement("div", { style: { width: 300 } },
                React.createElement(Select_, { mode: "tags", style: { width: '100%' }, onChange: this.handleChange, defaultOpen: true, open: visible }, children)), visible: visible, trigger: ['click'], placement: 'bottomCenter', onVisibleChange: this.handleVisibleChange },
            React.createElement(Button, null,
                React.createElement(Icon, { type: 'filter' }))));
    }
}
Select.defaultProps = {
    data: [],
};
Select.TreeSelect = TreeSelect;
export default Select;
//# sourceMappingURL=index.js.map