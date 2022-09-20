import fs from 'fs';
import path from 'path';
// get filepath to data directory
const dataJ = path.join( process.cwd(), 'data');

// function returns ids for all json objects in array
export function getAllIds(isStarWars) {
    let fileName = (isStarWars) ? "sw.json" : "not_sw.json";
//get filepath to json file
const filePath = path.join( dataJ, fileName ); 
// const filePath2 = path.join( dataJ, 'jobs.json' ); 
//load json file contents
const jsonData = fs.readFileSync( filePath, 'utf8' );
// const jsonData2 = fs.readFileSync( filePath2, 'utf8' );
//convert string from file into json array object
const jsonObj = JSON.parse( jsonData);
// const jsonObj2 = JSON.parse( jsonData2);
//use map() on array to extract just id properties into new array of object values
const returnData = jsonObj.map(item => {
    return {
        params: {
            id: item.id.toString()
        }
    }
}
);

console.log(returnData);
return returnData;
}

//function returns names and ids for all json objects in array, sorted by name property.

export function getSortedList(isStarWars) {
let fileName = (isStarWars) ? "sw.json" : "not_sw.json";
const filePath = path.join(dataJ, fileName);
const jsonInfo =fs.readFileSync(filePath, 'utf8');
const jsonObj = JSON.parse(jsonInfo);
jsonObj.sort(function(x,y) {
    return x.author.localeCompare(y.author);
});
return jsonObj.map(item => {
    return {
        id: item.id.toString(),
        quote: item.quote,
        author: item.author,
        source: item.source,
        friend: item.friend.toString(),
        youtube: item.youtube,
        youtubeTitle: item.youtubeTitle
    }
})
}

export function getDataCommon(isStarWars, id){
    let fileName = (isStarWars) ? "sw.json" : "not_sw.json";
const filePath = path.join(dataJ, fileName);
const jsonInfo =fs.readFileSync(filePath, 'utf8');
const jsonObj = JSON.parse(jsonInfo);
const objMatch = jsonObj.filter((obj) => { return(obj.id.toString() === id)})
let objReturned = {};
if (objMatch.length > 0) {
    objReturned = objMatch[0];
    objReturned["sw"] = isStarWars;}
     console.log("found- " + objReturned["author"]);
    return objReturned;
}
 export function getDataNoSW(isStarWars, id) {
    let  notSW = getDataCommon(isStarWars, id);
    return notSW;
 }
//async function to get the complete data for just one author/person
// used by getStaticProps() in [id].js
export async function getData(isStarWars, id) {
    let objReturned = getDataCommon(isStarWars, id);
    objReturned["notSWData"] = getDataCommon(!isStarWars, objReturned.notSW);
    return objReturned;
}