import React, {useEffect} from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";
import Post from "./Post";

export default function Public(){

    const {getAllMemes, allMemes} = React.useContext(UserContext)
    
    React.useEffect(() => {
        getAllMemes()
    }, [])

    const sortMemes = allMemes.sort((a,b) =>{
        
            let x = a.votesTotal
            let y = b.votesTotal
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
       
    })

    

    const postElements = sortMemes.map(meme =>{
        
        return <Post {...meme} key ={meme._id}/>
    })

    return(
        <>
            <div className="public">
                <h1>This is the PUBLIC page</h1>
                {postElements}
            </div>
        </>
    )
}