import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

class ZetInput extends React.Component {
  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      valueLength: 0,
    };
  }

  changeValueLength = (value) => {
    const { maxLength } = this.props;
    if (maxLength && maxLength.length > 0) {
      this.setState({
        valueLength: value.length,
      });
    }
  }

  onChange = (e) => {
    const { maxLength, onChange } = this.props;
    let value = e.target.value;
    if (value) {
      value = value.trim();
      if (maxLength && maxLength > 0) {
        value = value.substring(0, maxLength);
      }
    }
    onChange && onChange(value);
    this.changeValueLength(value);
  }

  render() {
    const { disabled, maxLength, className, ...otherProps } = this.props;
    const { valueLength } = this.state;
    const rootClass = classNames(styles.zetInputWrapper, className);
    return (
      <span className={rootClass}>
        <Input
          allowClear
          {...otherProps}
          className={styles.zetInput}
          onChange={this.onChange}
        />
        {(!maxLength || maxLength === 0) ? '' : <span className={styles.zetInputWrapperNum}>{`${valueLength}/${maxLength}`}</span>}
      </span>
    );
  }
}

ZetInput.propTypes = {
  // maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default ZetInput;
