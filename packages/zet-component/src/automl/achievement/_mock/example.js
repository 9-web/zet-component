import { Spin, Icon } from 'antd';
import styles from './index.less'
export function Example1(){
  return (
    <div className={styles.example}>
      <Spin></Spin>
    </div>
  )
}


export function Example2(){
  return (
    <div className={styles.example}>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} ></Spin>
    </div>
  )
}
