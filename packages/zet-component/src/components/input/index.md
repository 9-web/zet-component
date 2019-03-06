---
title: Input
subtitle: 文本框
---

修改了antd input组件样式

## API

ZetInput的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
allowClear | 是否允许清除文本框的值 | Boolean | true
maxLength | 支持最大输入的文字数， 0代表不启用此属性 | Number | 0 
width | 设置input的宽度 | string/number | 280

注: ZetInput 其它特性继承 Antd Input 组件

#### ZetInput.Search

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
onChange | 文本框的值发生改变触发 | function(value) 
onSearch | 点击搜索或按下回车键时的回调 | function(value)
value | 输入框内容 | string  
allowClear | 是否允许清除文本框的值 | Boolean | true
width | 设置input的宽度 | string/number | 190

其余属性和 Input 一致。

#### ZetInput.Textarea<!--  -->

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
change | 文本框的值发生改变触发 | function(value) 
width | 设置Textarea的宽度 | string/number | 190
maxLength | 支持最大输入的文字数， 0代表不启用此属性 | Number | 0 

其余属性和 Textarea 一致。
