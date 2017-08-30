import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Button,Row,Col } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import styles from './List.less'
import { config } from 'utils'
const { api } = config
const { fileupload,filepath} = api
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
    const handleFileClick = (record, e) => {
      let str = filepath+'/'+record.fileurl.file.name
      console.log(str)
      window.open(str,'_blank')
    }

  const columns = [
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code'
    },{
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '文件',
      key: 'fileurl.file.name',
      render: (text, record) => {
        return <Button icon="download" onClick={e => handleFileClick(record, e)} >下载</Button>
      },
    },{
          title: '操作',
            key: 'operation',
          width: 100,
          render: (text, record) => {
          let arr = new Array();
          arr.push({ key: '1', name: '修改' });
          arr.push({ key: '2', name: '删除' });
          //if(record.parentid!=0)
          //arr.push({ key: '4', name: '上级' });

          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={arr} />
        },
      },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
