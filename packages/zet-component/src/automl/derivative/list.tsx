import * as React from 'react';
import { Menu, Switch } from 'antd';
import { LocaleReceiverHoc } from "../../utils/hoc";
import './index.less';

const MenuItem = Menu.Item;

/** 当个数据项结构 */
interface DataItemSchema {
  /** id */
  id: string;
  /** 名称 */
  name: string;
  /** 描述 */
  desc?: string;
  /** 是否可用 */
  checked?: boolean;
  /** 算法参数列表 */
  params: any[];
}

/** 单个value结构 */
interface ValueItemSchema {
  /** 算法Id */
  id: string;
  /** 算法名称 */
  name: string;
  checked?: boolean;
  /** 参数选项 */
  params: object;
}

export interface ListProps {
  data: DataItemSchema[];
  value: ValueItemSchema[];
  onChange?: (data: any) => void;
  disabled: boolean;
  intl: any;
  onSwitchChange?: (checked: boolean, data: DataItemSchema) => void;
}

class List extends React.Component<ListProps, any> {

  handleMenuClick = (item) => {
    const { onChange } = this.props;
    onChange && onChange(item);
  }

  onSwitchChange = (checked: boolean, data) => {
    // console.log('checked', checked)
    const { onSwitchChange } = this.props;
    onSwitchChange && onSwitchChange(checked, data);
  }

  public render() {
    const { data, value, disabled, intl= {} } = this.props;
    const defaultSelectKey = data.length > 0 && data[0].id || '';
    return (
      <Menu
        mode='inline'
        defaultSelectedKeys={[defaultSelectKey]}
        className={'alg-list'}
        // onClick={this.handleMenuClick}
      >
        {
          data.map((d) => {
            const currentValue = value.find(item => (item.id === d.id)) || {checked: false};
            return (
              <MenuItem
              className={'alg-item'}
              key={d.id}
              onClick={() => {this.handleMenuClick(d); }}
            >
              <span>{d.name}</span>
              <Switch
                className={'alg-right'}
                // size='small'
                checkedChildren={intl.on}
                unCheckedChildren={intl.off}
                checked={ currentValue.checked }
                disabled={disabled}
                onChange={(checked) => { this.onSwitchChange(checked, d); }}
                // onClick={checked => { this.onSwitchChange(checked) }}
                // className={styles.amMenuListItemRight}
              />
            </MenuItem>
            );
          })
        }
      </Menu>
    );
  }
}

export default LocaleReceiverHoc("AutoML")(List);
