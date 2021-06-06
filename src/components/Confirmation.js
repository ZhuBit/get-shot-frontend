import React, {useState} from "react";
import {Button} from 'antd'
const Confirmation = () => {
    const [index, setIndex] = useState(1);
    const [doc, setDoc] = useState(require('../data/appointment1.json'))

    const changeDate = () => {
        setDoc(require(`../data/appointment${index + 1}.json`))
        let i = index
        i += 1
        setIndex(i)
    }
    return (
        <>
            <h3>Thank you!</h3>
            <p>You successfully registered for your vaccination</p>
            <p>Check your email</p>
            <p>*Email should be delivered in up to 15 minutes</p>
        </>
    )
}

export default Confirmation;
