import React from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';
import { withRouter } from "react-router-dom";
import {addPatient} from "../services/api";


 const RegisterPatient = ({ history }) => {
     const [form] = Form.useForm();
     const onFinish = async(values) => {
         values.status = 0
         await addPatient(values)
         history.push('/confirm')
     };
     return (
         <Form
             form={form}
             onFinish={onFinish}
             labelCol={{ span: 4 }}
             wrapperCol={{ span: 14 }}
             layout="horizontal"
             style={{padding: 40}}
         >
             <br/>
             <Form.Item label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please input your name" },
                        ]}>
                 <Input placeholder={"Name"} type="text" />
             </Form.Item>
             <Form.Item  name="email"
                         label="E-mail"
                         rules={[
                             {
                                 type: "email",
                                 message: "The input is not valid E-mail",
                             },
                             {
                                 required: true,
                                 message: "Please input your E-mail",
                             },
                         ]}>
                 <Input placeholder={"E-Mail"} />
             </Form.Item>
             <Form.Item label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            { required: true, message: "Please input your phone number" },
                        ]}>
                 <Input placeholder={"Phone Number"} type="text" />
             </Form.Item>
             <Form.Item
                 name="DOB"
                 label="Date of Birth"
                 rules={[{ required: true, message: "Please input your date of birth" }]}
             >
                 <DatePicker picker="month" format={"MM-YYYY"} />
             </Form.Item>
             <Form.Item label="Insurance Number"
                        name="insuranceNumber"
                        type="text"
                        rules={[
                            { required: true, message: "Please input your insurance number(min 10 characters)",
                              min: 10
                            },
                        ]}>
                 <Input placeholder={"Insurance Number"} type="text" />
             </Form.Item>
             <Button type="primary" htmlType="submit">
                 Submit
             </Button>
         </Form>
     )
 }




export default withRouter(RegisterPatient)
