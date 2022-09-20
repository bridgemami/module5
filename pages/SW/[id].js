import Head from 'next/head';
//getAllIds is a function from lib/data.js
import { getAllIds, getData } from '../../lib/data';
import Layout from '../../components/layout';
import CharacterList from '../../components/author';

//create an instance of the getStaticPaths() to report next all possible dynamic urls
export async function getStaticPaths() {
    const paths = getAllIds(true);
    return {
        paths,
        fallback: false,
    };
    }

//create an instance of the getStaticProps() to return data for one person
export async function getStaticProps({params}) {
    const itemData = await getData(true, params.id);
    return  {
        props: {
            itemData
        }
    }
}


// make a react component to display all details about a person when a dynamic route matches, like id 1 or id 2
export default function NoStarWars ({itemData}) {
    return (
        <Layout>
        <CharacterList info ={itemData} />
        </Layout>
    );
}