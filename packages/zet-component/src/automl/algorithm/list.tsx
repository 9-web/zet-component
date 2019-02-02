import * as React from 'react';
import { Menu, Switch } from 'antd';
import { DataItemSchema, ValueItemSchema } from './interface';
import LocaleReceiver from '../../components/locale-provider/localeReceiver';
import styles from './index.less';

const MenuItem = Menu.Item;

export interface ListProps {
  data: Array<DataItemSchema>,
  value: Array<ValueItemSchema>,
  onChange?: (data: any) => void,
  disabled: boolean,
  onSwitchChange?: (checked: boolean, data:DataItemSchema) => void,
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
    const { data, value, disabled } = this.props;
    // console.log('data', data, value)
    const defaultSelectKey = data.length > 0 && data[0].id || '';
    return (
      <Menu
        mode='inline'
        defaultSelectedKeys={[defaultSelectKey]}
        className={styles.zetAmlAlgorithmLayoutList}
        // onClick={this.handleMenuClick}
      >
        {
          data.map(d => (
            <MenuItem
              className={styles.zetAmlAlgorithmLayoutListItem}
              key={d.id}
              onClick={() => {this.handleMenuClick(d)}}
            >
              <span>{d.name}</span>
              <LocaleReceiver componentName="AutoML">
                {
                  (locale: any) => (
                    <Switch
                    className={styles.zetAmlAlgorithmLayoutListItemRight}
                      // size='small'
                      checkedChildren={locale.on}
                      unCheckedChildren={locale.off}
                      checked={ d.checked }
                      disabled={disabled}
                      onChange={checked => { this.onSwitchChange(checked, d) }}
                      // onClick={checked => { this.onSwitchChange(checked) }}
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
