import React, { Component } from 'react';
import { ResourceContext } from './resourceContext';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';

class ResourceGroup extends Component {
  static defaultProps = {
    title: '',
    className: '',
    style: {},
    disabled: false,
  }

  render() {
    const { className, title, children, disabled } = this.props;
    const styleProps = {

    }
    const classNames = classnames(styles.zetResourcePanel, className);
    // context value
    const contextValue = {
      resourceGroup: {
        disabled,
      }
    }
    return (
      <div style={styleProps} className={classNames}>
        <div className={styles.zetResourcePanelTitle}>
          {title}
        </div>
        <div className={styles.zetResourcePanelContent}>
          <ResourceContext.Provider value={contextValue}>
            { children }
          </ResourceContext.Provider>
        </div>
      </div>
    )
  }
}

ResourceGroup.propTypes = {
  /** 组件行行内样式 */
  style: PropTypes.object,
  /** 自定义类名 */
  className: PropTypes.string,
  /** 资源项标题 */
  title: PropTypes.string,
  /** 是否禁用 */
  disabled: PropTypes.bool,
}

export default ResourceGroup;
