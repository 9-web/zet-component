import * as React from 'react';
import { Card,Tooltip,Icon,Menu,Anchor,Button} from 'antd';
import Group from './taskGroup';
import classNames from 'classnames'

import styles from './index.less';
import Panel from "@/automl/achievement/panel";

const MenuItem = Menu.Item;
const { Link } = Anchor;

interface JobInfo{
  jobStatus:string,
  jobId:string,
}
interface ModelItem{
  modelName:string,
  modelId: string,
  jobBlockStatus:number,
  score:number,
  modelTrainStatus:string,
}
export interface TaskProps {
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
  /** 任务信息 */
  jobInfo: JobInfo,
  modelList:ModelItem[],
  selectedTaskId:string,
  /** 选中方法 */
  selectedRow?: (job: object) => void,

}

export interface TaskState {
  selectedKeys:string[]
}

class Task extends React.Component<TaskProps, TaskState> {
  static Group: typeof Group;
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      selectedKeys:[]
    }
  }
  changeJob = (v)=>{
    this.props.selectedRow(v)
  }
  title = (v)=>{}
  delJob = (v)=>{}
  changeJobitem = (v)=>{}
  openModelDetail = (v1,v2,v3,v4)=>{}
  render() {
    const {title,jobInfo,modelList,selectedTaskId} = this.props;
    const taskClass = classNames(styles.zetTask,{[styles.selectedTitle]:selectedTaskId===jobInfo.jobId});
    return (
      <Card
        title={(
          <div className={styles.cardTitle} onClick={() => { this.changeJob(jobInfo); }}>
            <span className={styles.taskListTitle}>
              <span className={styles.taskListName} title={title}>
                <a onClick={() => { this.title(jobInfo); }} >{title}</a>
              </span>
              <span className={styles.cardTitleOptions}>
                {jobInfo.jobStatus === 'RUNNING' && <Icon type="loading" theme="outlined" />}
                <Tooltip title={'删除'}>
                  <Icon style={{ marginLeft: 35 }} type="delete" theme="outlined" onClick={(e) => { e.stopPropagation(); this.delJob(jobInfo.jobId); }} />
                </Tooltip>
              </span>
            </span>
          </div>
        )}
        style={{ width: 320 }}
        key={jobInfo.jobId}
        className={taskClass}
      >
        <Anchor
          affix={false}
          bounds={0}
          className={styles.taskAnchor}
          /*getContainer={
            () => document.getElementById('automlDetailRightList')
          }*/
        >
          <Menu
            style={{ border: 'none' }}
            selectedKeys={this.state.selectedKeys}
          >
            {
              modelList && modelList.map((item, i) => {
                return (
                  <MenuItem key={item.modelId} style={{ padding: '0 14px' }} onClick={() => { this.changeJob(jobInfo); this.changeJobitem(item); }}>
                    <Link
                      href={`#${item.modelId}`}
                      title={(
                        <div className={`${styles.linkWrap} ${(jobInfo.jobStatus === 'FAIL' && (item.modelTrainStatus !== 'SUCCESS')) ? styles.linkWraperr : ''}`}>
                          <div
                            title={item.modelName}
                            onClick={(e) => {this.openModelDetail(e, item.modelId, jobInfo.jobId, item.modelName);
                            }}
                            className={styles.shortName}
                          >
                            {item.modelName}
                          </div>
                          <div style={{ width: '110px' }}>
                              <span style={{ display: 'inline-block', width: '25px' }}>
                                { item.jobBlockStatus === 5 && <Icon type="loading" theme="outlined" /> }
                                { i === 0 && item.score && <Icon type='zeticon-trophy' style={{ fontSize: 16, color: 'rgb(25, 118, 210)' }} />}
                              </span>
                            <span>{item.score ? item.score : '--'}</span>
                          </div>
                          <div style={{ width: '80px', textAlign: 'right' }}>
                              <Button size='small'>对比</Button>
                          </div>
                        </div>
                      )}
                    />
                  </MenuItem>
                );
              })
            }
          </Menu>
        </Anchor>
      </Card>
    );
  }
}

export default Task
