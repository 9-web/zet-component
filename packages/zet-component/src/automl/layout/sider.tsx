import * as React from 'react';
import classnames from 'classnames';

import styles from './index.less';

export interface SiderProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 资源组件的宽度 */
  width?: string | number,
}

export interface SiderState {

}

class Sider extends React.Component<SiderProps, SiderState> {
  constructor(props: SiderProps) {
    super(props);
    this.state = {}
  }

  render() {
    const { style, className,width,children } = this.props;
    const classNames = classnames(styles.zetSider,className);
    const styleProps = {...style, width}
    return (
      <div className={classNames} style={styleProps}>
        {children}
      </div>
    );
  }
}

export default Sider
