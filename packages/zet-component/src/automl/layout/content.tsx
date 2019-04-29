import * as React from 'react';
import classnames from 'classnames';

import './index.less';

export interface ContentProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 资源组件的宽度 */
  width?: string | number;

}

export interface ContentState {

}

class Content extends React.Component<ContentProps, ContentState> {
  constructor(props: ContentProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { style, className, width, children } = this.props;
    const classNames = classnames('zetContent', className);
    const styleProps = {...style, width};
    return (
      <div className={classNames} style={styleProps}>
        {children}
      </div>
    );
  }
}

export default Content;
