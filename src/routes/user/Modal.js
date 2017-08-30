import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Tabs,Select,TreeSelect  } from 'antd'
const FormItem = Form.Item
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {'username':'','attrs':{'phone':'','address':''}},
  rolelist=[],
  deptree=[],
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  let roleindex=0
  const children = [];
  for (let i = 0; i < rolelist.length; i++) {
    children.push(<Option key={rolelist[i].id}>{rolelist[i].name}</Option>);
    if(rolelist[i].id===item.roleid)
      roleindex=i
  }
  if(item.attrs===undefined){
    item.attrs={}
  }
  console.log(roleindex)
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="基本信息" key="1">
          <Form layout="horizontal">
            <FormItem label="编码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('usercode', {
                initialValue: item.usercode,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="姓名" hasFeedback {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: item.username,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="密码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: item.password,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="角色" hasFeedback {...formItemLayout}>
              {getFieldDecorator('roleid', {
                initialValue: item.rolename,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Select selectedIndex={roleindex} >
                {children}
              </Select >)}
            </FormItem>
            <FormItem label="部门" hasFeedback {...formItemLayout}>
              {getFieldDecorator('depid', {
                initialValue: item.depid,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TreeSelect
                style={{ width: 300 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={deptree}
                placeholder="请选择"
                treeDefaultExpandAll
              />)}
            </FormItem>
          </Form>
        </TabPane>
        <TabPane tab="详细信息" key="2">
          <Form layout="horizontal">
            <FormItem label="电话" hasFeedback {...formItemLayout}>
              {getFieldDecorator('attrs.phone', {
                initialValue: item.attrs.phone,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('attrs.address', {
                initialValue: item.attrs.address,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
