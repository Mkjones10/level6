
import React from 'react'

import { UserContext } from '../context/UserProvider'
import Comment from '../comments/Comment'
import AllComments from '../comments/AllComments'
import PostForm from './PostForm.js'

export default function Post(props) {

    const { topText, bottomText, imgUrl, upVotes, downVotes, _id, user, votesTotal } = props
    const [votes, setVotes] = React.useState({ upVotes: upVotes || 0, downVotes: downVotes || 0, votesTotal: votesTotal || 0 })
    const [editTog, setEditTog] = React.useState(false)
    const { userAxios, user:loggedInUser, setAllMemes, } = React.useContext(UserContext)
    const newInputs = {
        topText: '',
        bottomText: '',
        imgUrl: ''
    }

    const [editedInputs, setEditedInputs] = React.useState(newInputs)
   
    function upVote() {

        userAxios.put(`/api/meme/upVotes/${_id}`, {
            userId: user._id
        })
            .then(res => {
                console.log(res.data)
                setVotes(prevVotes => ({
                    ...prevVotes,
                    upVotes: res.data.upVotes
                }))
            })
            .catch(err => console.log(err))
    }

    function downVote() {
        userAxios.put(`/api/meme/downVotes/${_id}`, { userId: user._id })
            .then(res => setVotes(prevVotes => ({
                ...prevVotes,
                downVotes: res.data.downVotes || prevVotes.upVotes
            })))
            .catch(err => console.log(err))
    }
    function totalVotes() {
        userAxios.put(`/api/meme/votesTotal/${_id}`, { userId: user._id })
            .then(res => setVotes(prevVotes => ({
                ...prevVotes,
                votesTotal: res.data.votesTotal
            })))
    }




    function handleDelete() {
        userAxios.delete(`/api/meme/${_id}`, { userId: user._id })
            .then(res => {
                setAllMemes(prevMemes => prevMemes.filter(meme => meme._id !== _id ? meme : res.data))
            })
            .catch(err => err.response.data.message)
    }
    function handleToggle() {
        setEditTog(prevToggle => !prevToggle)
    }



    function handleNewChange(e) {
        const { name, value } = e.target
        setEditedInputs(prevEditedInputs => ({
            ...prevEditedInputs,
            [name]: value
        }))
    }
    function handleEdit(post) {
        userAxios.put(`/api/meme/${_id}`, editedInputs)
            .then(res => {
                setAllMemes(prevMemes => prevMemes.map(meme => meme._id !== _id ? meme : res.data))
            })
            .catch(err => console.log(err))
    }
    function handleSubmit(e) {
        e.preventDefault()
        handleEdit()
        setEditTog(prevTog => !prevTog)
    }
    return (
        <>

            <div className="newPosts">
                {!editTog ?
                    <div className="posts">
                        <h1>Posted By : {user.username}</h1>
                        <h2>{topText}</h2>
                        <h3>{bottomText}</h3>
                        <img src={imgUrl} alt="" width={300} />
                        <button onClick={upVote}>UpVote</button>
                        <button onClick={downVote}>downVote</button>
                       { user._id === loggedInUser._id &&<button className="dlt" onClick={() => handleDelete(_id)}>X</button>}
                      

                        {user._id === loggedInUser._id && <button className="edit" onClick={handleToggle}>edit</button>}

                        <p>Total Votes ={votesTotal}</p>
                        <AllComments id={_id} />
                    </div>
                    :
                    <div className="edit-form">
                        <input type="text" name='title' className='pin' value={editedInputs.topText} onChange={handleNewChange} placeholder='Title' />
                        <input type="text" name='description' className='pin' value={editedInputs.bottomText} onChange={handleNewChange} placeholder='Description' />
                        <input type="text" name='imgUrl' className='pin' value={editedInputs.imgUrl} onChange={handleNewChange} placeholder='Image Url' />
                         <button onClick={handleSubmit}> Submit Edit</button>
                    </div>
                }
            </div>

        </>


    )
}