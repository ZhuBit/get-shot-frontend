
const addPatient = async (values) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/postPatient`,
            {
                method: "POST",
                mode: 'cors',
                body: JSON.stringify({
                    patient: values
                })
            },
        );
        const json = await response.json();
        console.log('response', json)
        return json.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getPatients = async () => {
    try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/patients`);
        const json = await data.json();
        console.log(json)
        return json.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const updatePatient =  (patient) => {
    try {
        const response =  fetch(
            `${process.env.REACT_APP_API_URL}/editPatient`,
            {
                method: "POST",
                body: JSON.stringify({
                    patient : patient,
                }),
            }
        );
        const json = response.json();
        return json.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export {
    getPatients,
    addPatient,
    updatePatient
}
