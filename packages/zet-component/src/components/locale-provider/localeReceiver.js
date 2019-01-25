import React, { Component } from 'react';
import { LocaleContext } from './localeContext';
import PropTypes from 'prop-types';
class LocaleReceiver extends Component {

  getLocale(locale = {}) {
    const { componentName  } = this.props;
    return {
      ...locale[componentName],
      ...locale.global,
    }
  }

  render() {
    const { children } = this.props;
    return (
      <LocaleContext.Consumer>
        {
          (locale) => (children(this.getLocale(locale)))
        }
      </LocaleContext.Consumer>
    )
  }
}

LocaleReceiver.propTypes = {
  /** 组件名称 */
  componentName: PropTypes.string,
}

export default LocaleReceiver;
