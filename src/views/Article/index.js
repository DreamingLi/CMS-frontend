import React, { Component } from 'react'
import { Card,
  Button,
  Table,
  Tag,
  message,
  Modal,
  Tooltip
} from 'antd'
import moment from 'moment'
import {getArticles,deleteArticleByID} from '../../requests/'
import XLSX from 'xlsx'


const ButtonGroup = Button.Group


const titleDisplayMap ={
  id:'ID',
  title:'TITLE',
  author:'AUTHOR',
  createAt:'CREATEAT',
  amount:'AMOUNT'
}

export default class ArticleList extends Component {
  constructor(){
    super()
    this.state = {
      dataSource : [],
      columns : [],
      total:0,
      offset: 0,
      limited: 10,
      deleteArticleTitle:null,
      isShowArticleModal:false,
      deleteArticleConfirmLoading:false,
      deleteArticleID: null,
      currentPage:1
    }
  }

  createColumns = columnKeys => {
    const columns = columnKeys.map((item,key)=>{
    if (item === 'amount'){
      return {
        title: titleDisplayMap[item],
        key: key,
        render: (text,row,index) =>{
          const { amount } = row
        return (
          <Tooltip title={amount > 200 ? 'above 200' : 'below 200'}>
            <Tag color={ amount > 200 ? 'red':'green'}>{amount}</Tag>
          </Tooltip>
          )
        }
      }
    }
    if (item === 'createAt'){
      return {
        title: titleDisplayMap[item],
        key: key,
        render: (text,row,index) =>{
          const { createAt } = row
        return moment(createAt).format('YYYY/MM/DD HH:mm:ss')
        }
      }
    }
    return {
      title: titleDisplayMap[item],
      dataIndex: item,
      key: key,
    }
  })

  columns.push({
    title:'OPERATION',
    key: 'action', 
    render: (text) =>{
      return <ButtonGroup>
        <Button size='small' onClick={this.toEdit.bind(this, text)} >Edit</Button>&nbsp;
        <Button size='small' onClick={this.showDeleteArticle.bind(this,text)} danger>Delete</Button>
      </ButtonGroup>
    }
  })
  return columns
}
  toEdit = text =>{
    this.props.history.push({
      pathname:`/admin/article/edit/${text.id}`,
      state:{text}
    })
  }

  showDeleteArticle = (text) =>{
    // Modal.confirm({
    //   title: <Text type='danger'>Confirm</Text>,
    //   content: `Are you sure to delete ${text.title}`,
    //   okText: 'Confirm',
    //   onOk(){deleteArticle().then(resp=> {console.log(resp)})}
    // })
    this.setState({
      isShowArticleModal:true,
      deleteArticleTitle: text.title,
      deleteArticleID: text.id
    })
  }

  
  deleteArticle = () => {
    console.log(this.state.deleteArticleID)
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticleByID(this.state.deleteArticleID).then(
      resp =>{
        this.setState({
          deleteArticleConfirmLoading:false,
          isShowArticleModal:false,
          offset:0,
          currentPage:1
        },()=>{
          this.getData()
          message.success(resp.msg)
          
        })
      }
    ).catch(
      err =>{
        message.error(err) 
        this.setState({
          deleteArticleConfirmLoading:false,
          isShowArticleModal:false
        })
      }
    )
  }

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal:false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false
    })
  }
  getData = () =>{
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset,this.state.limited).then(resp =>{
      const columnKeys = Object.keys(resp.list[0])
      const columns = this.createColumns(columnKeys)
      this.setState({
        total:resp.total,
        columns,
        dataSource: resp.list,
        isLoading:false
      })
    }).catch(
      err =>{
        message.error("Failed to get lists")
        this.setState({
          isLoading:false
        })
      }
    )
  }

  // Due to the backend is a mock sever, so it could not process pagination funciton, if it could, the data we get would be
  // a part of the data, not all of them.

  onPageChange = (page,pageSize) => {
    this.setState({
      offset: pageSize * (page -1),
      limited: pageSize,
      currentPage:page
    },
      ()=>{
        this.getData()
      }
    )
  }

  // onShowSizeChange = (current,size) =>{
  //   this.setState({
  //     offset: 0,
  //     limited: size
  //   },
  //   () =>{
  //     this.getData()
  //   })
  // }
  handleReload = () =>{
    this.getData()
  }

  toExcel = () =>{
    const data = [Object.keys(this.state.dataSource[0])]
    for(let i in this.state.dataSource){
      data.push(
        [
          this.state.dataSource[i].id,
          this.state.dataSource[i].title,
          this.state.dataSource[i].author,
          this.state.dataSource[i].amount,
          moment(this.state.dataSource[i].createAt).format('YYYY-MM-DD hh:mm:ss')
        ]
      )
    }

    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'SheetJS');
    XLSX.writeFile(wb,`articles-${moment().format('YYYY-MM-DD')}.xlsx`)
  }
  componentDidMount(){
    this.getData()
  }
    render() {
        return (
            <Card title="Article List" 
            bordered={false}
            extra={<ButtonGroup><Button onClick={this.toExcel}>Export EXCEL</Button><Button onClick={this.handleReload}>RELOAD</Button></ButtonGroup>}
            >
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pagination={{
                      total:this.state.total,
                      showQuickJumper:true,
                      showSizeChanger:true,
                      onChange:this.onPageChange,
                      // onShowSizeChange: this.onShowSizeChange,
                      pageSizeOptions: ['10','15','20','25','30'],
                      // pageSize: this.state.limited
                      current:this.state.currentPage
                    }}
                    loading={this.state.isLoading}  
           
                />
                    <Modal
                      title="Confirm"

                      visible={this.state.isShowArticleModal}
                      onOk={this.deleteArticle}
                      onCancel={this.hideDeleteModal}
                      okText="Confirm"
                      cancelText="Cancel"
                      confirmLoading={this.state.deleteArticleConfirmLoading}
                    >
                      <p>{this.state.deleteArticleTitle}</p>

                    </Modal>
            </Card>
        )
    }
}
