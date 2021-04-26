import React, {useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import faker from 'faker'
import "./letters.styles.scss"
import {Button, Container} from "react-bootstrap"

import {countLetters} from "../../utils"

import Textarea from '../../components/textarea/textarea.component'
import Barchart from "../../components/barchart/barchart.component"
import Piechart from "../../components/piechart/piechart.component"

// const dummyData = {

export type DataItem = {
    key: string;
    value: number;
}


const LettersPage = () => {
    
    const [data, setData] = useState<Array<DataItem>>([]);
    const [content, setContent] = useState<string>('')
    const [randomText, setRandomText] = useState<string>('')
    

    const randomizeHandler = async (event: React.MouseEvent)=>{

        const random_text = faker.lorem.paragraph(50);
        const mydata = await countLetters(random_text);
        setData(mydata);
        setRandomText(random_text)
        // console.log({mydata})
        
    }

    useEffect(()=>{
        console.log("randomText changed")
    }, [randomText])

    useEffect(()=>{
        const callAsyncCalculation = async () => {
            console.log({content})
            const mydata = await countLetters(content)
            setData(mydata)
        }
        callAsyncCalculation();
        // if(content.length){
        //     console.log('async call is called')
        //     callAsyncCalculation()
        // }
    }, [content])
    

    return (
        <>
            <Helmet>
                <title>Letter counting page</title>
            </Helmet>
            <div className="letter-page">
                <div className='input-controls'>
                    <Container>
                        <Textarea setContent={setContent} initialContent={randomText} placeholder="Enter something here and magic happens when you pause for a while(that's called text debouncing in tech domain)" />
                        <Button onClick={randomizeHandler} variant="primary">Randomize</Button>
                        {data.length ? <h1 className="text-center">Here goes the analysis</h1> : null}
                    </Container>
                </div>
                
                {
                    data.length ?
                    <div className="charts">
                        <Barchart data={data} />
                        <Piechart data={data} />
                    </div>:
                    null
                }
                
            </div>
        </>
        
    )
}

export default LettersPage