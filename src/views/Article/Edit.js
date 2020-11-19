import React, { Component } from 'react'
import {
    Card,
    Button
} from 'antd'

export default class Edit extends Component {
    render() {
        console.log(this.props)
        return (
            <Card
                title={this.props.location.state.text.title}
                bordered={false}
                extra={<Button>Cancel</Button>}
            >
            </Card>
        )
    }
}
