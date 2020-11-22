import Layout from '../../components/layout'
import Head from 'next/head'
import {getAllPostIds, getPostData} from '../../lib/posts'
import Date from '../../components/date'
import utilStyle from '../../styles/utils.module.css'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingXl}>{postData.title}</h1>
        <div className={utilStyle.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
    </Layout>
  )
}