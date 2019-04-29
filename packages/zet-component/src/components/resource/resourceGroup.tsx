import * as React from 'react';
import { ResourceContext } from './resourceContext';
import classnames from 'classnames';
import './index.less';
export interface ResourceGroupProps {
  /** 组件行行内样式 */
  style: React.CSSProperties;
  /** 自定义类名 */
  className: string;
  /** 资源项标题 */
  title: string;
  /** 是否禁用 */
  disabled: boolean;
}

class ResourceGroup extends React.Component<ResourceGroupProps, any> {
  static defaultProps = {
    title: '',
    className: '',
    style: {},
    disabled: false,
  };

  render() {
    const { className, title, children, disabled } = this.props;
    const styleProps = {

    };
    const classNames = classnames('zet-resource-panel', className);
    // context value
    const contextValue = {
      resourceGroup: {
        disabled,
      },
    };
    return (
      <div style={styleProps} className={classNames}>
        <div className='zet-resource-panel-title'>
          {title}
        </div>
        <div className='zet-resource-panel-content'>
          <ResourceContext.Provider value={contextValue}>
            { children }
          </ResourceContext.Provider>
        </div>
      </div>
    );
  }
}

export default ResourceGroup;
