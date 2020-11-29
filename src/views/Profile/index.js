import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Card , Upload, Button, Spin} from 'antd'
import { changeAvatar } from '../../actions/user'

@connect(
    state => ({
        avatarurl: state.user.avatar
    }),
    {changeAvatar}
)
class Profile extends Component {
    state = {
        isUploading: false,
        avatarurl: ''
    }
    handleUploadAvatar = (args) => {
        console.log(args)
        const data = new FormData()
        data.append('Token','2a445dcbb3c5976dd7459a3bd1b7e84c77fea617:Oi5vG3JXBDhzuPiNAn-BeGrTdr4=:eyJkZWFkbGluZSI6MTYwNjY5MTI3MCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzMwMzAzIiwiYWlkIjoiMTczMjg3NiIsImZyb20iOiJmaWxlIn0=')
        data.append('file',args.file)
        this.setState({
            isUploading: true
        })
        axios.post("http://up.imgapi.com/",data).then(
            resp => {
                console.log(resp)
                if ( resp.status === 200){

                    this.setState({
                        // avatarurl: resp.data.linkurl,
                        isUploading: false
                    })
                    this.props.changeAvatar(resp.data.linkurl)
                }
            }
        ).catch(
            error => {
                console.log('error handle for uploading img')
            }
        )
    }
    render() {
        return (
            <Card
                title="Personal Setting"
                bordered={false}
            >
                <Upload
                    customRequest={this.handleUploadAvatar}
                    showUploadList={false}

                >
                    <Spin spinning={this.state.isUploading}>
                        
                        {
                           this.props.avatarurl ? <img src={this.props.avatarurl} alt="avatar" /> : null
                        }
                        <br></br>
                        <Button type="primary">
                            UPLOAD
                        </Button>

                    </Spin>
                </Upload>
            </Card>
        )
    }
}
export default Profile