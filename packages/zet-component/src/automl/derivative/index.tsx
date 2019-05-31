import React from "react";
import { Layout } from "antd";
import List from "./list";
import { LocaleReceiverHoc } from "../../utils/hoc";
import Item from "./item";
import Collapse from "./collapse";
import "./index.less";

const { Content, Sider, Footer } = Layout;

interface ValueItemSchema {
  /** 算法Id */
  id: string;
  /** 算法名称 */
  name: string;
  checked?: boolean;
  /** 参数选项 */
  params: any[];
}

interface DerivativeProps {
  /** 算法配置列表 */
  data: any[];
  collapseData: object;
  /** 算法组件value */
  value?: ValueItemSchema[];
  /** 当前内容是否禁用 */
  disabled: boolean;
  /** 数据内容发生变化回调 */
  onChange?: (value: ValueItemSchema[]) => void;
}
interface DerivativeState {
  currentId: string;
}

class Derivative extends React.Component<DerivativeProps, DerivativeState> {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
    };
  }
  componentDidMount() {
    const currentData = this.props.data[0];
    currentData && this.setState({
      currentId: currentData.id,
    });
  }
  onListChange = item => {
    const { currentId } = this.state;
    item && item.id !== currentId && this.setState({
      currentId: item.id,
    });
  }
  onSwitchChange = (checked, data) => {
    const { value } = this.props;
    const newValue = value.map(item => {
      if (item.id === data.id) {
        item.checked = checked;
      }
      return item;
    });
    this.props.onChange(newValue);
  }

  onSelectedChange = (data) => {
    const {value} = this.props;
    const newValue = value.map(item => {
      if (item.id === data.id) {
        item.params = data.params;
      }
      return item;
    });
    this.props.onChange(newValue);
  }
  render() {
    const {data, collapseData, disabled = false, value = []} = this.props;
    const { currentId } = this.state;
    const contentData = data.find((item) => (item.id === currentId)) || {params: []};
    const contentValue = value.find((item) => (item.id === currentId)) || {id: '', params: []};
    return (
      <Layout>
        <Layout className={"alg-layout derivative"}>
          <Sider theme="light" width={240}>
            <p className={"sider-title"}>特征衍生策略</p>
            {data && (
              <List
                disabled={disabled}
                data={data}
                value={value}
                onChange={this.onListChange}
                onSwitchChange={this.onSwitchChange}
              />
            )}
          </Sider>
          <Content className={"alg-content"}>
            <div>
              <Item
                mess={"使用数值类的原始特征生成新的特征."}
                data={contentData.params}
                value={contentValue}
                onChange={this.onSelectedChange}
              />
            </div>
          </Content>
        </Layout>
        <Footer className={'derivative-footer'} style={{ height: 300 }}>
          <Collapse data={collapseData}/>
        </Footer>
      </Layout>
    );
  }
}

export default LocaleReceiverHoc("AutoML")(Derivative);
