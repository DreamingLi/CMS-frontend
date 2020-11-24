
import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge,Spin } from 'antd'

import { connect } from 'react-redux'

import { markNotificationAsRead, markAllNotificationAsRead } from '../../actions/notifications'

const mapState = state =>{
  const {
    list = [],
    isLoading
  } = state.notifications
  return {
    list,
    isLoading
  }
}
@connect(mapState,{ markNotificationAsRead,markAllNotificationAsRead })
class Notifications extends Component {

    data = [];
    render() {
        return (
          <Spin spinning={this.props.isLoading}>
            <Card
                title="center"
                bordered={false}
                extra={<Button disabled={this.props.list.every(item=> item.hasRead ===true)}
                        onClick={this.props.markAllNotificationAsRead}
                >Mark all as read</Button>}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                    <List.Item 
                      extra={ item.hasRead ? null:<Button onClick={this.props.markNotificationAsRead.bind(this,item.id)}>Mark as read</Button>}
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
          </Spin>
        )
    }
}
export default Notifications