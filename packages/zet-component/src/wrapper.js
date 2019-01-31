"use strict";
/**
 *  文档页容器, 这里可以引入一些全局样式或者 js
 */
import * as React from 'react';
import '!style-loader!css-loader!antd/dist/antd.css';

export default function({ children }) {
  return <div>{children}</div>;
}
