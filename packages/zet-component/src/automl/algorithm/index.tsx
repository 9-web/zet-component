import * as React from 'react';
import { ValueItemSchema } from './interface';
import { Layout, Slider } from 'antd';
import Item from './item';
import List from './list';

const { Sider, Content } = Layout;

export interface AlgorithmProps {
  /** 算法配置列表 */
  data: Array<any>,
  /** 算法组件value */
  value?: Array<ValueItemSchema>
  onChange?: (value: Array<ValueItemSchema>) => void;
}

class Algorithm extends React.Component<AlgorithmProps, any> {
  /** 算法右侧内容 */
  static Item = Item;
  /** 算法左侧列表 */
  static List = List;

  constructor(props: AlgorithmProps ) {
    super(props);
    this.state = {

    }
  }

  public render() {
    const {data, value} = this.props;
    return (
      <Layout className=''>
        <Sider theme='light' width={240}>
          <List data={data} value={value}></List>
        </Sider>
        <Content>
          sd
        </Content>
      </Layout>
    );
  }
}

export default Algorithm;
