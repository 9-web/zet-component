import * as React from 'react';
import PropTypes from 'prop-types'

import styles from './index.less';

export interface PanelProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** panel 选项  panelGroup 操作子项是使用 */
  option?: string,
  /** 宽度 */
  width?: string | number,
  /** 是否在高度上自适应*/
  flex?:boolean,
  /** 高度 */
  height?: string | number,
}

export interface PanelState {

}

class Panel extends React.Component<PanelProps, PanelState> {
  static defaultProps = {
    width: '100%',
    onChange: () => {},
  }
  static contextTypes = {
    unfoldState: PropTypes.string,
    extraKeys:PropTypes.any,
  }
  constructor(props: PanelProps) {
    super(props);
    this.state = {}
  }
  getPanelUnfoldCondition = () => {
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
    if(!this.getPanelUnfoldCondition()){
      styleProps.height = 0;
      delete styleProps.flex;
    }
    return (
      <div className={styles['zet-panel']} style={styleProps}>
        {children}
     </div>
    )
  }
}

export default Panel
