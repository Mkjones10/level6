import React, {useEffect, useContext} from 'react'
import Post from './Post'
import { UserContext } from '../context/UserProvider'

export default function PostList(props){
    const { userState } = useContext(UserContext)
    console.log('user', userState)
    ///let {userPosts} = useContext(UserContext)
    const allRenderedPosts = userState.meme.map((meme, i) => {
        return (
            <div className='k' key={i}>
               <h1>{meme.topText}</h1> 
               <p>{meme.bottomText}</p>
               <img src={meme.imgUrl} alt="" width={300} height ={100} />
            </div>
        )
    })
  
    return(
        <>
            <div className="list">
                {allRenderedPosts}
            </div>
        </>
    )
}