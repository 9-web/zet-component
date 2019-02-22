import * as React from 'react';
import classnames from 'classnames';
import ZetInput from '../../components/ZetInput'
import styles from './index.less';

const {ZetSearch} = ZetInput;

export interface taskGroupProps {
  /** 组件行行内样式 */
  changeJob?:(record:object)=>void,
  delJob?:(jobId:string)=>void,
  onSearch?:(keywords:string)=>void,
}

export interface taskGroupState {
  selectedTaskId:string,
  selectedModelKeys:string[],
}

class taskGroup extends React.Component<taskGroupProps, taskGroupState> {
  constructor(props: taskGroupProps) {
    super(props);
    this.state = {
      selectedTaskId:'',
      selectedModelKeys:[]
    }
  }
  selectedRow = (record)=>{
    this.setState({
      selectedTaskId:record.jobId
    })
    this.props.changeJob(record)
  }
  setSelectedModelKeys = (selectedModelKeys) => {
    this.setState({
      selectedModelKeys:selectedModelKeys
    })
  };
  instertSelectedRow = (child, extendProps) => {
    if(typeof child === 'object'){
      return React.cloneElement(child,extendProps)
    }
    return child
  };
  search = (keywords) => {
    this.props.onSearch(keywords)
  };
  render() {
    const { children,...otherProps } = this.props;
    const { selectedTaskId,selectedModelKeys } = this.state;
    const extendProps = {
      ...otherProps,
      selectedRow:this.selectedRow,
      selectedTaskId,
      setSelectedModelKeys:this.setSelectedModelKeys,
      selectedModelKeys:selectedModelKeys
    }
    const kids = React.Children.map(children, child =>{
      return this.instertSelectedRow(child as React.ReactChild,extendProps)
    })
    return (
      <div className={styles.zetTaskGroup}>
        <ZetSearch
          style={{ width: 320,marginBottom:10 }}
          onChange={this.search}
          onSearch={this.search}
        />
        <div className={styles.zetTaskList}>
          {kids}
        </div>
      </div>
    );
  }
}

export default taskGroup
