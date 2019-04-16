import TreeSelect from './tree-select';
import * as React from "react";
// export { TreeProps } from './tree-select';
import { Dropdown, Button, Icon, Checkbox, Select as Select_ } from 'antd';

const Option = Select_.Option;

export interface SelectProps {
  data: Array<string>;
  onChange?: (e: React.MouseEvent<any>) => void,
}

class Select extends React.Component<SelectProps, any> {
  static TreeSelect: typeof TreeSelect;

  static defaultProps = {
    data: [],
  }

  constructor(props: SelectProps) {
    super(props);
  }

  state = {
    visible: false,
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag })
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  }

  render(){
    const { visible } = this.state;
    const { data } = this.props;
    const children = [];
    for (let i of data) {
      children.push(<Option key={i}>{i}</Option>);
    }
    return (
      <Dropdown
        overlay={
          <div style={{ width: 300 }}>
            <Select_
              mode="tags"
              style={{width: '100%'}}
              onChange={this.handleChange}
              defaultOpen
              open={visible}
            >
              {children}
            </Select_>
          </div>
        }
        visible={visible}
        trigger={['click']}
        placement='bottomCenter'
        onVisibleChange={this.handleVisibleChange}
      >
        <Button><Icon type='filter'/></Button>
      </Dropdown>
    )
  }
}

Select.TreeSelect = TreeSelect;

export default Select;
