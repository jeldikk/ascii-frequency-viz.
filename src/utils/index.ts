import { DataItem } from "../pages/letters/letters.page";

export const countLetters= async (s: string): Promise<Array<DataItem>>  => {

    let tempCont: {
        [key: string]: number
    } = {}

    for(let ch of s){
        let charval = ch.charCodeAt(0);
        let lowerChar = ch.toLowerCase();

        if((97 <= charval && charval <= 122) || (65 <= charval && charval <= 90)){
            if(!tempCont[lowerChar]){
                tempCont[lowerChar] = 1
            }
            else{
                tempCont[lowerChar]++;
            }
        }

    }

    let retArray : Array<DataItem> = [];

    for(let ele of Object.keys(tempCont)){
        retArray.push({
            key: ele,
            value: tempCont[ele]
        })
    }

    // for(let charVal=97;charVal<=122;charVal++){
    //     let charStr = String.fromCharCode(charVal);
    //     if(!!tempCont[charStr]){
    //         retArray.push({
    //             key: charStr,
    //             value: tempCont[charStr]
    //         })
    //     }
    //     else{
    //         retArray.push({
    //             key: charStr,
    //             value: 0
    //         })
    //     }
        
    // }

    return retArray.sort((a,b) =>{
        if(a.key > b.key){
            return 1
        }
        else if(a.key < b.key){
            return -1
        }
        else{
            return 0;
        }
    });
}