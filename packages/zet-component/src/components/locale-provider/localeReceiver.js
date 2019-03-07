import * as React from 'react';
import { LocaleContext } from './localeContext';
class LocaleReceiver extends React.Component {
    getLocale(locale = {}) {
        const { componentName } = this.props;
        return {
            ...locale[componentName],
            ...locale.global,
        };
    }
    render() {
        const { children } = this.props;
        return (React.createElement(LocaleContext.Consumer, null, (locale) => (children(this.getLocale(locale)))));
    }
}
export default LocaleReceiver;
//# sourceMappingURL=localeReceiver.js.map