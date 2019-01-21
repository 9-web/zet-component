import React, { Component } from 'react';
import { ResourceContext } from './resourceContext';
import { InputNumber, Slider, Row, Col} from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';

class Resource extends Component {
  static defaultProps = {
    width: '255px',
    onChange: () => {},
    step: 1,
    max: 100,
    min: 0,
    disabled: false,
    sliderProps: {},
    inputNumberProps: {},
  }

  constructor(props) {
    super();
    this.state = {
      value: props.value || props.defaultValue || 0,
    };
  }

  onChange = (value) => {
    const { onChange } = this.props;
    this.setState({
      value,
    }, () => {
      onChange(value);
    });
  }


  render() {
    const { style, className, title, width, step, max, min, disabled, sliderProps, inputNumberProps  } = this.props;
    const { value } = this.state;
    const styleProps = {
      width,
      ...style,
    }
    const classNames = classnames(styles.zetResource, className);

    return (
      <div style={styleProps} className={classNames}>
        <ResourceContext.Consumer>
          {
            ({ resourceGroup }) => {
              if (resourceGroup) {
                inputNumberProps.disabled = sliderProps.disabled = disabled || resourceGroup.disabled;
              }
              return (
                <React.Fragment>
                  <Row span={12}>
                    <Col span={12}>{title}</Col>
                    <Col span={12}
                      style={{
                        textAlign: 'right',
                        paddingRight: 3,
                        // marginRight: 5,
                      }}
                    >
                      <InputNumber
                        size='small'
                        onChange={this.onChange}
                        value={value}
                        step={step}
                        max={max}
                        min={min}
                        disabled={disabled}
                        style={{
                          width: 60
                        }}
                        {...inputNumberProps}
                      />
                    </Col>
                  </Row>
                  <Slider
                    className={styles.zetResource}
                    onChange={this.onChange}
                    value={value}
                    step={step}
                    max={max}
                    min={min}
                    disabled={disabled}
                    marks={{ [min]: min.toString(), [max]: max.toString() }}
                    {...sliderProps}
                  />
                </React.Fragment>
              )
            }
          }
        </ResourceContext.Consumer>
      </div>
    )
  }
}

Resource.propTypes = {
  /** 组件行行内样式 */
  style: PropTypes.object,
  /** 自定义类名 */
  className: PropTypes.string,
  /** 资源组件的宽度 */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 资源项标题 */
  title: PropTypes.string,
  /** 初始化资源值 */
  defaultValue: PropTypes.number,
  /** 资源值 */
  value: PropTypes.number,
  /** 步长，取值必须大于 0，并且可被 (max - min) 整除 */
  step: PropTypes.number,
  /** 最大值 */
  max: PropTypes.number,
  /** 最小值 */
  min: PropTypes.number,
  /** 资源改变触发的回调 */
  onChange: PropTypes.func,
  /** 滑动输入条的属性 */
  sliderProps: PropTypes.object,
   /** 数字输入框的属性 */
  inputNumberProps:  PropTypes.object,

}

export default Resource;

