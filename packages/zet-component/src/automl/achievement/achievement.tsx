import * as React from 'react';
import classNames from 'classnames';
import {Icon} from 'antd';
import Panel from './panel'
import { AchieveContext } from './context'
import styles from './index.less';

interface AchievementProps {
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
  /** 收缩 展开按钮 默认为true 不需要显示是 需设置 extra={false} */
  extra?: boolean,
  /** 扩展操作的key  all：ß全部  */
  extraKeys?: string | Array<string>,
  /** 资源改变触发的回调 */
  onChange?: (option:string,state:object) => void,
}

interface AchievementState {
  /** 展开 关闭操作 open：展开  closed：关闭*/
  unfoldState:string,
  /** 旋转按钮 rotateRightLeft: 从右向左 rotateLeftRight：从左向右*/
  rotateState:string,
  /** 图形展示 chart: 图形 table: 表格*/
  type:string
}

class Achievement extends React.Component<AchievementProps, AchievementState> {
  static Panel: typeof Panel;
  static defaultProps = {
    extra:true,
    extraKeys:'all'
  }
  constructor(props: AchievementProps) {
    super(props);
    this.state = {
      unfoldState:'open',
      rotateState:'',
      type:'chart'
    }
  }
  unfoldPanel = () => {
    const {unfoldState} = this.state;
    const { onChange } = this.props;
    const currentUnfoldState = unfoldState=='open'? 'closed':'open';
    this.setState({
      unfoldState:currentUnfoldState
    },()=>{
      onChange('unfold',{...this.state})
    })
  };
  chartHandle = (e,type) => {
    e.stopPropagation();
    if(!type) return;
    const { onChange } = this.props;
    this.setState({
      rotateState:type=='chart'? 'rotateLeftRight' : 'rotateRightLeft',
      type:type
    },()=>{
      onChange('rotate',{...this.state})
    })
  };
  render() {
    const {
      style, className, headStyle, title,
      width, height, children, extra
    } = this.props;
    const styleProps = {width, height, ...style};
    const { unfoldState, rotateState, type } = this.state;
    const cNames = classNames(styles.zetAchievement, className);
    return (
      <AchieveContext.Provider value={{unfoldState: this.state.unfoldState, extraKeys:this.props.extraKeys}}>
        <div className={`${cNames} ${styles[rotateState]}`} style={styleProps}>
          <div  className={styles['zet-achievement-title']} style={headStyle}>
            <span className={styles['zet-achievement-title-name']} >{title}</span>
            <span className={styles['zet-achievement-title-option']} onClick={(e)=>{this.chartHandle(e,'')}} >
              <span className={`${styles['zet-achievement-title-chart']} ${type=='chart' && styles['zet-achievement-title-checked']}`}
                    onClick={(e)=>{this.chartHandle(e,'chart')}}><Icon type="line-chart" /></span>
              <span className={`${styles['zet-achievement-title-table']} ${type=='table' && styles['zet-achievement-title-checked']}`}
                    onClick={(e)=>{this.chartHandle(e,'table')}}><Icon type="table" /></span>
            </span>

            {
              extra!==false &&  <span className={styles['zet-achievement-title-extra']} onClick={this.unfoldPanel}>
                <span >{unfoldState=='open'? '关闭':'展开'}</span>
              </span>
            }
          </div>
          <div className={styles['zet-achievement-content']}>
            {React.Children.map(children,(item)=>{
              return item;
            })}
          </div>
        </div>
      </AchieveContext.Provider>
    )
  }
}


export default Achievement
