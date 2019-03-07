import * as React from 'react';
import { LocaleContext } from './localeContext';
import LocaleReceiver from './localeReceiver';
import zhCN from './zh_CN';
import enUS from './en_US';
class LocaleProvider extends React.Component {
    render() {
        const { children, locale } = this.props;
        const currLocal = locale === 'en_US' ? enUS : zhCN;
        // console.log('currLocal', currLocal, locale)
        return (React.createElement(LocaleContext.Provider, { value: currLocal }, React.Children.only(children)));
    }
}
LocaleProvider.defaultProps = {
    locale: 'zh_CN'
};
LocaleProvider.LocaleReceiver = LocaleReceiver;
export default LocaleProvider;
//# sourceMappingURL=index.js.map