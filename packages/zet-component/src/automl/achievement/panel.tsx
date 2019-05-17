import * as React from "react";
import PropTypes from "prop-types";
import { AchieveContext } from "./context";

import "./index.less";

export interface PanelProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties;
  /** panel 选项  panelGroup 操作子项是使用 */
  option?: string;
  /** 宽度 */
  width?: string | number;
  /** 是否在高度上自适应*/
  flex?: boolean;
  /** 高度 */
  height?: string | number;
  unfoldState: string;
  extraKeys: any;
}
class Panel extends React.Component<PanelProps> {
  static defaultProps = {
    width: "100%",
    onChange: () => {},
  };
  static contextTypes = {
    unfoldState: PropTypes.string,
    extraKeys: PropTypes.any,
  };
  constructor(props: PanelProps) {
    super(props);
    this.state = {};
  }
  getPanelUnfoldCondition = (unfoldState, extraKeys) => {
    const { option } = this.props;
    if (extraKeys === "all" || extraKeys.indexOf(option) > -1) {
      return unfoldState === "open";
    } else {
      return true;
    }
  }

  render() {
    const {
      style,
      width,
      height,
      children,
      unfoldState,
      extraKeys,
      ...otherProps
    } = this.props;
    const styleProps = { width, height, ...style };
    if (this.props.flex) {
      styleProps.flex = 1;
    }
    if (!this.getPanelUnfoldCondition(unfoldState, extraKeys)) {
      styleProps.height = 0;
      delete styleProps.flex;
    }
    return (
      <div className={"zet-panel"} style={styleProps} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default (props) => (
  <AchieveContext.Consumer>
    {({ unfoldState, extraKeys }) => {
      return <Panel {...{ ...props, unfoldState, extraKeys }} />;
    }}
  </AchieveContext.Consumer>
);
