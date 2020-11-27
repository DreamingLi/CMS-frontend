import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar,Badge} from 'antd';
import { Link } from 'react-router-dom'
import { adminRoutes } from '../../routes'
import Logo from './logo192.png';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getNotificationList } from '../../actions/notifications.js'
import { logout } from '../../actions/user'

const { Header, Content, Sider } = Layout;

const mapState = state =>{
    return {
        notificationsCount: state.notifications.list.filter(
            item => item.hasRead === false
            ).length,
        avatar: state.user.avatar,
        displayName: state.user.displayName
        }

}

@withRouter
@connect(mapState,{ getNotificationList, logout} )
class Frame extends Component {

    componentDidMount(){
        this.props.getNotificationList()
    }

    onDropdownMenuClick = ({key}) =>{
        if (key === '/logout'){
            this.props.logout()
        }else{
            this.props.history.push(key)
        }

      }
    renderMenu = () =>(
        <Menu onClick={this.onDropdownMenuClick}>
          <Menu.Item key="/admin/notifications" >
            <Badge dot={Boolean(this.props.notificationsCount)}>
                Notifications
            </Badge>
          </Menu.Item>
          <Menu.Item key="/admin/settings">
                Settings
          </Menu.Item>
          <Menu.Item key="/logout">
                Exit
          </Menu.Item>
    
        </Menu>
      );


    
    render() {
        const seletedKeyArr = this.props.location.pathname.split('/')
        seletedKeyArr.length = 3
        return (
                <Layout style={{minHeight:'100%'}}>
                    <Header className="header" style={{backgroundColor: '#fff'}}>
                        <div className="logo-wrap">
                            <img id='logo' src={Logo} alt="logo" />
                        </div>
                        <div>
                            <Dropdown overlay={this.renderMenu}>
                                <Badge count={this.props.notificationsCount} offset={[5,-1]}>
                                    <div className="ant-dropdown-link" style={{alignItem:"center"}}>
                                        <Avatar src={this.props.avatar}>
                                            {this.props.displayName}
                                        </Avatar>
                                        &nbsp;&nbsp;Welcome! {this.props.displayName}
                                    </div>
                                </Badge>
                            </Dropdown>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                            mode="inline"
                            selectedKeys={seletedKeyArr.join('/')}
                            style={{ height: '100%', borderRight: 0 }}
                            >
                            {
                                adminRoutes.map(
                                
                                (item,key) => item.isNav? <Menu.Item key={item.pathname} icon={item.icon}><Link to={item.pathname} >{item.title}</Link></Menu.Item> : '')
                            }
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '16px'}}>
                            
                            <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                            }}
                            >
                            {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>   
        )
        
    }
}

export default Frame