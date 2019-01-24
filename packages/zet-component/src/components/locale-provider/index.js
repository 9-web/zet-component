import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from './localeContext';

class LocaleProvider extends Component {

  static defaultProps = {
    locale: {}
  }


  render() {
    const {children} = this.props;
    return (
      <LocaleContext.Provider locale={}>
        {/* 子节点只有一项 */}
        {React.Children.only(children)}
      </LocaleContext.Provider>
    )
  }
}

LocaleProvider.propTypes = {
  /** 语言包配置 */
  locale: PropTypes.object
}

export default LocaleProvider;
