
import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge } from 'antd'

import { connect } from 'react-redux'

const mapState = state =>{
  const {
    list = []
  } = state.notifications
  return {
    list,
  }
}
@connect(mapState)
class Notifications extends Component {

    data = [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ];


    render() {
      console.log(this.props)
        return (
            <Card
                title="center"
                bordered={false}
                extra={<Button disabled={this.props.list.every(item=> item.hasRead ===true)}>Mark all as read</Button>}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                    <List.Item 
                      extra={ item.hasRead ? null:<Button>Mark as read</Button>}
                    >
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                        description={item.desc}
                        />
                    </List.Item>
                    )}
                />
            </Card>
        )
    }
}
export default Notifications