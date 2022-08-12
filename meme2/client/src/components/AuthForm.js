import React from 'react'

export default function AuthForm(props){

    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       value={username}
                       name ='username'
                       onChange={handleChange}
                       placeholder ='Username' 
                       className='inputs'
                />
                <input type="password"
                       value={password}
                       name ='password'
                       onChange={handleChange}
                       placeholder ='Password' 
                       className='inputs'
                />
                <button className='btn'>{btnText}</button>
                <p style={{color:"red"}}>{errMsg}</p>
            </form> 
            
        </>
    )
}