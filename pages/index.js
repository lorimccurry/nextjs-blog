import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {useState} from 'react';
import Alert from '../components/alert'
import {getSortedPostsData} from '../lib/posts'

const constants = {
  SUCCESS: 'success',
  ERROR: 'error'
}

/*
  getStaticProps:
  dev: runs on every request
  prod: runs at build time
  only exported from a page
*/
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  const [alertType, setAlertType] = useState(constants.SUCCESS)

  function handleClick() {
    const alertStatus = alertType === constants.SUCCESS ? constants.ERROR : constants.SUCCESS
    setAlertType(alertStatus)
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Purr and code</p>
        <p>
          (Seeing what the{' '}
          <a href="https://nextjs.org/learn">Next.js</a>-s is about.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <Alert type={alertType}>Alerted text</Alert>
        <button onClick={handleClick}>Alert the text</button>
      </section>
    </Layout>
  )
}
