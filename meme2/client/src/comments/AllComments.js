import React from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import Comment from './Comment'



export default function AllComments(props){

    const {id} = props
    const initComment ={
        body:'',
        
    }
 

    const {userAxios} = React.useContext(UserContext)
    const [commentArr , setCommentArr] = React.useState([])
    const [comment, setComment] = React.useState(initComment)
   
    

   
    function getComments(){
        userAxios.get(`/api/comments/${id}`)
        .then(res =>{
            setCommentArr(res.data)
        })
        .catch(err => console.log(err))
    }
    React.useEffect(()=>{
       getComments()
    }, [])

 const commentElement    = commentArr.map(comment =>{
        return <Comment key ={comment._id} {...comment}/>
    })
    function handleCommentInputs(e){
        const {name, value} = e.target
        setComment(prevComment =>({
            ...prevComment,
            [name] :value
        }))
    }
    function addComment(newComment){
        userAxios.post(`/api/comments/${id}`, newComment)
        .then(res => setCommentArr(prevCommentArr =>{
            return [
                ...prevCommentArr,
                res.data
            ]
        }))
        .catch(err => console.log(err))
    }
    function handleCommentSubmit(e){
        e.preventDefault()
        addComment(comment)
        setComment(initComment)
    }

    const {body} = comment
    

    return (
        <>
            <div className="comments">
                <h3>Comments</h3>
                <form onSubmit={handleCommentSubmit}>
                    <input type="text" name='body' onChange={handleCommentInputs} value={comment.body} placeholder='ADD A COMMNET'/>
                    <button type='submit'> ADD</button>
                </form>
                <div className="old">
                {commentElement}
                </div>
            </div>
        </>
    )
}