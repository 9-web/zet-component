import * as React from 'react';
import { Input, Tag } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export interface TagInputProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 宽度 */
  width?: string | number,
  /** Tag Input value 值 */
  value?: Set<number | string>,
  /** 支持输入的类型 */
  type?: 'number' | 'string',
  /** 是否禁用 */
  disabled?: boolean,
  /** onChange 事件 */
  onChange?: (value: Array<number | string>) => void,
  /** onBluer 事件 */
  onBlur?: () => void,
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
    }
  }

  static defaultProps = {
    value: new Set(),
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
  }

  onPressEnter = (e) => {
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
  }

  onInputBlur = (e) => {
    const { onBlur } = this.props;
    if (e.target.value) {
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

  triggerChange = (changedValue: Array<any>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  renderValue = () => {
    const {value} = this.state;
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

  public render() {
    const { className, style, disabled, width } = this.props;
    const { inputValue } = this.state;
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
                maxLength={25}
                onPressEnter={this.onPressEnter}
                ref={this.input}
                onFocus={this.onInputFocus}
                disabled={disabled}
              />
            </li>
        </ul>
      </div>
    );
  }
}

export default TagInput;
