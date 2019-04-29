import * as React from 'react';
import classnames from 'classnames';
import './index.less';
import Sider from './sider';
import Content from './content';

export interface LayoutComponentProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 资源组件的宽度 */
  width?: string | number;
}

export interface LayoutComponentState {

}

class LayoutComponent extends React.Component<LayoutComponentProps, LayoutComponentState> {
  static Sider: typeof Sider;
  static Content: typeof Content;
  constructor(props: LayoutComponentProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { style, className, width, children } = this.props;
    const classNames = classnames('zetLayout', className);
    const styleProps = {...style, width};
    return (
      <div className={classNames} style={styleProps}>
        {children}
      </div>
    );
  }
}

export default LayoutComponent;
