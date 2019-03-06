import { Input, Icon } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

class ZetInput extends React.Component {
  static defaultProps = {
    allowClear: true,
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
    // console.log(value.length);
    const returnValue = maxLength === 0 ? '' : `${(value && value.toString().length) || 0}/${maxLength}`;
    return returnValue;
  }

  change = (e) => {
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

  clearSelection = () => {
    const { onChange, onBlur } = this.props;
    const value = '';
    this.setState({
      value: '',
    });
    if (onChange) {
      onChange(value);
    }
    if (onBlur) {
      onBlur(value);
    }
  }

  render() {
    const { value } = this.state;
    const { disabled, allowClear, maxLength, className, ...restProps } = this.props;
    const clearIcon = !disabled && value.length > 0 ? <Icon onClick={this.clearSelection} type="close" className={styles.clearIcon} /> : null;
    const rootClass = classNames(styles.zetInputWrapper, className);
    return (
      <span className={rootClass}>
        <Input
          {...restProps}
          disabled={disabled}
          className={styles.zetInput}
          onChange={this.change}
          value={value}
          suffix={clearIcon}
        />
        {maxLength === 0 ? '' : <span className={styles.zetInputWrapperNum}>{this.getLabel()}</span>}
      </span>
    );
  }
}

ZetInput.propTypes = {
  allowClear: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default ZetInput;
