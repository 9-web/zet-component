import * as React from 'react';
import { Menu, Switch } from 'antd';
import LocaleReceiver from '../../components/locale-provider/localeReceiver';
import styles from './index.less';
const MenuItem = Menu.Item;
class List extends React.Component {
    constructor() {
        super(...arguments);
        this.handleMenuClick = (item) => {
            const { onChange } = this.props;
            onChange && onChange(item);
        };
        this.onSwitchChange = (checked, data) => {
            // console.log('checked', checked)
            const { onSwitchChange } = this.props;
            onSwitchChange && onSwitchChange(checked, data);
        };
    }
    render() {
        const { data, value, disabled } = this.props;
        // console.log('data', data, value)
        const defaultSelectKey = data.length > 0 && data[0].id || '';
        return (React.createElement(Menu, { mode: 'inline', defaultSelectedKeys: [defaultSelectKey], className: styles.zetAmlAlgorithmLayoutList }, data.map(d => (React.createElement(MenuItem, { className: styles.zetAmlAlgorithmLayoutListItem, key: d.id, onClick: () => { this.handleMenuClick(d); } },
            React.createElement("span", null, d.name),
            React.createElement(LocaleReceiver, { componentName: "AutoML" }, (locale) => (React.createElement(Switch, { className: styles.zetAmlAlgorithmLayoutListItemRight, 
                // size='small'
                checkedChildren: locale.on, unCheckedChildren: locale.off, checked: d.checked, disabled: disabled, onChange: checked => { this.onSwitchChange(checked, d); } }))))))));
    }
}
export default List;
//# sourceMappingURL=list.js.map