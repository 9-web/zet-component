import * as React from 'react';
import { Dropdown, Button, Icon, Checkbox, Input, Badge, Empty, message } from 'antd';
import classnames from 'classnames';
import TagInput from '../tag-input'
import styles from './index.less';
import { emptyPicture } from '../../utils/utils';

export interface Tags {
  title: string,
  key: string,
  value: string,
}

export interface TagProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 是否禁用 */
  disabled?: boolean,
  /** 输入框内容变化时的回调 */
  onChange?: (value) => {},
  /** 下拉框数据 */
  data?: Array<Tags>,
  /** 按钮图标 */
  icon?: string,
  /** 占位符 */
  placeholder?: string,
  /** 最大个数 */
  maxLength?: number,
}

class Tag extends React.Component<TagProps, any> {

  constructor(props: TagProps) {
    super(props);
  }

  static defaultProps = {
    data: [],
    icon: "filter",
    placeholder: '请选择标签'
  }

  state = {
    visible: false,
    data: [],
    selectNums: [],
    delData: [],
    inputValue: undefined,
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag })
  }

  selectNums = (keys) => {
    const { data, onChange, maxLength } = this.props;
    if (keys.length > maxLength) {
      return message.warning(`最多可添加${maxLength}个标签`);
    }
    this.setState({ selectNums: keys });
    const difference = Array.from(new Set([...this.state.selectNums].filter(x => !new Set(keys).has(x))));
    this.setState({ delData: difference });
    const filterArr = Array.from(new Set(data.filter(x => new Set(keys).has(x.title))));
    onChange && onChange(filterArr);
    this.onInput('');
  }

  delTag =  (values) => {
    const { data, onChange } = this.props;
    this.setState(prevState => {
      let { selectNums, delData } = prevState;
      const difference = Array.from(new Set([...this.state.selectNums].filter(x => !new Set(values).has(x))));
      difference.length > 0 && difference.forEach(v => selectNums.splice(selectNums.indexOf(v), 1));
      this.setState({ delData: difference });
      const filterArr = Array.from(new Set(data.filter(x => new Set(selectNums).has(x.title))));
      onChange && onChange(filterArr);
      return { selectNums, delData };
    });
  }

  onInput = (value) => {
    this.setState({inputValue:value});
  }


  render() {
    const { data, style, className, icon, placeholder, maxLength } = this.props;
    const { selectNums, delData, visible, inputValue } = this.state;
    const styleProps = {
      width: 39,
      ...style,
    }
    const classNames = classnames(styles.zetTag, className);
    let arr = [];
    if (data && data.length > 0) {
      if (inputValue) {
        arr = data.filter(v=>v.title.toUpperCase().includes(inputValue.toUpperCase()));
      } else {
        arr = data;
      }
    }
    const options = arr.length > 0 && arr.map((v) => {
      return {
        label: <span key={v.key}>{v.title}</span>,
        value: v.title,
      }
    });
    return (
      <div style={{ display: 'inline-block' }}>
        <Dropdown
          overlay={
            <div
              className={styles.zetTagSetdrop}
              onClick={() => { this.handleVisibleChange(true); }}
            >
              <div className={styles.zetTagInput}>
                <TagInput maxLength={maxLength} placeholder={placeholder} addData={selectNums} delData={delData} onChange={this.delTag} onInput={this.onInput} type='string' allowEnter={false}/>
              </div>
              {options && options.length > 0 ? (
                <Checkbox.Group
                  onChange={this.selectNums}
                  style={{ width: '100%', zIndex: 1000 }}
                  value={selectNums}
                  options={options}
                  className={styles.zetTagSettableChecklist}
                >
                </Checkbox.Group>) : (
                <Empty className={styles.empty} description='暂无数据' image={<img style={{ width: 63, height: 40 }} src={emptyPicture()} />} />
                )
              }
            </div>
          }
          visible={visible}
          trigger={['click']}
          placement='bottomCenter'
          onVisibleChange={this.handleVisibleChange}
        >
          <Badge dot={selectNums.length > 0} offset={[-12,8]}><Button className={classNames} style={styleProps} icon={icon} /></Badge>
        </Dropdown>
      </div>
    )
  }
}

export default Tag;
