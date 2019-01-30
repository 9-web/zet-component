import TreeSelect from './tree-select';
import * as React from "react";

export interface TagProps {
  title?: string;
}

class Select  extends React.Component<TagProps, any> {
  static TreeSelect: typeof TreeSelect;

  render(){
    const { title } = this.props;
    return <div>{title}</div>
  }
}

Select.TreeSelect = TreeSelect;

export default Select;
