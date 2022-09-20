import fs from 'fs';
import path from 'path';
// get filepath to data directory
const dataJ = path.join( process.cwd(), 'data');

// function returns ids for all json objects in array
// called from [id].js getStaticPaths()
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
//called from pages/index.js
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

export function getDataCommon(idRequested){
    // let fileName = (isStarWars) ? "sw.json" : "not_sw.json";
    //get filepath to json file
const filePath = path.join(dataJ, 'sw.json');
const filePath2 = path.join(dataJ, 'not_sw.json');
//load json file
const jsonInfo =fs.readFileSync(filePath, 'utf8');
const jsonInfo2 =fs.readFileSync(filePath2, 'utf8');
//convert string from file into json array object
const jsonObj = JSON.parse(jsonInfo);
const jsonObj2 = JSON.parse(jsonInfo2);
//find object value in array has matching id
const objMatch = jsonObj.filter(obj => { return(obj.id.toString() === idRequested)});
//use idRequested or id instead above
//extract object value in filtered array if any 
// let objReturned = {};
// if (objMatch.length > 0) {
//     objReturned = objMatch[0];
//     objReturned["sw"] = isStarWars;}
//      console.log("found- " + objReturned["author"]);
//     return objReturned;
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    
        //find matching friend in relations data model
        const objMatch2 = jsonObj2.filter(obj => { return(obj.friend.toString() === idRequested)});

        if(objMatch2.length > 0) {
          // since we found an entry in relations, now let's find all the rows
      // of persons that have id in the array of related_ids
            const objMatched3 = jsonObj.filter(obj => {
                return objMatch2[0].friend.includes(obj.id)
            });
            if(objMatched3.length > 0) {
                objReturned.related =objMatched3;
            }
        }

    }
    else {
        let objReturned = {};
    }
    console.log(objReturned);
}
 export function getDataNoSW(isStarWars, id) {
    let  notSW = getDataCommon(isStarWars, id);
    return notSW;
 }
 //
//async function to get the complete data for just one author/person
// used by getStaticProps() in [id].js
export async function getData(isStarWars, id) {
    let objReturned = getDataCommon(isStarWars, id);
    objReturned["notSWData"] = getDataCommon(!isStarWars, objReturned.notSW);
    return objReturned;
}