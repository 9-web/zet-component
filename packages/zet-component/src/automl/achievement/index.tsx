import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'antd';

import styles from './index.less';

export interface AchievementProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  /** 宽度 */
  width?: string | number,
  /** 高度 */
  height?: string | number,
  /** title 样式扩展 */
  headStyle?: React.CSSProperties,
  /** 标题 */
  title?: string,
  /** 扩展 */
  extra?: Array<any>,
  /** 资源改变触发的回调 */
  onChange?: (e: React.MouseEvent<any>) => void,
}

export interface AchievementState {
  /** 展开 关闭操作 open：展开  closed：关闭*/
  unfoldState:string,
  /** 旋转按钮 rotateRightLeft: 从右向左 rotateLeftRight：从左向右*/
  rotateState:string,
  /** 图形展示 chart: 图形 table: 表格*/
  showShape:string
}

class Achievement extends React.Component<AchievementProps, AchievementState> {
  constructor(props: AchievementProps) {
    super(props);
    this.state = {
      unfoldState:'open',
      rotateState:'',
      showShape:'chart'
    }
  }

  render() {
    const {
      style, className, headStyle, title,
      width, height, extra, children
    } = this.props;
    const styleProps = {width, height, ...style};
    const { unfoldState } = this.state;
    const cNames = classNames(styles.zetAchievement, className);
    return (
      <div style={styleProps} className={cNames}>
        {title && (
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel header="This is panel header 1" key="1">
              {123}
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 2" key="2">
              {123}
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 3" key="3">
              {123}
            </Collapse.Panel>
          </Collapse>
        )}
      </div>
    )
  }
}

export default Achievement
