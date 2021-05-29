import React, {useState} from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    Radio,
    Checkbox,
    Row,
    Col,
    Card
} from 'antd';
import { withRouter } from "react-router-dom";
import {addPatient} from "../services/api";


 const RegisterPatient = ({ history }) => {
     const [form] = Form.useForm();
     const [value, setValue] = React.useState(false);

     const [sex, setSex] = React.useState();
     const [risiko , setRisiko] = React.useState([]);
     const [prof , setProf] = React.useState([]);

     const [chooseDate, setChooseDate] = React.useState(false);
     const [state, setState] = React.useState();

     const onChangeSex = e => {
         setSex(e.target.value);
     };
     const onChangeRisiko = e => {
         setRisiko(e)
     };
     const onChangeProf = e => {
         setProf(e)
     };
     const optionsWithDisabled = [
         { label: 'Allergies', value: ' Allergies ' },
         { label: 'Heart Disease', value: ' Heart Disease ' },
         { label: 'Other', value: ' Other ' },
     ];
     const professions = [
         { label: 'Health', value: ' Health ' },
         { label: 'Educational', value: ' Educational ' },
     ];

     const onFinish = async(values) => {
         values.status = 0
         values.riskGroup = risiko
         values.sex = sex
         values.professions = prof
         setState(values)
         setChooseDate(true)
     };
     const selectDate = async (date) => {
         let s = state
         s.date = date
         setState(s)
         await addPatient(s)
         history.push('/confirm')
     }
     return (
         <>
             {
                 chooseDate ?
                     <>
                         <h1>Please choose available dates: </h1>
                         <Row>
                             <Col span={8}>
                                 <Card title="Vaccination slot 1" bordered={false} style={{ width: '80%' }}>
                                     <p>Date: 14.06.2021</p>
                                     <p>Time: 10:00 - 11:00</p>
                                     <p>Location:  Schloss Schönbrunn (13., Schönbrunner Schloßstraße 47) </p>
                                     <Button primary onClick={() => selectDate('14.06.2021')}>Select</Button>
                                 </Card>
                             </Col>
                             <Col span={8}>
                                 <Card title="Vaccination slot 2" bordered={true} style={{ width: '80%' }}>
                                     <p>Date: 21.06.2021</p>
                                     <p>Time: 10:00 - 11:00</p>
                                     <p>Location:  Schloss Schönbrunn (13., Schönbrunner Schloßstraße 47) </p>
                                     <Button primary onClick={() => selectDate('21.06.2021')}>Select</Button>
                                 </Card>
                             </Col>
                             <Col span={8}>
                                 <Card title="Vaccination slot 3" bordered={false} style={{ width: '80%' }}>
                                     <p>Date: 28..06.2021</p>
                                     <p>Time: 10:00 - 11:00</p>
                                     <p>Location:  Schloss Schönbrunn (13., Schönbrunner Schloßstraße 47) </p>
                                     <Button primary onClick={() => selectDate('28.06.2021')}>Select</Button>
                                 </Card>
                             </Col>
                         </Row>
                     </>:
                     <>
                         <h1>Registration</h1>
                         <p>Please fill out the form to get registered for your vaccination.</p>
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
                                 <Input placeholder={"Phone Number"} type="number" />
                             </Form.Item>
                             <Form.Item
                                 name="DOB"
                                 label="Date of Birth"
                                 rules={[{ required: true, message: "Please input your date of birth" }]}
                             >
                                 <DatePicker format={"DD-MM-YYYY"} />
                             </Form.Item>
                             <Form.Item label="Insurance Number"
                                        name="insuranceNumber"
                                        type="text"
                                        rules={[
                                            { required: true, message: "Please input your insurance number(min 10 numbers)",
                                                min: 10
                                            },
                                        ]}>
                                 <Input placeholder={"Insurance Number"} type="number" />
                             </Form.Item>
                             <Form.Item label="Sex"
                                        name="sex"
                                        rules={[
                                            { required: true, message: "Please choose" },
                                        ]}
                                        type="text">
                                 <Radio.Group onChange={onChangeSex} value={sex}>
                                     <Radio value={'male'}>Male</Radio>
                                     <Radio value={'female'}>Female</Radio>
                                 </Radio.Group>
                             </Form.Item>
                             <Form.Item label="Full Address"
                                        name="address"
                                        rules={[
                                            { required: true, message: "Please input your address" },
                                        ]}>
                                 <Input placeholder={"Address"} type="text" />
                             </Form.Item>
                             <Form.Item label="Risk group"
                                        name="riskGroup"
                                        type="text">
                                 <p>If any question applies to you, please tick the box.</p>
                                 <Checkbox.Group
                                     options={optionsWithDisabled}
                                     onChange={onChangeRisiko}
                                 />

                             </Form.Item>
                             <Form.Item label="Professions"
                                        name="professions"
                                        type="text">
                                 <p>If any question applies to you, please tick the box.</p>
                                 <Checkbox.Group
                                     options={professions}
                                     onChange={onChangeProf}
                                 />

                             </Form.Item>
                             <Form.Item label="Data protection information"
                                        name="data"
                                        rules={[
                                            { required: !value, message: "Please accept terms",
                                            },
                                        ]}
                             >
                                 <p>I give my express consent to the processing of the personal data required for the purpose of pre-registering a vaccination, vaccination planning and internal statistical (anonymised) evaluations.</p>
                                 <Checkbox onChange={checkBox}  value={value}>I agree</Checkbox>
                             </Form.Item>

                             <Button type="primary" htmlType="submit">
                                 Submit
                             </Button>
                         </Form>
                     </>
             }
         </>
     )
     function checkBox(e) {
         setValue(e.target.checked)
     }

 }




export default withRouter(RegisterPatient)
