import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/data';
// import PersonSWChar from "../components/list"
import styles from '../styles/Home.module.css'
import CharacterList from "../components/list"

export async function getStaticProps() {
  const itemData = getSortedList();
  return {
    props: {
       itemData
    }
  }
}
export default function Home({ itemData }) {
  return (
      <Layout home>
        <header className="container-fluid">
          <div className="row">
            <h1 className="text-center mb-4">Star Wars Characters</h1>
          </div>
          </header>
          <section className="container-fluid">
          <div className='row'>
          <div className='col'>
            <ol className="list-group list-group-numbered">
            {itemData ? 
            itemData.map(({id, author}) => (
              <Link key={id} href ={`/${id}`}>
                <a><li className="list-group-item list-group-item-action">{author}</li></a>
              </Link>
            )) : null}
            </ol>
          </div>
          </div>
        </section>
      </Layout>
  );
}
