import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from "react-router";

const AuthorViewAll = () => {

    // declare state variables to store axios call
    const [ allNames, setAllNames ] = useState([]);
    // set params for id passed through route path
    const {_id} = useParams();
    // set history for routing back to home after delete
    const history = useHistory();
    // decalre state variable for delete toggle
    const [ deleteToggle, setDeleteToggle ] = useState(false);

    // axios call to get all, with useEffect to prevent rerendering
    useEffect( () => {
        axios.get('http://localhost:8000/api/author')
            .then(res => {
                console.log('response: ', res)
                setAllNames(res.data.results)
            })
            .catch(err => {
                console.log('error: ', err)
            })
    }, [deleteToggle])


    // delete author function for delete button
    const deleteAuthor = (_id) => {
        axios.delete(`http://localhost:8000/api/author/delete/${_id}`)
            .then(res => {
                console.log('response: ', res)
                // toggles value of deleteToggle to trigger useEffect
                setDeleteToggle(!deleteToggle);
            })
            .catch(err => {
                console.log('error: ', err)
            })
    }

    return (
        <>
            <h1>Viewing All Authors</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                {
                    allNames.map( (nameObj, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{ nameObj.name }</td>
                                <td>
                                    <Link to={`/api/author/update/${nameObj._id}`}><button className="btn btn-warning btn-sm me-1">Edit</button></Link>
                                    <button onClick={ (e) => {deleteAuthor(nameObj._id)}} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default AuthorViewAll;