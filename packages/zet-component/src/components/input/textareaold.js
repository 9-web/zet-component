import { Input } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

const AntdTextArea = Input.TextArea;

class TextArea extends Component {
  static defaultProps = {
    maxLength: 0,
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.getValue(props.value) || this.getValue(props.defaultValue) || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: this.getValue(nextProps.value) || '' });
    }
  }

  onChange = (e) => {
    const { onChange, maxLength } = this.props;
    let value = e.target && e.target.value;
    if (maxLength > 0 && (value.length > maxLength)) {
      value = value.substring(0, maxLength);
    }
    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  }

  getValue = (value) => {
    let newValue = '';
    const { maxLength } = this.props;
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
    const returnValue = maxLength === 0 ? '' : `${(value && value.length) || 0}/${maxLength}`;
    return returnValue;
  }

  render() {
    const { value } = this.state;
    const { maxLength, className, ...otherProps } = this.props;
    const rootClass = classNames(styles.zetTextareaWrapper, className);
    return (
      <div className={rootClass}>
        <AntdTextArea
          {...otherProps}
          onChange={this.onChange}
          className={styles.zetInput}
          value={value}
        />
        {maxLength === 0 ? '' : <span className={styles.zetInputWrapperNum}>{this.getLabel()}</span>}
      </div>
    );
  }
}

TextArea.propTypes = {
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

export default TextArea;
