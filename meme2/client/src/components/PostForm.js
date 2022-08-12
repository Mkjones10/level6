import React from 'react'

const initInputs ={
    topText: '',
    bottomText: '',
    imgUrl: ''
}

export default function PostForm(props){

    const {addMemes} = props
    const [inputs, setInputs] = React.useState(initInputs)

    function handleChange(e){
        const {name,  value} = e.target
        setInputs(prevInputs =>({
            ...prevInputs,
            [name] :value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addMemes(inputs)
        setInputs(initInputs)
    }

    const {topText, bottomText, imgUrl} = inputs

    return(
        <>
            <form onSubmit={handleSubmit} className ='profile-form'>
                <input type="text" name='topText' className='pin' value={topText} onChange ={handleChange} placeholder ='TopText' />
                <input type="text" name='bottomText' className='pin' value={bottomText} onChange ={handleChange} placeholder ='BottomText' />
                <input type="text" name='imgUrl' className='pin' value={imgUrl} onChange ={handleChange} placeholder ='Image Url' />
                <button>ADD A POST</button>
            </form>
        </>
    )
}