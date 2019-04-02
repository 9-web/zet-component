import * as React from 'react';
import {Input, message, Tag} from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export interface TagInputProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 宽度 */
  width?: string | number,
  /** 标签个数 */
  maxLength?: number,
  /** 占位符 */
  placeholder?: string,
  /** Tag Input value 值 */
  value?: Set<number | string>,
  /** 支持输入的类型 */
  type?: 'number' | 'string',
  /** 是否禁用 */
  disabled?: boolean,
  /** onChange 事件 */
  onChange?: (values: Array<number | string>) => void,
  /** onBluer 事件 */
  onBlur?: () => void,
  /** 添加的元素数组 */
  addData?: Array<number | string>,
  /** 删除的元素数组 */
  delData?: Array<number | string>,
  /** 输入 nChange 事件 */
  onInput?: (values: Array<number | string>) => void,
  /** 是否回车生成元素 */
  allowEnter?: boolean,
}

class TagInput extends React.Component<TagInputProps, any> {
  public input: React.RefObject<any>;

  constructor(props: TagInputProps) {
    super(props);
    this.input = React.createRef();
    this.state = {
      value: (props.value && new Set(props.value)) || new Set(),
      inputValue: undefined,
      focus: false,
      allowEnter: true,
    }
  }

  static defaultProps = {
    type: 'number',
    width: '100%',
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = new Set(nextProps.value) || new Set();
      this.setState({ value });
    }
  }

  onContainerClick = () => {
    this.input.current.focus();
  }

  onInputChange = (e) => {
    const { type, onInput } = this.props;
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

    onInput && onInput(value);
  }

  onPressEnter = (e) => {
    const { type, maxLength, allowEnter } = this.props;
    const { value } = this.state;
    const { value: inputValue } = e.target;
    if (value.size >= maxLength) {
      return message.warning(`最多可添加${maxLength}个标签`);
    }
    if (allowEnter && inputValue.length !== 0) {
      this.setState(prevState => {
        const { value } = prevState;
        const currValue = type === 'number' ? parseFloat(inputValue) : inputValue;
        value.add(currValue);
        this.triggerChange([...value]);
        return { value, inputValue: undefined };
      });
    }
  }

  onInputBlur = (e) => {
    const { onBlur, maxLength } = this.props;
    const { value } = this.state;
    if (e.target.value && value >= maxLength) {
      this.onPressEnter(e);
    }
    if (onBlur) {
      this.setState({ focus: false });
      onBlur();
    }
  }

  onInputFocus = () => {
    this.setState({ focus: true });
  }

  removeTag = (v, e) => {
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
  }

  triggerChange = (values: Array<any>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(values);
    }
  }

  renderValue = () => {
    const { value } = this.state;
    const { addData, delData } = this.props;
    addData && addData.length > 0 && addData.forEach(v => {
      value.add(v);
    });
    delData && delData.length > 0 && delData.forEach(v => {
      value.delete(v);
    });
    const renderValue = [];
    value.forEach(v => {
      renderValue.push(
        <li key={v}>
          <Tag
            closable
            onClose={(e) => this.removeTag(v, e)}
            key={v}
            color="#f5f5f5"
            className={styles.zetTagInputTag}
          >
            {v}
          </Tag>
        </li>
      );
    });
    return renderValue;
  }

  onKeyDown = (e) => {
    const { inputValue } = this.state;
    let keynum = window.event ? e.keyCode : e.which;
    if (keynum === 8 && !inputValue) {
      this.setState(prevState => {
        const { value } = prevState;
        let lastValue = Array.from(value).pop();
        value.delete(lastValue);
        this.triggerChange([...value]);
        return { value }
      });
    }
  }

  public render() {
    const { className, style, disabled, width, placeholder } = this.props;
    const { inputValue, value } = this.state;
    const classNames = classnames(styles.zetTagInput, className, {
      [styles.zetTagInputFocus]: focus,
      [styles.zetTagInputDisabled]: disabled,
    });
    const styleProps = {
      width,
      ...style,
    }
    return (
      <div style={styleProps} className={classNames} onClick={this.onContainerClick}>
        <ul>
            {this.renderValue()}
            <li key='input'>
              <Input
                className='ant-select-search__field'
                onChange={this.onInputChange}
                onBlur={this.onInputBlur}
                value={inputValue}
                onPressEnter={this.onPressEnter}
                ref={this.input}
                onFocus={this.onInputFocus}
                disabled={disabled}
                onKeyDown={this.onKeyDown}
                placeholder={value.size === 0 ? placeholder : ''}
              />
            </li>
        </ul>
      </div>
    );
  }
}

export default TagInput;
