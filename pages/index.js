import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/data';
// import PersonSWChar from "../components/list"
import styles from '../styles/Home.module.css'
import CharacterList from "../components/list"

export async function getStaticProps() {
  const starWars = await getSortedList(true);
  const notStarWars= await getSortedList(false);
  return {
    props: {
        starwarss: starWars,
        notstarwarss: notStarWars
    }
  }
}
export default function Home({ starwarss, notstarwarss }) {
  return (
      <Layout home>
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-center mb-4">A Character List</h1>
          </div>
          <div className='row'>
          <CharacterList sw={starwarss} />
          <CharacterList sw={notstarwarss} isNotSW />
          </div>
        </div>
      </Layout>
  );
}
