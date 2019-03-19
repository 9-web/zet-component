import React from 'react';
import { Input, Tag } from 'antd';
import styles from './index.less';

class TagsInput extends React.Component {
  constructor(props) {
    super(props);

    const valuelist = new Set(props.value) || new Set();
    this.input = React.createRef();
    this.state = {
      valuelist,
      focus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const valuelist = new Set(nextProps.value) || new Set();
      this.setState({ valuelist });
    }
  }

  onInputChange = (e) => {
    const { onInput } = this.props;
    const {value} = e.target;
    // const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value)) || value === '' || value === '-') {
      onInput && onInput(value);
    }
  }

  // onPressEnter = (e) => {
  //   const { value } = e.target;
  //   if (value.length !== 0) {
  //     // console.log('value', value);
  //     this.setState(prevState => {
  //       const { valuelist } = prevState;
  //       valuelist.add(value);
  //       this.triggerChange([...valuelist]);
  //       return { valuelist, inputvalue: undefined };
  //     });
  //   }
  // }

  onInputBlur = (e) => {
    const { onBlur } = this.props;
    // if (e.target.value) {
    //   this.onPressEnter(e);
    // }
    if (onBlur) {
      this.setState({ focus: false });
      onBlur();
    }
  }

  onKeyDown = (e) => {
    const { inputValue } = this.props;
    const { valuelist } = this.state;
    let keynum = window.event ? e.keyCode : e.which;
    const size = valuelist.size;
    if (keynum === 8 && !inputValue && size > 0) {
      let lastValue = Array.from(valuelist).pop();
      valuelist.delete(lastValue);
      this.triggerChange(lastValue);
    }
  }

  removeTag = (v, e) => {
    e.preventDefault();
    const { disabled } = this.props;
    if (!disabled) {
      this.setState(prevState => {
        const { valuelist } = prevState;
        valuelist.delete(v);
        this.triggerChange(v);
        return { valuelist };
      });
    }
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onDivClick = () => {
    this.input.current.focus();
  }

  onInputFocus = () => {
    this.setState({ focus: true });
  }

  render() {
    const { valuelist, focus } = this.state;
    const { disabled, addData, delData, inputValue, placeholder, maxLength } = this.props;
    addData.length > 0 && addData.forEach(v => {
      valuelist.add(v);
    });
    delData.length > 0 && delData.forEach(v => {
      valuelist.delete(v);
    });
    const rendervalue = [];
    valuelist.forEach(v => {
      rendervalue.push(
        <li key={v}>
          <Tag
            closable
            onClose={(e) => this.removeTag(v, e)}
            key={v}
            color="#f5f5f5"
            className={styles.tagsinputtag}
          >
            {v}
          </Tag>
        </li>
      );
    });
    return (
      <div className={`${styles.tagsinput} ${focus ? styles.tagsinputfocus : ''} ${disabled ? styles.tagsinputdisabled : ''} `} style={{ width: '100%' }} onClick={this.onDivClick}>
        <ul>
          {rendervalue}
          <li key='input'>
            <Input
              className='ant-select-search__field'
              onChange={this.onInputChange}
              onBlur={this.onInputBlur}
              value={inputValue}
              maxLength={maxLength}
              // onPress={this.onPressEnter}
              ref={this.input}
              onFocus={this.onInputFocus}
              disabled={disabled}
              placeholder={valuelist.size === 0 ? placeholder : ''}
              onKeyDown={this.onKeyDown}
            />
          </li>
        </ul>
        {disabled && <div className='disabled' />}
      </div>
    );
  }
}

export default TagsInput;
