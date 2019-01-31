import TreeSelect from './tree-select';
import * as React from "react";
export { TreeProps } from './tree-select';

export interface SelectProps {
  title?: string;
}

class Select extends React.Component<SelectProps, any> {
  static TreeSelect: typeof TreeSelect;

  render(){
    const { title } = this.props;
    return <div>{title}</div>
  }
}

Select.TreeSelect = TreeSelect;

export default Select;
