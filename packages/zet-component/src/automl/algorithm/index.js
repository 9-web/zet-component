import * as React from 'react';
import { Layout } from 'antd';
import Item from './item';
import List from './list';
import styles from './index.less';
const { Sider, Content } = Layout;
class Algorithm extends React.Component {
    constructor(props) {
        super(props);
        this.handleData = (props) => {
            const { data, value } = props;
            data && data.forEach(fh => {
                fh.checked = value.some(sm => sm.id === fh.id);
            });
            return data;
        };
        this.getSingleValue = (data, value) => {
            const singleValue = (value && value.find(fd => fd.id === data.id)) || { id: data.id, name: data.name, params: {} };
            return singleValue;
        };
        this.onListChange = (data) => {
            // console.log('data', data);
            const { value } = this.state;
            const singleValue = this.getSingleValue(data, value);
            this.setState({
                singleData: data,
                singleValue: singleValue,
            });
        };
        this.onSwitchChange = (checked, data) => {
            // console.log('checkout, data', checked, data)
            const { value } = this.state;
            const { onChange } = this.props;
            let newValue = value;
            data.checked = checked;
            if (checked) {
                newValue.push({ id: data.id, name: data.name, params: {} });
            }
            else {
                newValue = newValue.filter(ft => ft.id !== data.id);
            }
            this.setState({
                isDisable: false,
            }, () => {
                this.setState({
                    singleData: data,
                    singleValue: { id: data.id, name: data.name, params: {} },
                    value: newValue,
                    isDisable: true,
                });
                onChange && onChange(newValue);
            });
        };
        this.onItemChange = (data) => {
            // console.log('onItemChange', data)
            const { value } = this.state;
            const { onChange } = this.props;
            value.forEach(fh => {
                if (data.id === fh.id) {
                    fh.params = data.params;
                }
            });
            onChange && onChange([...value]);
        };
        const defaultSingleData = props.data.length > 0 && props.data[0];
        const defaultSingleValue = this.getSingleValue(defaultSingleData, props.value);
        this.state = {
            singleData: defaultSingleData,
            singleValue: defaultSingleValue,
            value: props.value,
            data: this.handleData(props),
            isDisable: true,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                data: this.handleData(nextProps.data)
            });
        }
    }
    render() {
        const { disabled } = this.props;
        const { singleData, singleValue, isDisable, data, value } = this.state;
        return (React.createElement(Layout, { className: styles.zetAmlAlgorithmLayout },
            React.createElement(Sider, { theme: 'light', width: 240 },
                React.createElement(List, { disabled: disabled, data: data, value: value, onChange: this.onListChange, onSwitchChange: this.onSwitchChange })),
            React.createElement(Content, { className: styles.zetAmlAlgorithmLayoutContent }, isDisable && singleData && React.createElement(Item, { disabled: disabled || !singleData.checked, value: singleValue, data: singleData, onChange: this.onItemChange }))));
    }
}
/** 算法右侧内容 */
Algorithm.Item = Item;
/** 算法左侧列表 */
Algorithm.List = List;
Algorithm.defaultProps = {
    value: [],
    disable: false,
};
export default Algorithm;
//# sourceMappingURL=index.js.map