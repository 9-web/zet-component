import * as React from 'react';
import { DataItemSchema } from './interface';
import { Form } from 'antd';

const FormItem = Form.Item;

export interface ItemProps {
  /** item 展示需要的数据 */
  data: DataItemSchema,
}

class Item extends React.Component<ItemProps, any> {
  public render() {
    const { data,
      form: { getFieldDecorator } } = this.props;
    console.log('data', data)
    return (
      <div>
        sfsdfsd
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {},
  onFieldsChange(props) {},
})(Item);
