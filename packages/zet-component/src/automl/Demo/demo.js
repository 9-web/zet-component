import React from 'react';
import {AutoML} from '../../index.tsx'
import autoChartData from '../modelChart/_mock/autoChart';
import jobData from '../modelChart/_mock/jobData';
import modelList from '../modelList/_mock/modellist'
class Demo01 extends React.Component{
  constructor(props){
    super(props);
    this.state = { show:'chart'}
  }

  changeHandle = (option, record) => {
    console.log('oprion',option,record)
    if (option == 'rotate') {
      this.setState({
        show: record.type,
      })
    }
  }
  render(){
    const {Layout,Achievement,Task,Chart,ModelList} = AutoML;
    const { Sider, Content } = Layout;
    const { Panel } = Achievement;
    const {show} = this.state;
    return (
      <Layout>
        <Sider>
          <div
            style={{
              backgroundColor: 'aquamarine',
              height: 30,
              marginBottom: 20,
            }}
          />
          <Task
            title={'test01'}
            jobInfo={{ jobId: '123', jobStatus: 'RUNNING' }}
            modelList={[
              {
                modelName: 'test01',
                modelId: '1234',
                jobBlockStatus: 5,
                score: 0.8,
                modelTrainStatus: 'success',
              },
              {
                modelName: 'test02',
                modelId: '12345',
                jobBlockStatus: 5,
                score: 0.8,
                modelTrainStatus: 'success',
              },
            ]}
          />
        </Sider>
        <Content>
          <Achievement
            title="Test"
            style={{ height: 500 }}
            onChange={this.changeHandle}
          >
            <Panel option="1" height={300}>
              <Chart
                data={autoChartData}
                gradeData={jobData}
                legendScore={{
                  XGBoost: { score: '0.9101' },
                  随机森林: { score: '0.8962' },
                  梯度渐进树: { score: '0.8850' },
                }}
              />
            </Panel>
            <Panel option="2" flex>
              <ModelList
                data={modelList}
                contentType={show==='chart'? 'list':'detail'}
                jobData={jobData}
                jobId={'6f30f8b4-90d7-49be-abb9-bd57abdbb5b6'}
              />
            </Panel>
          </Achievement>
        </Content>
      </Layout>
    )
  }
}
export default Demo01;
