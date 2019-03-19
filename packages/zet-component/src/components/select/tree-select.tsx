import * as React from "react";
import { TreeSelect as TreeSelect_ } from 'antd';
import { TreeNodeNormal } from 'antd/lib/tree-select/interface';
import classnames from 'classnames';

import styles from './index.less';

export interface TreeProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 下拉框树形数组 */
  treeData: Array<TreeNodeNormal>;
  /** 是否展示搜索匡 */
  showSearch?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否展开树 */
  treeDefaultExpandAll?: boolean;
  /** 指定搜索属性 */
  treeNodeFilterProp?: string;
}

class TreeSelect  extends React.Component<TreeProps, any> {
  static defaultProps = {
    showSearch: true,
    allowClear: true,
    treeDefaultExpandAll: true,
    treeNodeFilterProp: 'title',
  }

  constructor(props: TreeProps) {
    super(props);
  }

  state = {
    value: undefined,
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { style, className, treeData, showSearch, allowClear, treeDefaultExpandAll, treeNodeFilterProp, ...rest} = this.props;
    const classNames = classnames(styles.zetSelect, className);
    console.log('styles.zetSelect', styles.zetSelect);
    const defuleStyle = {
      ...style,
    }

    return (
      <TreeSelect_
        style={defuleStyle}
        dropdownClassName={classNames}
        value={this.state.value}
        onChange={this.onChange}
        treeData={treeData}
        showSearch={showSearch}
        allowClear={allowClear}
        treeNodeFilterProp={treeNodeFilterProp}
        treeDefaultExpandAll={treeDefaultExpandAll}
        {...rest}
      />
    );
  }
}
export default TreeSelect;
