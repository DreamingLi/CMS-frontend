import React, { Component } from 'react'
import { Layout, Menu} from 'antd';
import { Link } from 'react-router-dom'
import { adminRoutes } from '../../routes'
import Logo from './logo192.png';
import { withRouter } from 'react-router-dom'
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {

    render() {
        const seletedKeyArr = this.props.location.pathname.split('/')
        seletedKeyArr.length = 3
        return (
                <Layout style={{minHeight:'100%'}}>
                    <Header className="header" style={{backgroundColor: '#fff'}}>
                        <div className="logo-wrap">
                            <img id='logo' src={Logo} alt="logo" />
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
                                (item,key) => <Menu.Item key={item.pathname} icon={item.icon}><Link to={item.pathname} >{item.title}</Link></Menu.Item>
                                )
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