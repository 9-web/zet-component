import * as React from 'react';
import { ValueItemSchema, DataItemSchema } from './interface';
import { Layout, Slider } from 'antd';
import Item from './item';
import List from './list';
import styles from './index.less';
console.log('styles', styles);

const { Sider, Content } = Layout;

export interface AlgorithmProps {
  /** 算法配置列表 */
  data: Array<any>,
  /** 算法组件value */
  value?: Array<ValueItemSchema>,
  /** 当前内容是否禁用 */
  disabled: boolean,
  /** 数据内容发生变化回调 */
  onChange?: (value: Array<ValueItemSchema>) => void;
}

export interface AlgorithmState {
  /** 算法配置列表 */
  singleData?: DataItemSchema,
  /** 算法组件value */
  singleValue?: ValueItemSchema,
  /** 整个算法value 的值 */
  value?: Array<ValueItemSchema>,
  /** data 值 */
  data?: Array<any>,

  isDisable?: boolean,
}

class Algorithm extends React.Component<AlgorithmProps, AlgorithmState> {
  /** 算法右侧内容 */
  static Item = Item;
  /** 算法左侧列表 */
  static List = List;

  static defaultProps = {
    value: [],
    disable: false,
  }

  constructor(props: AlgorithmProps ) {
    super(props);

    const defaultSingleData = props.data.length > 0 && props.data[0];
    const defaultSingleValue = this.getSingleValue(defaultSingleData, props.value);
    this.state = {
      singleData: defaultSingleData,  // 单个算法数据项
      singleValue: defaultSingleValue,
      value: props.value,
      data: this.handleData(props),
      isDisable: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        data: this.handleData(nextProps.data)
      });
    }
  }

  handleData = (props) => {
    const {data, value} = props;
    data && data.forEach(fh => {
      fh.checked = value.some(sm => sm.id === fh.id);
    })
    return data;
  }

  getSingleValue = (data, value) => {
    const singleValue = (value && value.find(fd => fd.id === data.id)) || { id: data.id, name: data.name, params: {}};
    return singleValue;
  }

  onListChange = (data) => {
    // console.log('data', data);
    const { value } = this.state;
    const singleValue = this.getSingleValue(data, value);
    this.setState({
      singleData: data,
      singleValue: singleValue,
    })
  }

  onSwitchChange = (checked, data) => {
    // console.log('checkout, data', checked, data)
    const {value} = this.state;
    const { onChange } = this.props;
    let newValue = value;
    data.checked = checked;
    if (checked) {
      newValue.push({id: data.id, name: data.name, params: {}});
    } else {
      newValue = newValue.filter(ft => ft.id !== data.id);
    }
    this.setState({
      isDisable: false,
    }, () => {
      this.setState({
        singleData: data,
        singleValue: {id: data.id, name: data.name, params: {}},
        value: newValue,
        isDisable: true,
      });
      onChange && onChange(newValue);
    })
  }

  onItemChange = (data) => {
    // console.log('onItemChange', data)
    const {value} = this.state;
    const {onChange} = this.props;
    value.forEach(fh => {
      if (data.id === fh.id) {
        fh.params = data.params;
      }
    })
    onChange && onChange([...value]);
  }

  public render() {
    const {disabled} = this.props;
    const {singleData, singleValue, isDisable, data, value} = this.state;
    return (
      <Layout className={styles.layout}>
        <Sider theme='light' width={240}>
          <List
            disabled={disabled}
            data={data}
            value={value}
            onChange={this.onListChange}
            onSwitchChange={this.onSwitchChange}
          />
        </Sider>
        <Content
          className={styles.content}
        >
          {
            isDisable && singleData && <Item
              disabled={disabled || !singleData.checked}
              value={singleValue}
              data={singleData}
              onChange={this.onItemChange}
              />
          }
        </Content>
      </Layout>
    );
  }
}

export default Algorithm;
