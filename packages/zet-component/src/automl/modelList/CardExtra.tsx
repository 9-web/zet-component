import React from 'react';
import { LocaleReceiverHoc } from "../../utils/hoc";

function CardExtra(props) {
  const intl = props.intl;
  return (
    <span>
      <a
        onClick={() => {
          props.forecast(props.modelId);
        }}
      >
        {intl.predict || "预测"}
      </a>
      <span> | </span>
      <a
        onClick={() => {
          props.openModelDetail();
        }}
      >
        {intl.view || "查看"}
      </a>
      <span> | </span>
      <a
        onClick={() => {
          props.view(props.id);
        }}
      >
        {intl.log || "日志"}
      </a>
    </span>
  );
}

export default LocaleReceiverHoc('AutoML')(CardExtra);
