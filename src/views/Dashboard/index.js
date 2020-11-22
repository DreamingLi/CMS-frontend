import React, { Component,createRef } from 'react'
import {
    Card,
    Row,
    Col
} from 'antd'
import echarts from 'echarts'
import { getArticleAmount }from '../../requests/index'

const style1 = {  height:'6rem',color:'#FFF', textAlign:'center', lineHeight:'6rem',background:'#ec1967',borderRadius:'1rem'};
const style2 = {  height:'6rem',color:'#FFF', textAlign:'center', lineHeight:'6rem',background:'#0092ff',borderRadius:'1rem'};
const style3 = {  height:'6rem',color:'#FFF', textAlign:'center', lineHeight:'6rem',background:'#35d633',borderRadius:'1rem'};
export default class Dashboard extends Component {
    constructor(){
        super()
        this.articleAmount = createRef()
    }
    initArticleChart = ()=>{
        this.articleChart = echarts.init(this.articleAmount.current)
        const key = []
        const data = []
        getArticleAmount().then(
            resp =>{
                resp.amount.map( item => {
                    key.push(item.month)
                    data.push(item.value)
                })
            }
        ).then(
            value => {
                const option = {
                title: {
                    text: 'Article amount'
                },
                tooltip: {},
                legend: {
                    data:['Amount']
                },
                xAxis: {
                    data: key
                },
                yAxis: {},
                series: [{
                    name: 'Amount',
                    type: 'bar',
                    data: data
                }]
            };
            this.articleChart.setOption(option)   
            })

    }
    componentDidMount(){
        this.initArticleChart()
    }
    render() {
        return (
            <div>
                <Card title="Dashboard" bordered={false}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div style={style1}>Data</div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div style={style2}>Data</div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div style={style3}>Data</div>
                        </Col>
                    </Row>

                </Card>
                <Card title="Recent view" bordered={false}>
                    <div ref={this.articleAmount} style={{height:'20rem'}}/>
                </Card>
            </div>
        )
    }
}
