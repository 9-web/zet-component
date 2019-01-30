import * as React from "react";
import { TreeSelect as TreeSelect_, Icon } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

export interface TreeNode {
  value: string | number;
  label?: React.ReactNode;
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNode[];
}

export interface TreeProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  treeData: Array<TreeNode>;
  showSearch?: boolean;
  allowClear?: boolean;
  treeDefaultExpandAll?: boolean;
  treeSelectProps?: any;
}

class TreeSelect  extends React.Component<TreeProps, any> {
  static defaultProps = {
    showSearch: true,
    allowClear: true,
    treeDefaultExpandAll: true,
  }

  constructor(props: TreeProps) {
    super(props);
  }

  state = {
    value: undefined,
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    const { style, className, treeData, showSearch, allowClear, treeDefaultExpandAll, ...rest } = this.props;
    const classNames = classnames(styles.zetSelect, className);
    const defuleStyle = {
      width: 300,
      ...style,
    }

    return (
      <TreeSelect_
        style={defuleStyle}
        className={classNames}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        onChange={this.onChange}
        treeData={treeData}
        showSearch={showSearch}
        allowClear={allowClear}
        treeNodeFilterProp='title'
        treeDefaultExpandAll={treeDefaultExpandAll}
        {...rest}
      />
    );
  }
}
export default TreeSelect;
