import * as React from 'react';
import classnames from 'classnames';

import styles from './index.less';

export interface taskGroupProps {
  /** 组件行行内样式 */

}

export interface taskGroupState {
  selectedTaskId:string
}

class taskGroup extends React.Component<taskGroupProps, taskGroupState> {
  constructor(props: taskGroupProps) {
    super(props);
    this.state = {
      selectedTaskId:''
    }
  }
  selectedRow = (record)=>{
    console.log('record',record);
    this.setState({
      selectedTaskId:record.jobId
    })
  }
  render() {
    const { children,...otherProps } = this.props;
    const { selectedTaskId } = this.state;
    const extendProps = {...otherProps,selectedRow:this.selectedRow,selectedTaskId}
    const kids = React.Children.map(children, child =>{
      if( typeof child !== 'string' && typeof child !== 'number'){
        return React.cloneElement(child,extendProps)
      }
      return child
    })
    return (
      <div className={styles.zetTaskGroup}>
        {kids}
      </div>
    );
  }
}

export default taskGroup
