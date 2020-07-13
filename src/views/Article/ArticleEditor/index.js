import React from 'react'
import { Form,Input,Button,message } from 'antd'
import SimpleMDE from "react-simplemde-editor";
import {addArticle,getActicleDetail,updateActicle} from '@/api/acticle'
import showdown from 'showdown'
import { getQueryObj } from '@/utils'
import "easymde/dist/easymde.min.css";
import './index.scss'
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18, offset: 1 },
  };

const { TextArea } = Input
class ArticleAdd extends React.Component  {
    constructor() {
        super()
        this.state = {
            textValue: 23,
            main_content:'',
            ins:null,
        }
    }
    componentDidMount() {
        this.getEditorData()
    }
    render() {
        const toolbar = [
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'code',
            'table',
            'horizontal-rule',
            'unordered-list',
            'ordered-list',
            '|',
            'link',
            'image',
            '|',
            'side-by-side',
            'fullscreen',
        ]
        const { getFieldDecorator } = this.props.form
        return <div className="wrapper form-content">
            <Form {...formTailLayout}  size="middle">
                <Form.Item name="act_title" label="文章标题">
                    {
                        getFieldDecorator('act_title',{
                            rules: [
                                { required: true, message:'请填写标题' }
                            ]
                        })(
                            <Input></Input>
                        )
                    }
                </Form.Item>
                <Form.Item name="main_content" label="文章梗概">
                    {
                        getFieldDecorator('main_content',{
                            rules: [
                                { required: true, message:'请填写梗概' }
                            ]
                        })(
                            <TextArea rows={4}></TextArea>
                        )
                    }
                </Form.Item>

                <Form.Item name="act_detail" label="文章内容">
                {
                        getFieldDecorator('act_detail',{
                            rules: [
                                { required: true, message:'请填写文章内容' }
                            ]
                        })(
                            <SimpleMDE
                                id="your-custom-id"
                                getMdeInstance= { this.getInsance }
                                onChange={this.handleChange}
                                toolbar={toolbar}
                                options={{
                                    toolbar
                                }}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button className="m-right20" onClick={this.save} type="primary" htmlType="submit" >保存</Button>
                    <Button onClick={this.back} type="primary" htmlType="submit" >返回</Button>
                </Form.Item>
            </Form>
        </div>
    }
    back = () => {
        this.props.history.goBack()
    }
    save = () => {
        const query = getQueryObj(this.props.location.search)
        const { isEdit,id } = query
        this.props.form.validateFields().then(res=>{
            // const converter = new showdown.Converter()
            const act_detail = res.act_detail
            isEdit ? 
            this.updateActicle({...res,act_detail,id}) : 
            this.addArticle({...res,act_detail})
        }).catch(error=>{
            console.log(error)
        })
    }
    updateActicle(parmars) {
        updateActicle(parmars).then(response=>{
            if (response.res) {
                message.success(response.msg)
                this.props.history.goBack()
            }
        })
    }
    addArticle(parmars) {
        addArticle(parmars).then(response=>{
            console.log(response)
            if (response.res) {
                message.success(response.msg)
                this.props.history.goBack()
            }
        })
    }

    handleChange = (e) => {
        this.setState({main_content:e})
    }
    getInsance = (ins) => {
        this.setState({ins})
    }
    getEditorData() {
        const query = getQueryObj(this.props.location.search)
        const { isEdit,id } = query
        if(!isEdit) {
            return
        }
        getActicleDetail({id}).then(res=>{
            console.log(res)
            if (res.res) {
                this.props.form.setFieldsValue(res.data)
            }
        })
    }
}

export default Form.create({ name:'article_add' })(ArticleAdd)