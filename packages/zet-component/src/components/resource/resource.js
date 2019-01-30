import * as React from 'react';
import { ResourceContext } from './resourceContext';
import { InputNumber, Slider, Row, Col } from 'antd';
import classnames from 'classnames';
import { isNumber } from '../../utils/utils';
import styles from './index.less';
class Resource extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (value) => {
            const { onChange } = this.props;
            if (!isNumber(value)) {
                return;
            }
            this.setState({
                value,
            }, () => {
                onChange(value);
            });
        };
        this.state = {
            value: props.value || props.defaultValue || 0,
        };
    }
    render() {
        const { style, className, title, width, step, max, min, disabled, sliderProps, inputNumberProps } = this.props;
        const { value } = this.state;
        const styleProps = {
            width,
            ...style,
        };
        const classNames = classnames(styles.zetResource, className);
        return (React.createElement("div", { style: styleProps, className: classNames },
            React.createElement(ResourceContext.Consumer, null, ({ resourceGroup }) => {
                if (resourceGroup) {
                    inputNumberProps.disabled = sliderProps.disabled = disabled || resourceGroup.disabled;
                }
                return (React.createElement(React.Fragment, null,
                    React.createElement(Row, null,
                        React.createElement(Col, { span: 12 }, title),
                        React.createElement(Col, { span: 12, style: {
                                textAlign: 'right',
                                paddingRight: 3,
                            } },
                            React.createElement(InputNumber, Object.assign({ size: 'small', onChange: this.onChange, value: value, step: step, max: max, min: min, disabled: disabled, style: {
                                    width: 60
                                } }, inputNumberProps)))),
                    React.createElement(Slider, Object.assign({ className: styles.zetResourceSlider, onChange: this.onChange, value: value, step: step, max: max, min: min, disabled: disabled, marks: { [min]: min.toString(), [max]: max.toString() } }, sliderProps))));
            })));
    }
}
Resource.defaultProps = {
    width: '255px',
    onChange: () => { },
    step: 1,
    max: 100,
    min: 0,
    disabled: false,
    sliderProps: {},
    inputNumberProps: {},
};
export default Resource;
//# sourceMappingURL=resource.js.map