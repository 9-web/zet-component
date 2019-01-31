import * as React from 'react';
import Group from './panelGroup'
import PropTypes from 'prop-types'

import styles from './index.less';

export interface AchievementProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** key */
  option?: string,
  /** 宽度 */
  width?: string | number,
  /** 自适应*/
  flex?:boolean,
  /** 高度 */
  height?: string | number,
  /** 资源改变触发的回调 */
  onChange?: (e: React.MouseEvent<any>) => void,
}

export interface AchievementState {

}

class Achievement extends React.Component<AchievementProps, AchievementState> {
  static Group: typeof Group;
  static defaultProps = {
    width: '100%',
    onChange: () => {},
  }
  static contextTypes = {
    unfoldState: PropTypes.string,
    extraKeys:PropTypes.any,
  }
  constructor(props: AchievementProps) {
    super(props);
    this.state = {}
  }
  getItemUnfoldCondition = () => {
    const {unfoldState,extraKeys} = this.context;
    const {option} = this.props;
    if(extraKeys === 'all' || extraKeys.indexOf(option)>-1){
      return unfoldState==='open'
    }else{
      return true;
    }
  };
  render() {
    const { style, width, height ,children} = this.props;
    const styleProps = {width, height, ...style};
    if(this.props.flex){
      styleProps.flex = 1;
    }
    if(!this.getItemUnfoldCondition()){
      styleProps.height = 0;
      delete styleProps.flex;
    }
    return (
      <div className={styles.zetAchievement} style={styleProps}>
        <div className={styles['zet-achievement-content']}>
          {children}
        </div>
     </div>
    )
  }
}

export default Achievement
