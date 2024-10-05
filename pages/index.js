import Dashboard from '@/components/Dashboard'
import Head from 'next/head'

export async function getStaticProps() {
  console.log("Running")
  // Fetch data from API
  const res = await fetch('http://localhost:3000/api/requests');
  const posts = await res.json();

  // Pass data to page component props
  return { props: { posts } };
}

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>ORTU Dashboard</title>
        <meta name="description" content="Opinion Rewards To UPI Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard posts={posts.data}/>
    </>
  )
}
