import * as React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import TextArea from './textarea';
import './index.less';

export interface ZetInputProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 资源组件的宽度 */
  width?: string | number;
  /** 可输入的最大长度 */
  maxLength: string | number;
  value?: string;
  defaultValue?; string;
  /** onChange 事件 */
  onChange: (value: string) => void;
}

export interface ZetInputState {
  /** value 值 */
  value: string;
}

class ZetInput extends React.Component<ZetInputProps, ZetInputState> {
  static TextArea: typeof TextArea;
  constructor(props: ZetInputProps) {
    super(props);
    this.state = {
      value: this.getValue(props.value) || this.getValue(props.defaultValue) || '',
    };
  }

  getValue = (value) => {
    let newValue = '';
    const { maxLength } = this.props;
    // tslint:disable-next-line: prefer-conditional-expression
    if (maxLength > 0 && ((value && value.length) > maxLength)) {
      newValue = value.substring(0, maxLength);
    } else {
      newValue = value;
    }
    return newValue;
  }

  getLabel = () => {
    const { value } = this.state;
    const { maxLength } = this.props;
    const returnValue = maxLength === 0 ? '' : `${(value && value.toString().length) || 0}/${maxLength}`;
    return returnValue;
  }

  onChange = (e) => {
    const { onChange, maxLength } = this.props;
    let value = e.target && e.target.value;
    if (typeof value === 'string') {
      value = value.trim();
    }
    if (maxLength > 0 && (value.length > maxLength)) {
      value = value.substring(0, maxLength);
    }
    this.setState({
      value,
    });
    if (onChange) {
      onChange(value);
    }
  }

  public render() {
    const { maxLength, className, ...otherProps } = this.props;
    const { value } = this.state;
    const rootClass = classNames('zet-input-wrapper', className);
    return (
      <span className={rootClass}>
        <Input
          {...otherProps}
          className='zet-input'
          onChange={this.onChange}
          value={value}
        />
        {(!maxLength || maxLength === 0) ?
          '' :
          <span className='zet-input-wrapper-num'>{`${this.getLabel()}`}</span>}
      </span>
    );
  }
}

export default ZetInput;
