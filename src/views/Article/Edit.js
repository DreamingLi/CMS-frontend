import React, { Component,createRef } from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker,
    Spin
} from 'antd'

import Editor from 'wangeditor'
import { getArticleById, saveArticle } from '../../requests/index'
import moment from 'moment'

export default class Edit extends Component {
    constructor(){
        super()
        this.editorRef = createRef()
        this.formRef = createRef()
        this.state = {
            spin: false
        }
    }
    formItemLayout = {
        labelCol:{
            span:4,
        },
        wrapperCol:{
            span:12
        }
    }
    initEditor = () =>{
        this.editor = new Editor(this.editorRef.current)
    
        this.editor.config.onchange = newHtml => {
            this.formRef.current.setFieldsValue({
                content:newHtml
            })
        }
        this.editor.create()
    }

    componentDidMount(){
        this.initEditor()
        this.setState({
            spin:true
        })
        getArticleById(this.props.match.params.id).then(
            resp => {
                this.formRef.current.setFieldsValue({
                    title:resp.title,
                    author: resp.author,
                    amount: resp.amount,
                    createAt: moment(resp.createAt),
                })
                this.editor.txt.html( resp.content)
            }
        ).finally(
            ()=>{
                this.setState({
                    spin:false
                })
            }
        ) 
    }

    onFinish = e =>{
        this.setState({
            spin:true
        })
        const data = Object.assign({},e,{
            createAt : e.createAt.valueOf()
        })
        saveArticle(this.props.match.params.id,data).then(
            resp =>{
                console.log(resp)
                
            }
        ).catch(
            err =>{
                console.log(err)
            }
        ).finally(
            () =>{
                this.setState({
                    spin:false
                })
            }
        )
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
                extra={<Button onClick={this.props.history.goBack}>Cancel</Button>}
            >
                <Spin spinning={this.state.spin}>
                    <Form
                        onFinish={this.onFinish}
                        labelCol={this.formItemLayout.labelCol}
                        wrapperCol={this.formItemLayout.wrapperCol}
                        ref={this.formRef}           
                    >
                        <Form.Item

                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input the Title!' },{min:4,message:'at least 4 letters'}]}
                        >
                            
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please input the Arthor' },{min:4,message:'at least 4 letters'}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Please input the Amount!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Date"
                            name="createAt"
                            rules={[{ required: true, message: 'Please input the Amount!' }]}
                        >
                            <DatePicker showTime onChange={this.onDateChange} onOk={this.onDateOk} />
                        </Form.Item>

                        <Form.Item
                            label="content"
                            name="content"
                        >
                            <div className='qs-editor' ref={this.editorRef}></div>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset:8}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}
