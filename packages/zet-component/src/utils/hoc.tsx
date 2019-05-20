import React from "react";
import { LocaleProvider } from "../index";
import LocaleReceiver from "../components/locale-provider/localeReceiver";

/**
   中英文 LocaleProvider hoc
*/
interface LocaleProviderHocState {
  /** 图表类型 */
  currLocale: string;
}
export const LocaleProviderHoc = WrappedComponent => {
  class HocComponent extends React.Component<any, LocaleProviderHocState> {
    constructor(props) {
      super(props);
      this.state = {
        currLocale: "zh_CH",
      };
    }
    clickHandle = () => {
      this.setState({
        currLocale: this.state.currLocale === "en_US" ? "zh_CH" : "en_US",
      });
    }
    render() {
      const { currLocale } = this.state;
      return (
        <LocaleProvider locale={currLocale}>
          <div>
            <p style={{ textAlign: "right" }}>
              中英文切换 :{" "}
              <a onClick={this.clickHandle}>
                {currLocale === "en_US" ? "中文" : "英文"}
              </a>
            </p>
            {WrappedComponent}
          </div>
        </LocaleProvider>
      );
    }
  }
  return <HocComponent />;
};

/**
   中英文 LocaleProvider hoc
*/
interface LocaleReceiverHocState {
  /** 图表类型 */
  lcoale: any;
}
export const LocaleReceiverHoc = componentName => WrappedComponent => {
  return class HocComponent extends React.Component<any, LocaleReceiverHocState> {
    constructor(props) {
      super(props);
      this.state = {
        lcoale: {},
      };
    }
    render() {
      const { lcoale } = this.state;
      return (
        <LocaleReceiver componentName={componentName}>
          {(locale: any) => <WrappedComponent {...this.props} intl={locale} />}
        </LocaleReceiver>
      );
    }
  };
};
