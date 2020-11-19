import React, { Component } from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker
} from 'antd'






export default class Edit extends Component {
    
    formItemLayout = {
        labelCol:{
            span:4,
            offset:4
        },
        wrapperCol:{
            span:12
        }
    }

    onFinish = e =>{
        console.log(e)
    }
    onDateChange = (...args) =>{
        console.log(...args)
    }

    onDateOk = (...args) =>{
        console.log(...args)
    }
    render() {
        return (
            <Card
                title={this.props.location.state.text.title}
                bordered={false}
                extra={<Button>Cancel</Button>}
            >
                <Form
                    onFinish={this.onFinish}
                    labelCol={this.formItemLayout.labelCol}
                    wrapperCol={this.formItemLayout.wrapperCol}
                >
                    <Form.Item
                        label="Title"
                        name="Title"
                        rules={[{ required: true, message: 'Please input the Title!' },{min:4,message:'at least 4 letters'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Arthor"
                        name="Arthor"
                        rules={[{ required: true, message: 'Please input the Arthor' },{min:4,message:'at least 4 letters'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="Amount"
                        rules={[{ required: true, message: 'Please input the Amount!' },{min:4,message:'at least 4 letters'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="Date"
                        rules={[{ required: true, message: 'Please input the Amount!' }]}
                    >
                        <DatePicker showTime onChange={this.onDateChange} onOk={this.onDateOk} />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="Content"
                        rules={[{ required: true, message: 'Please input the Amount!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:12}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
