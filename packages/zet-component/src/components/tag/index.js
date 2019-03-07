import * as React from 'react';
import { Dropdown, Button, Checkbox, Badge, Empty } from 'antd';
import classnames from 'classnames';
import TagsInput from './tags-input.js';
import styles from './index.less';
import { emptyPicture } from '../../utils/utils';
class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectNums: [],
            delData: [],
            inputValue: undefined,
        };
        this.handleVisibleChange = (flag) => {
            this.setState({ visible: flag });
        };
        this.selectNums = (keys) => {
            const { data, onChange } = this.props;
            this.setState({ selectNums: keys });
            const difference = Array.from(new Set([...this.state.selectNums].filter(x => !new Set(keys).has(x))));
            this.setState({ delData: difference });
            const filterArr = Array.from(new Set(data.filter(x => new Set(keys).has(x.title))));
            onChange && onChange(filterArr);
            this.onInput('');
        };
        this.delTag = (tag) => {
            const { data, onChange } = this.props;
            this.setState(prevState => {
                let { selectNums, delData } = prevState;
                const index = selectNums.indexOf(tag);
                if (index != -1) {
                    const elem = selectNums.splice(index, 1);
                    delData = elem;
                }
                const filterArr = Array.from(new Set(data.filter(x => new Set(selectNums).has(x.title))));
                onChange && onChange(filterArr);
                return { selectNums, delData };
            });
        };
        this.onInput = (value) => {
            this.setState({ inputValue: value });
        };
    }
    render() {
        const { data, style, className, icon, placeholder } = this.props;
        const { selectNums, delData, visible, inputValue } = this.state;
        const styleProps = {
            width: 39,
            ...style,
        };
        const classNames = classnames(styles.zetTag, className);
        let arr = [];
        if (data && data.length > 0) {
            if (inputValue) {
                arr = data.filter(v => v.title.toUpperCase().includes(inputValue.toUpperCase()));
            }
            else {
                arr = data;
            }
        }
        const options = arr.length > 0 && arr.map((v) => {
            return {
                label: React.createElement("span", { key: v.key }, v.title),
                value: v.title,
            };
        });
        return (React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement(Dropdown, { overlay: React.createElement("div", { className: styles.zetTagSetdrop, onClick: () => { this.handleVisibleChange(true); } },
                    React.createElement("div", { className: styles.zetTagInput },
                        React.createElement(TagsInput, { placeholder: placeholder, addData: selectNums, delData: delData, onChange: this.delTag, onInput: this.onInput, inputValue: inputValue })),
                    options && options.length > 0 ? (React.createElement(Checkbox.Group, { onChange: this.selectNums, style: { width: '100%', zIndex: 1000 }, value: selectNums, options: options, className: styles.zetTagSettableChecklist })) : (React.createElement(Empty, { className: styles.empty, description: '\u6682\u65E0\u6570\u636E', image: React.createElement("img", { style: { width: 63, height: 40 }, src: emptyPicture() }) }))), visible: visible, trigger: ['click'], placement: 'bottomCenter', onVisibleChange: this.handleVisibleChange },
                React.createElement(Badge, { dot: selectNums.length > 0, offset: [-12, 8] },
                    React.createElement(Button, { className: classNames, style: styleProps, icon: icon })))));
    }
}
Tag.defaultProps = {
    data: [],
    icon: "filter",
    placeholder: '请选择标签'
};
export default Tag;
//# sourceMappingURL=index.js.map