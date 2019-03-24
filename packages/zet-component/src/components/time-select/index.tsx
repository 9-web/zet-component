import * as React from 'react';
import classnames from 'classnames';
import { Row, Col, Select } from 'antd';
import styles from './index.less';

const Option = Select.Option;

const data = {
  seconds: {
    key: 'seconds',
    selectData: [1, 5, 10, 20, 30],
    displayUnit: '秒',
  },
  minutes: {
    key: 'minutes',
    selectData: [1, 5, 10, 20, 30],
    displayUnit: '分钟',
  },
  hours: {
    key: 'hours',
    selectData: [1, 2, 4, 8, 12],
    displayUnit: '小时',
  },
};

const calculateUnit = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
}

const unitKey = {
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
};

export interface Item {
  /** key */
  key: string,
  /** 时间下拉框数据 */
  selectData: Array<number>,
  /** 时间单位 */
  displayUnit: string,
}

export interface TimeSelectProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 宽度 */
  width?: string | number,
  /** 组件选择数据 */
  data?: object,
  /** value 值为秒数 */
  value?: number,
   /** 是否禁用 */
   disabled?: boolean,
   /** onChange 事件 */
   onChange?: (value: number) => void,
  /** test function */
   test: (value: number) => void,
}

export interface TimeSelectState {
  timeSelectData: Array<number>,
  unitSelectData: Array<Item>,
  value: number,
  unitValue: string,
  timeValue: number,
}

class TimeSelect extends React.Component<TimeSelectProps, TimeSelectState> {
  static defaultProps = {
    data: data,
  }

  static getUnitValue = (seconds: number) => {
    if (seconds < 60) {
      return 'seconds';
    }
    if (seconds < 60 * 60) {
      return 'minutes';
    }

    if (seconds < 60 * 60 * 60) {
      return 'hours';
    }
    return '';
  }

  static getTimeValue = (seconds: number) => {
    if (seconds < 60) {
      return seconds;
    }
    if (seconds < 60 * 60) {
      return seconds / 60;
    }

    if (seconds < 60 * 60 * 60) {
      return seconds / 60 / 60;
    }
  }

  constructor(props: TimeSelectProps) {
    super(props);
    const unitSelectData = Object.values(props.data) as Array<Item>;
    const firstData = unitSelectData.length > 0 ? unitSelectData[0]: null;
    this.state = {
      unitSelectData,
      timeSelectData: firstData.selectData || [],
      value: props.value || 1,
      unitValue: TimeSelect.getUnitValue(props.value || 1),
      timeValue: TimeSelect.getTimeValue(props.value || 1),
    }
  }

  setValue = (value: number) => {
    const {onChange} = this.props;
    this.setState({
      value,
    });
    onChange && onChange(value);
  }

  onUnitChange = (unit: string) => {
    const {data} = this.props;
    const currData = data[unit];
    const timeValue =  (Array.isArray(currData.selectData) && currData.selectData.length > 0 && currData.selectData[0]) || 1;
    const value = timeValue * calculateUnit[unit];
    this.setState({
      unitValue: unit,
      timeValue,
      timeSelectData: currData.selectData,
    });
    this.setValue(value);
  }

  onTimeChange = (timeValue: number) => {
    const value = timeValue * calculateUnit[this.state.unitValue];
    this.setState({
      timeValue,
    })
    this.setValue(value);
  }

  public render() {
    const { width, style, className, disabled } = this.props;
    const { unitSelectData, timeSelectData, unitValue, timeValue } = this.state;
    const classNames = classnames(styles.zetTimeSelect, className);
    const styleProps = {
      width,
      ...style,
    }
    return (
      <div style={styleProps} className={classNames}>
        <Row gutter={10}>
          <Col span={12}>
            <Select disabled={disabled} style={{ width: '100%'}} value={timeValue} onChange={this.onTimeChange}>
              {
                timeSelectData.map(item => {
                  return <Option value={item} key={`${item}`}>{item}</Option>
                })
              }
            </Select>
          </Col>
          <Col span={12}>
            <Select disabled={disabled} style={{ width: '100%'}} value={unitValue} onChange={this.onUnitChange}>
              {
                unitSelectData.map(item => {
                  return <Option value={item.key} key={item.key}>{item.displayUnit}</Option>
                })
              }
            </Select>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TimeSelect;
