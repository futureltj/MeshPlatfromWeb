import React from 'react';
import ReactEcharts from 'echarts-for-react';
import mqtt from 'mqtt'
let mqttclient=null
let xdata = []
let ydata = []
const ElecTimerChart = React.createClass({
  propTypes: {
  },
  getInitialState: function() {
    return {option: this.getOption()};
  },
  setNewData: function(message) {
    console.log('setNewData:'+message)
    let maxlength=this.props.maxlength
    if(ydata.length>maxlength){
      xdata.shift()
      ydata.shift()
    }
    xdata.push(JSON.parse(message).time)
    ydata.push(JSON.parse(message).value)
    let option = this.state.option;
    option.xAxis.data=xdata
    option.series[0].data=ydata
    console.log(option.series[0].data)
    this.setState({option: option});
  },
  componentDidMount: function() {
    if(mqttclient==null) {
      let setNewDataFunc=this.setNewData;
      let topic = this.props.topic
      let mqttserver=this.props.mqttserver
      mqttclient = mqtt.connect(mqttserver)
      mqttclient.on('connect', function () {
        console.log('mqtt connection....')
        mqttclient.subscribe(topic)
      })
      mqttclient.on('message', function (topic, message) {
        console.log(message)
        setNewDataFunc(message)
      })
    }
  },
  componentWillUnmount: function() {
    if(mqttclient!=null){
      console.log('mqtt disconnection....')
      mqttclient.unsubscribe('antd')
      mqttclient.end()
      mqttclient=null
      xdata=[]
      ydata=[]
    }
    console.log(mqttclient)
  },
  getOption: function() {
    const option = {
      title: {
        text: '动态数据 + 时间坐标轴'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params;
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: false
        },
        data: xdata
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: ydata
      }]
    };

    return option;
  },
  render: function() {
    let code = "<ReactEcharts ref='echartsInstance' \n" +
      "    option={this.state.option} />\n";
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts ref='echarts_react'
                        option={this.state.option}
                        style={{height: 400}} />

        </div>
      </div>
    );
  }
});

export default ElecTimerChart;
