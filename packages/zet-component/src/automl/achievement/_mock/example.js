import React from 'react';
import { Spin, Icon } from 'antd';
import styles from './index.less'
export function Example1(props){
  const {style} = props;
  return (
    <div className={styles.example} style={style}>
      <Spin></Spin>
    </div>
  )
}


export function Example2(props){
  const {style} = props;
  return (
    <div className={styles.example} style={style}>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} ></Spin>
    </div>
  )
}
