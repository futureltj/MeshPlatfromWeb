import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { color } from 'utils'
import { NumberCard, DynamicChartComponent,ElecTimerChart,FactoryMap} from './components'
import ReactEcharts from 'echarts-for-react';

import styles from './index.less'
const bodyStyle = {
  bodyStyle: {
    height: 432,
    backgroundColor:'#FFF'
  },
}

function Home ({ home }) {
  let { streamdata} = home
  /*
  const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>))
*/

  let options =  {
      title: {
        text: '动态数据 + 时间坐标轴'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          console.log(params);
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: streamdata
      }]
    }

  return (
    /*
    <Row gutter={24}>
      {numberCards}
      <Col lg={18} md={24}>
        <Card bordered={false}
          bodyStyle={{
            padding: '24px 36px 24px 0',
          }}
        >
          <Sales data={sales} />
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false}
              className={styles.weather}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.blue,
              }}
            >
              <Weather {...weather} />
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card bordered={false}
              className={styles.quote}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.peach,
              }}
            >
              <Quote {...quote} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <RecentSales data={recentSales} />
        </Card>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Comments data={comments} />
        </Card>
      </Col>
      <Col lg={24} md={24}>
        <Card bordered={false}
          bodyStyle={{
            padding: '24px 36px 24px 0',
          }}
        >
          <Completed data={completed} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Browser data={browser} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Cpu {...cpu} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
          <User {...user} />
        </Card>
      </Col>
    </Row>


     <Map>
     <layer.Tile>
     <source.OSM />
     </layer.Tile>
     <layer.Vector>
     <source.Vector>
     <Feature style={{stroke: {color: [255, 0, 0, 1]}}}>
     <geom.LineString>
     {[[0, 0], [100000, 0], [100000, 100000], [0, 100000]]}
     </geom.LineString>
     </Feature>
     </source.Vector>
     </layer.Vector>
     </Map>


    */

    <Row gutter={24}>
      <Col lg={18} md={24}>
        <Card bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
        >
            a1
        </Card>
        <Card bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
        >
            a2
        </Card>
      </Col>

      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false}
                  className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 248,
                    background: color.blue,
                  }}
            >
              a4
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card bordered={false}
                  className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 248,
                    background: color.peach,
                  }}
            >
              a3
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
          a4

        </Card>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>


          <ElecTimerChart topic="antd" maxlength="10" mqttserver="ws://artadv.cn:8083/mqtt" />
        </Card>
      </Col>
      <Col lg={24} md={24}>
        <Card bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
        >
          <FactoryMap/>
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          a7
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          a8
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
          a9
        </Card>
      </Col>
    </Row>

  )
}

Home.propTypes = {
  home: PropTypes.object,
}

export default connect(({ home }) => ({ home }))(Home)
