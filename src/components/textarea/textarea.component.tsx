import React, {useState, useEffect} from 'react'

import {Form} from 'react-bootstrap'

import "./textarea.styles.scss"

type PropTypes = {
    initialContent: string;
    placeholder: string;
    setContent: (text: string) => void
}

const Textarea:React.FC<PropTypes> = ({initialContent, placeholder, setContent}) => {
    // let timeout: NodeJs.Timeout;
    let timeout: ReturnType<typeof setTimeout>; // this is using type inference to deduce the return value of a function
    const [text, setText] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        
        setText(event.target.value);
    }

    useEffect(()=>{
        setText(initialContent)
    }, [initialContent])

    useEffect(()=>{

        // if(text){
        //     timeout = setTimeout(()=>{
        //         console.log("something is happening after few time")
        //         setContent(text)
        //     }, 1000)
        // }
        // if(text.length){
        //     timeout = setTimeout(()=>{
        //         console.log("something is happening after few time");
        //         setContent(text)
        //     }, 1500)
        // }
        console.log("this is called in Textarea")
        timeout = setTimeout(()=>{
            setContent(text)
        }, 600)
        

        return ()=>{
            clearTimeout(timeout);
        }

    }, [text])

    // console.log("calling from text area component");
    // console.log({text})

    return (
        <div className="text-area">
            <Form.Group>
                <Form.Label>Enter Some Text</Form.Label>
                <Form.Control as="textarea" value={text} onChange={onChangeHandler} rows={5} placeholder={placeholder} />
            </Form.Group>
        </div>
    )
}

export default Textarea
