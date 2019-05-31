import React from 'react';
import { Table } from 'antd';
import './index.less';

interface ValueItemSchema {
  /** 算法Id */
  id: string;
  /** 算法名称 */
  name?: string;
  checked ?: boolean;
  /** 参数选项 */
  params: any[];
}

interface ItemProps {
  mess?: string;
  data: any[];
  intl?: any;
  value: ValueItemSchema;
  onChange?: (value: any, selectedKeys: any) => void;
}

class Item extends React.Component<ItemProps> {

  onSelectChange = (selectedRowKeys) => {
    const {value} = this.props;
    this.props.onChange({...value, params: selectedRowKeys}, selectedRowKeys);
  }

  render() {
    const { mess, data, value, intl= {} } = this.props;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '含义',
        dataIndex: 'meaning',
      },
    ];
    const rowSelection = {
      selectedRowKeys: value.params || [],
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({disabled: !value.checked}),
    };
    const dataSource = getDataSource(data);
    return(
      <React.Fragment>
        <div className={'mess'}>
            <p>{mess}</p>
        </div>
        <Table rowSelection={rowSelection}
        columns={columns} dataSource={dataSource} pagination={false} bordered={false}/>
      </React.Fragment>
    );
  }
}

const getDataSource = (data= []) => {
  return Array.isArray(data) ? (
    data.map((item) => (
      {
        key: item.key,
        name: item.name,
        meaning: item.meaning,
      }
    ))
  ) : [];
};

export default Item;
