import React from 'react';
import classnames from 'classnames';
import ModuleListItem from './modelItem';
import ModelDetail from './modelDetail'

import styles from './index.less';

export interface ModelListProps {
  /** 组件行行内样式 */
  data:any,
  contentType:string,
  jobData?:any,
  jobId?:string
}

export interface ModelListState {

}

class ModelList extends React.Component<ModelListProps, ModelListState> {
  constructor(props: ModelListProps) {
    super(props);
    this.state = {}
  }
  sort=() => {
    const { data } = this.props;
    const arr = data.filter(v => [5, 7, 8].indexOf(v.status) !== -1);
    console.log('arr',arr)
    return arr;
  }
  getContent = () => {
    const { contentType }= this.props;
    if(contentType === 'list'){
        return (
          <div className={styles.mudoleList}>
            <div className={styles.listWrap}>
              {
                this.sort().length > 0 && this.sort().map((v) => {
                  if (v.mouduleName) {
                    return (
                      <ModuleListItem data={v} />
                    );
                  }
                  return '';
                })
              }
            </div>
          </div>
        )
      }else{
        const { jobData, jobId } = this.props;
        return (
          <div className={styles.mdlMain}>
            {jobData.map((item,index)=>{
              return <ModelDetail item={item} jobId={jobId} key={index}></ModelDetail>
            })}
          </div>
        )
      }
  };
  render() {
    return (
      <div>
        {this.getContent()}
      </div>

    );
  }
}

export default ModelList
