import React from 'react'
import PostForm from './PostForm'
import PostList from './PostList'
import { UserContext } from '../context/UserProvider'


export default function Profile() {
    const { user: { username }, addMemes, } = React.useContext(UserContext)
   
    return (
        <>
            <div className="profile">
                <h1 className='name'>Welcome @{username}</h1>
                <h2 className='add'>Add A Post</h2>
                <PostForm addMemes={addMemes} />
                <h3 className='my'>Your Posts</h3>
                <div className="li">
                    <PostList />
                </div>
            </div>
        </>
    )
}