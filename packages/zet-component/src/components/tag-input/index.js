import * as React from 'react';
import { Input, Tag } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
class TagInput extends React.Component {
    constructor(props) {
        super(props);
        this.onContainerClick = () => {
            this.input.current.focus();
        };
        this.onInputChange = (e) => {
            const { type } = this.props;
            const { value } = e.target;
            const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
            if (type === 'number') {
                if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                    this.setState({ inputValue: value });
                }
            }
            if (type === 'string') {
                this.setState({ inputValue: value });
            }
        };
        this.onPressEnter = (e) => {
            const { type } = this.props;
            const { value: inputValue } = e.target;
            if (inputValue.length !== 0) {
                this.setState(prevState => {
                    const { value } = prevState;
                    const currValue = type === 'number' ? parseFloat(inputValue) : inputValue;
                    value.add(currValue);
                    this.triggerChange([...value]);
                    return { value, inputValue: undefined };
                });
            }
        };
        this.onInputBlur = (e) => {
            const { onBlur } = this.props;
            if (e.target.value) {
                this.onPressEnter(e);
            }
            if (onBlur) {
                this.setState({ focus: false });
                onBlur();
            }
        };
        this.onInputFocus = () => {
            this.setState({ focus: true });
        };
        this.removeTag = (v, e) => {
            e.preventDefault();
            const { disabled } = this.props;
            if (!disabled) {
                this.setState(prevState => {
                    const { value } = prevState;
                    value.delete(v);
                    this.triggerChange([...value]);
                    return { value };
                });
            }
        };
        this.triggerChange = (changedValue) => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(changedValue);
            }
        };
        this.renderValue = () => {
            const { value } = this.state;
            const renderValue = [];
            value.forEach(v => {
                renderValue.push(React.createElement("li", { key: v },
                    React.createElement(Tag, { closable: true, onClose: (e) => this.removeTag(v, e), key: v, color: "#f5f5f5", className: styles.zetTagInputTag }, v)));
            });
            return renderValue;
        };
        this.input = React.createRef();
        this.state = {
            value: (props.value && new Set(props.value)) || new Set(),
            inputValue: undefined,
            focus: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = new Set(nextProps.value) || new Set();
            this.setState({ value });
        }
    }
    render() {
        const { className, style, disabled, width } = this.props;
        const { inputValue } = this.state;
        const classNames = classnames(styles.zetTagInput, className, {
            [styles.zetTagInputFocus]: focus,
            [styles.zetTagInputDisabled]: disabled,
        });
        const styleProps = {
            width,
            ...style,
        };
        return (React.createElement("div", { style: styleProps, className: classNames, onClick: this.onContainerClick },
            React.createElement("ul", null,
                this.renderValue(),
                React.createElement("li", { key: 'input' },
                    React.createElement(Input, { className: 'ant-select-search__field', onChange: this.onInputChange, onBlur: this.onInputBlur, value: inputValue, maxLength: 25, onPressEnter: this.onPressEnter, ref: this.input, onFocus: this.onInputFocus, disabled: disabled })))));
    }
}
TagInput.defaultProps = {
    type: 'number',
    width: '100%',
};
export default TagInput;
//# sourceMappingURL=index.js.map