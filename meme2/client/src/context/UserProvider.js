import React from 'react'
import axios from 'axios'

const userAxios = axios.create()
export const UserContext = React.createContext()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        meme: [],
        errMsg: '',
        comments: []
    }
    const [allMemes, setAllMemes] = React.useState([])

    const [userState, setUserState] = React.useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.message))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => {
                console.log(err.response)
                handleAuthErr(err.response.data.message)
            })
    }
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            meme: [],
            comments: []
        })
    }

    function handleAuthErr(errMsg) {
        console.log(errMsg)
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }
    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }))
    }

    function getAllComments() {
        userAxios.get(`/api/meme/${userState.user._id}`)
            .then(res => setUserState(prevUserState => ({
                ...prevUserState,
                comments: [res.data]
            })))

    }

    function getUserMemes() {
        userAxios.get(`/api/meme/${userState.user._id}`)
            .then(res => setUserState(prevUserState => ({
                ...prevUserState,
                meme: [...res.data]
            })))
    }

    function addMemes(newMeme) {
        userAxios.post('/api/meme/', newMeme)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                meme: [...prevUserState.meme, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllMemes() {
        userAxios.get('/api/meme/')
            .then(res => setAllMemes(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getUserMemes()
      }, [])
      

    return (
        <UserContext.Provider
            value={{
                ...userState,
                userState,
                signup,
                login,
                logout,
                getUserMemes,
                getAllMemes,
                addMemes,
                allMemes, 
                setAllMemes,   
                getAllComments,
                resetAuthErr,
                userAxios


            }}
        >
        {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
