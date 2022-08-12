import React from 'react'
import { UserContext } from '../context/UserProvider'

export default function Comment(props){
    const {userAxios} = React.useContext(UserContext)


    const {body , user} = props

    // console.log(user.username)

    return (
        <>
            <p>{body}</p>
            <p>User:{user}</p>
        </>
    )
}