import * as React from 'react';
import { ValueItemSchema } from './interface';
import Item from './item';
import { List } from 'antd';


export interface AlgorithmProps {
  /** 算法配置列表 */
  data: Array<any>,
  /** 算法组件value */
  value?: Array<ValueItemSchema>

}

class Algorithm extends React.Component<AlgorithmProps, any> {
  /** 算法右侧内容 */
  static Item = Item;
  /** 算法左侧列表 */
  static List = List;
  public render() {
    return (
      <div>

      </div>
    );
  }
}

export default Algorithm;
