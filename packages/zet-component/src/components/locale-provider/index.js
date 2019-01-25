import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from './localeContext';
import LocaleReceiver from './localeReceiver';
import zhCN from './zh_CN';
import enUS from './en_US';

class LocaleProvider extends Component {

  static defaultProps = {
    locale: 'zh_CN'
  }

  render() {
    const {children, locale} = this.props;
    const currLocal = locale === 'en_US' ? enUS : zhCN;
    // console.log('currLocal', currLocal, locale)
    return (
      <LocaleContext.Provider value={currLocal}>
        {/* 子节点只有一项 */}
        {React.Children.only(children)}
      </LocaleContext.Provider>
    )
  }
}

LocaleProvider.propTypes = {
  /** 语言包配置, 参数可为zh_CN || en_US*/
  locale: PropTypes.string
}

LocaleProvider.LocaleReceiver = LocaleReceiver;

export default LocaleProvider;
