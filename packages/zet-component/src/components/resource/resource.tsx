import * as React from 'react';
import { ResourceContext } from './resourceContext';
import { InputNumber, Slider, Row, Col} from 'antd';
import classnames from 'classnames';
import ResourceGroup from './resourceGroup';
import { isNumber } from '../../utils/utils';

export interface ResourceProps {
    /** 组件行行内样式 */
    style?: React.CSSProperties;
    /** 自定义类名 */
    className?: string;
    /** 资源组件的宽度 */
    width?: string | number;
    /** 是否禁用 */
    disabled?: boolean;
    /** 资源项标题 */
    title?: string;
    /** 初始化资源值 */
    defaultValue?: number;
    /** 资源值 */
    value?: number;
    /** 步长，取值必须大于 0，并且可被 (max - min) 整除 */
    step?: number;
    /** 最大值 */
    max?: number;
    /** 最小值 */
    min?: number;
    /** 资源改变触发的回调 */
    onChange?: (e: React.MouseEvent<any>) => void;
    /** 滑动输入条的属性 */
    sliderProps?: any;
    /** 数字输入框的属性 */
    inputNumberProps?: any;
}

class Resource extends React.Component<ResourceProps, any> {
  static ResourceGroup: typeof ResourceGroup;
  static defaultProps = {
    width: '255px',
    step: 1,
    max: 100,
    min: 0,
    disabled: false,
    sliderProps: {},
    inputNumberProps: {},
    onChange: () => {},
  };

  constructor(props: ResourceProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || 0,
    };
  }

  onChange = (value) => {
    const { onChange } = this.props;
    if (!isNumber(value)) {
      return;
    }
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
    };
    const classNames = classnames('zet-resource', className);

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
                  <Row>
                    <Col span={12}>{title}</Col>
                    <Col
                      span={12}
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
                          width: 60,
                        }}
                        {...inputNumberProps}
                      />
                    </Col>
                  </Row>
                  <Slider
                    className='zet-resource-slider'
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
              );
            }
          }
        </ResourceContext.Consumer>
      </div>
    );
  }
}

export default Resource;
