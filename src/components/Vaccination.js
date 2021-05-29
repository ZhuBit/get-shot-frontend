import React, {useEffect, useState} from "react";
import {Row, Col, Button, Table, AutoComplete, Tag} from 'antd'
import {getPatients, updatePatient} from "../services/api";

const Vaccination = () => {
    const [patients, setPatients] = useState(null);
    const [insuranceNumber, setInsuranceNumber] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    useEffect(
        () => {
            if (!patients) getAllPatients()
        }
    );

    const getAllPatients = async () => {
        const p = await getPatients();
        let numbers = p.map( patient => {
            return {
            'value':  patient.insuranceNumber
            }
        })
        setInsuranceNumber(numbers)
        setPatients(p)
    }

    const selectPatient = (number) => {
        let patient = patients.filter(item => item.insuranceNumber === number)[0]
        setSelectedPatient(patient)
    }

    const changeStatus = (patient) => {
        let pat = patient
        pat.status += 1
        updatePatient(pat)
        getAllPatients()
        setSelectedPatient(pat)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Insurance Number',
            dataIndex: 'insuranceNumber',
            key: 'insuranceNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <>
                    {
                        status === 0 && <Tag>Not admitted</Tag>
                    }
                    {
                        status === 1 && <Tag color="magenta">Waiting</Tag>
                    }
                    {
                        status === 2 && <Tag color="cyan">Getting vaccinated</Tag>
                    }
                    {
                        status > 2 && <Tag color="green">Vaccinated</Tag>
                    }
                </>
            ),
        },
    ];

    return (
        <div>
            <br/>
            <h1>Vaccination Process</h1>
            <br/>
            <p>Please find patient by insurance number, and start the process by pressing the button "Change Status".</p>
            <br/>
            {patients &&
                <>
                    <AutoComplete
                        style={{
                            width: 200,
                        }}
                        options={insuranceNumber}
                        onSelect={item => selectPatient(item)}
                        key='1'
                        placeholder="Search Insurance Number of Patients`"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    <br/><br/><br/>
                    {selectedPatient &&
                        <>
                            <Row>
                                <Col span={6}>
                                    <strong>Name: </strong>
                                    <p>{selectedPatient.name}</p>
                                </Col>
                                <Col span={6}>
                                    <strong>Insurance Number: </strong>
                                    <p>{selectedPatient.insuranceNumber}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <strong>Date of Birth: </strong>
                                    <p>{selectedPatient.DOB}</p>
                                </Col>
                                <Col span={6}>
                                    <strong>E-Mail: </strong>
                                    <p>{selectedPatient.email}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <strong>Sex: </strong>
                                    {selectedPatient.sex && <p>{selectedPatient.sex}</p>}
                                </Col>
                                <Col span={6}>
                                    <strong>Address: </strong>
                                    {selectedPatient.address && <p>{selectedPatient.address}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <strong>Risk Group: </strong>
                                    {selectedPatient.riskGroup && <p>{selectedPatient.riskGroup.map(item =>  <Tag color="red">{item}</Tag>)}</p>}
                                </Col>
                                <Col span={6}>
                                    <strong>Professions: </strong>
                                    {selectedPatient.professions && <p>{selectedPatient.professions}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <strong>Date of Vaccination: </strong>
                                    {selectedPatient.date && <p>{selectedPatient.date}</p>}
                                </Col>
                                <Col span={6}>
                                    <strong>Time of Vaccination: </strong>
                                    <p>10:00 - 11:00</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={9}>
                                    <strong>Location of Vaccination: </strong>
                                    <p>Schloss Schönbrunn (13., Schönbrunner Schloßstraße 47)</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <strong>Change status: </strong>
                                    {
                                        selectedPatient.status === 0 && <Button
                                            onClick={() => changeStatus(selectedPatient)}>Patient Arrived</Button>
                                    }
                                    {
                                        selectedPatient.status === 1 && <Button color="primary"
                                            onClick={() => changeStatus(selectedPatient)}>To Vaccination</Button>
                                    }
                                    {
                                        selectedPatient.status > 1 && <Button color="cyan"
                                            onClick={() => changeStatus(selectedPatient)}>Finish Vaccination</Button>
                                    }

                                </Col>
                            </Row>
                        </>}
                    <br/>
                    <Table dataSource={patients} columns={columns} rowKey="insuranceNumber" />
                </>
            }
        </div>
    );
}

export default Vaccination;
