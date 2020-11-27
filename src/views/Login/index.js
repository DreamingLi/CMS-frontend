import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { connect } from 'react-redux'
import { login } from '../../actions/user'
import { Redirect } from 'react-router-dom';

import './login.css'


@connect(
    state => {
        return {
        isLogin: state.user.isLogin,
        isLoading: state.user.isLoading
    }},
    { 
        login
    }
)
class Login extends Component {

    onFinish = args => {
        this.props.login(args)
    }

    render() {

        return (
            this.props.isLogin ? 
            <Redirect to='/admin' /> 
            :
            <div className="login-wrap">
                <Card
                    title="ADMIN"
                    className="login-card"
                >
                <Form          
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled={this.props.isLoading}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password disabled={this.props.isLoading}/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
        )
    }
}

export default Login