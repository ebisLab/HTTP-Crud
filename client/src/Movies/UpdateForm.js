import React, { useState,useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


const UpdateMovieForm = (props) =>{
    console.log(props)
    const[data, setData] = useState({
        title: '',
        director: '',
        metascore: 0,
        stars: [''],
      
    });
    const {id} = useParams();
    const history = useHistory();

useEffect(() => {
    console.log(props.movieList)

 const itemToUpdate = props.movieList.find(thing => `${thing.id}` === id)
        
   itemToUpdate && setData(itemToUpdate)
console.log('HELLO FROM THE USEEFFECT', itemToUpdate)

}, [id, props.movieList])


    const changeHandler =(e)=>{
setData({...data, [e.target.name]: e.target.value})
console.log(e.target.value)
    }

    const submitHandler = (e) =>{
e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, data)
        .then(res =>{
         props.setDependency(true);
            history.push(`/movies/${id}`)
            })
        .catch(err => console.log(err))
    }
    return(
        <form onSubmit={submitHandler}>
            <input 
            placeholder="title"
            label="title"
            name="title"
            value={data.title}
            onChange={changeHandler} />
            <input 
            placeholder="director"
            label="director"
            name="director"
            value={data.director}
            onChange={changeHandler} />
            <input 
            placeholder="metascore"
            name="metascore"
            value={data.metascore}
            label="metascore"
            onChange={changeHandler} />
            <input 
            placeholder="stars"
            name="stars"
            value={data.stars}
            label="stars"
            onChange={changeHandler} />
        
            <button>Update</button>
        </form>
    )
}

export default UpdateMovieForm;