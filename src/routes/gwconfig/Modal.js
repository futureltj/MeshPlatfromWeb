import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal, Upload, Icon, message } from 'antd'
const FormItem = Form.Item
import styles from './List.less'
import { config } from 'utils'
const { api } = config
const { fileupload,filepath} = api
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
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
    onOk: handleOk
  }
  const handleChange = (info) => {
    console.log(info)
    if (info.file.status === 'done') {

        console.log(2)
        info.fileList.splice(0,info.fileList.length);
        info.fileList.push(info.file)
        info.fileList[0].name=info.file.response.msg
      // Get this url from response in real world.
      //getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
    if (info.file.status === 'removed') {
      info.fileList.splice(0,info.fileList.length);
    }
  }

  return (

    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="配置文件" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fileurl', {
            initialValue: item.fileurl,
            rules: [
              {
                required: true,
              },
            ],
          })(<Upload
            className={styles.avataruploader}
            name="avatar"
            showUploadList={true}
            action={fileupload}
            onChange={handleChange}
          >
            {
                <Icon type="plus" className={styles.avataruploadertrigger} />
            }
          </Upload>)}
        </FormItem>
      </Form>
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
