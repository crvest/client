import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AuthorForm = () => {

    // decalre state variables
    const [ name, setName ] = useState('');
    // declare state variable for validation errors
    const [ errors, setErrors ] = useState({});
    // declare history
    const history = useHistory();

    // create handler
    const createHandler = (e) => {
        // prevents page from reloading on submit
        e.preventDefault();
        //package form data into single object
        let formData = {name}
        // axios post request
        axios.post('http://localhost:8000/api/author/new', formData)
            .then(res => {
                console.log('response: ', res)
                //check for validation errors
                if(res.data.error){
                    setErrors(res.data.error.errors)
                }
                else{
                    // redirect to main page
                    history.push('/')
                }
                
            })
            .catch(err => console.log('error: ', err))
    }

    return (
        <>
            <h2>Enter Author Name</h2>
            <form onSubmit={ createHandler }>
                <div className="form-group mb-3">
                    <label className='form-label' htmlFor='name'>Name</label>
                    <input className='form-control' type="text" name="name" id="name" onChange={ (e)=>{setName(e.target.value)} } value={name} />
                    <p className='text-danger'>{errors.name?.message}</p>
                </div>
                <input className='btn btn-primary' type="submit" value='Create'></input>
            </form>
        </>
    )
}

export default AuthorForm;