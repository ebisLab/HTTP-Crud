import React, { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'


const UpdateMovieForm = (props) =>{
    const[data, setData] = useState({
        title: '',
        director: '',
        metascore: 0,
        stars: [''],
      
    });
const {id} = useParams();
// const itemToUpdate = props.movieList.find(thing => `${thing.id}` === id)
// console.log('itemupdate outside usefect', itemToUpdate)


useEffect(() => {
    // console.log(props.getData.map(item=> item.title), 'getData')
    console.log(props.movieList)
    // if (props.movieList){
        const itemToUpdate = props.movieList.find(thing => `${thing.id}` === id)
        // const itemToUpdate = props.movieList.find(thing => `${thing.id}` === props.match.params.id)

        // setData()
        itemToUpdate && setData(itemToUpdate)
// console.log(setData(itemToUpdate))
console.log('HELLO FROM THE USEEFFECT', itemToUpdate)
    // }
// props.getData && setData(props.getData.find(thing => `${thing.id}` === id))

}, [id, props.movieList])


    const changeHandler =(e)=>{
setData({...data, [e.target.name]: e.target.value})
console.log(e.target.value)
    }

    const submitHandler = (e) =>{
e.preventDefault()
        // setData(data)
        console.log(id, 'id')
        axios
        .put(`http://localhost:5000/api/movies/${id}`, data)
        .then(res =>console.log(res))
        .catch(err => console.log(err))
        // console.log('event clicked', data)
    }
// console.log('props.get-data~~>', props.getData)
// console.log('setdata', setData(data))
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