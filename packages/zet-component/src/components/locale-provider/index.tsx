import * as React from "react";
import { LocaleContext } from "./localeContext";
import LocaleReceiver from "./localeReceiver";
import zhCN from "./zh_CN";
import enUS from "./en_US";

export interface LocaleProviderProps {
  /** 语言包配置, 参数可为zh_CN || en_US*/
  locale?: string;
}

class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static LocaleReceiver: typeof LocaleReceiver;
  static defaultProps = {
    locale: "zh_CN"
  };

  render() {
    const { children, locale } = this.props;
    const currLocal = ["en_US", "en-US"].includes(locale) ? enUS : zhCN;
    console.log("currLocal", currLocal, locale);
    return (
      <LocaleContext.Provider value={currLocal}>
        {/* 子节点只有一项 */}
        {React.Children.only(children)}
      </LocaleContext.Provider>
    );
  }
}

LocaleProvider.LocaleReceiver = LocaleReceiver;

export default LocaleProvider;
