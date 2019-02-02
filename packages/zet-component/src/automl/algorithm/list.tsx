import * as React from 'react';
import { Menu, Switch } from 'antd';
import { DataItemSchema, ValueItemSchema } from './interface';
import LocaleReceiver from '../../components/locale-provider/localeReceiver';

const MenuItem = Menu.Item;

export interface ListProps {
  data: Array<DataItemSchema>,
  value: Array<ValueItemSchema>,
}

class List extends React.Component<ListProps, any> {


  handleMenuClick = (item) => {
    console.log('item', item);
  }

  public render() {
    const { data } = this.props;
    console.log('data', data)
    return (
      <Menu
        mode='inline'
        onClick={this.handleMenuClick}
      >
        {
          data.map(d => (
            <MenuItem
              key={d.id}
            >
              <span>{d.name}</span>
              <LocaleReceiver componentName="AutoML">
                {
                  (locale: any) => (
                    <Switch
                      // size='small'
                      checkedChildren={locale.on}
                      unCheckedChildren={locale.off}
                      // checked={list[arith] && list[arith].status}
                      // onClick={checked => { this.onSwitchChange(checked, arith); }}
                      // className={styles.amMenuListItemRight}
                    />
                  )
                }
              </LocaleReceiver>
            </MenuItem>
          ))
        }
      </Menu>
    );
  }
}

export default List;
