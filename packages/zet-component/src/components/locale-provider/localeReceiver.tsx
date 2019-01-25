import * as React from 'react';
import { LocaleContext } from './localeContext';

export interface LocaleReceiverProps{
    /** 组件名称 */
    componentName? : string,
    /** 组件内容是一个函数  */
    children: (locale: object) => React.ReactElement<any>;
}

class LocaleReceiver extends React.Component<LocaleReceiverProps, any> {
  getLocale(locale: any = {}) {
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

export default LocaleReceiver;
