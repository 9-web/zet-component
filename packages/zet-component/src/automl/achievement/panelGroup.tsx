import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'

import styles from './index.less';

export interface PanelGroupProps {
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
  title: string,
  /** 扩展 */
  extra?: Array<any>,
  /** 扩展操作的key  all：全部  */
  extraKeys?: string | Array<string>,
  /** 资源改变触发的回调 */
  onChange?: (e: React.MouseEvent<any>) => void,
}

export interface PanelGroupState {
  /** 展开 关闭操作 open：展开  closed：关闭*/
  unfoldState:string,
  /** 旋转按钮 rotateRightLeft: 从右向左 rotateLeftRight：从左向右*/
  rotateState:string,
  /** 图形展示 chart: 图形 table: 表格*/
  showShape:string
}

class PanelGroup extends React.Component<PanelGroupProps, PanelGroupState> {
  // 声明Context对象属性
  static childContextTypes = {
    unfoldState: PropTypes.string,
    extraKeys: PropTypes.any
  }

  // 返回Context对象，方法名是约定好的
  getChildContext () {
    return {
      unfoldState: this.state.unfoldState,
      extraKeys:this.props.extraKeys
    }
  }

  constructor(props: PanelGroupProps) {
    super(props);
    this.state = {
      unfoldState:'open',
      rotateState:'',
      showShape:'chart'
    }
  }
  unfoldPanel = () => {
    const {unfoldState} = this.state;
    this.setState({
      unfoldState:unfoldState=='open'? 'closed':'open'
    })
  };
  chartHandle = () => {
    const {showShape} = this.state;
    this.setState({
      rotateState:showShape=='chart'? 'rotateLeftRight' : 'rotateRightLeft',
      showShape:showShape=='chart'? 'table':'chart'
    })
  };
  getItemUnfoldCondition = (item) => {
    let {extraKeys='all'} = this.props;
    const {unfoldState} = this.state;
    if(extraKeys === 'all' || extraKeys.indexOf(item.key)>-1){
      return unfoldState==='open'
    }else{
      return true;
    }
  };
  render() {
    const {
      style, className, headStyle, title,
      width, height, children
    } = this.props;
    const styleProps = {width, height, ...style};
    const { unfoldState, rotateState } = this.state;
    const cNames = classNames(styles.zetPanelGroup, className);
    return (
      <div className={`${cNames} ${styles[rotateState]}`} style={styleProps}>
        <div className={styles['zet-panel-group-title']} style={headStyle}>
          <span className={styles['zet-panel-group-title-name']} >{title}</span>
          <span className={styles['zet-panel-group-title-chart']} onClick={this.chartHandle}>图形</span>
          <span className={styles['zet-panel-group-title-table']} onClick={this.chartHandle}>表格</span>
          <span className={styles['zet-panel-group-title-extra']}>
            <span onClick={this.unfoldPanel}>{unfoldState=='open'? '关闭':'展开'}</span>
          </span>
        </div>
        <div className={styles['zet-panel-group-content']}>
          {React.Children.map(children,(item)=>{
            return item;
          })}
        </div>
      </div>
    )
  }
}


export default PanelGroup
