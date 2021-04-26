import React from 'react'
import Helmet from 'react-helmet'

const WordsPage = () => {
    return (
        <>
            <Helmet>
                <title>Words counter example</title>
            </Helmet>
            <div className="words">
                Here goes the words page 
            </div>
        </>
        
    )
}

export default WordsPage