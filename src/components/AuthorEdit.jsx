import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';

const AuthorEdit = () => {

    // decalre state variables
    const [ oneAuthor, setOneAuthor ] = useState('');
    // declare state variable for validation errors
    const [ errors, setErrors ] = useState({});
    // declare history
    const history = useHistory();
    // set state variable for paramater from route path
    const { _id } = useParams();

    // axios call to get author info
    useEffect( () => {
        axios.get(`http://localhost:8000/api/author/${_id}`)
            .then(res => {
                console.log('response: ', res)
                setOneAuthor(res.data.results);
            })
            .catch(err => {
                console.log('error: ', err)
            })
    },[])

    // change handler to allowupdate of fields
    const changeHandler = (e) => {
        // sets oneAuthor to the value of the current field value
        setOneAuthor({
            ...oneAuthor,
            [e.target.name]: e.target.value
        })
    }

    // submit handler
    const submitHandler = (e) => {
        // prevents page from reloading on submit
        e.preventDefault();
        // axios put request
        axios.put(`http://localhost:8000/api/author/update/${_id}`, oneAuthor)
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
            <form onSubmit={ submitHandler }>
                <div className="form-group mb-3">
                    <label className='form-label' htmlFor='name'>Name</label>
                    <input className='form-control' type="text" name="name" id="name" onChange={ changeHandler } value={ oneAuthor.name } />
                    <p className='text-danger'>{errors.name?.message}</p>
                </div>
                <input className='btn btn-primary' type="submit" value='Submit Changes'></input>
            </form>
        </>
    )
}

export default AuthorEdit;