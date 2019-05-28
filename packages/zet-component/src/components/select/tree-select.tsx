import * as React from "react";
import { TreeSelect as TreeSelect_ } from 'antd';
import classnames from 'classnames';

import './index.less';

export interface TreeNodeNormal {
  value: string | number;
  /**
   * @deprecated Please use `title` instead.
   */
  label?: React.ReactNode;
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

export interface TreeProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 下拉框树形数组 */
  treeData: TreeNodeNormal[];
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
  };

  state = {
    value: undefined,
  };

  constructor(props: TreeProps) {
    super(props);
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const {
      style, className, treeData, showSearch, allowClear, treeDefaultExpandAll,
      treeNodeFilterProp, ...rest } = this.props;
    const classNames = classnames('zet-select', className);
    const defuleStyle = {
      ...style,
    };

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
