import withAuth from '../lib/withAuth';

function Home() {
  return <div>Welcome to Next.js!</div>;
}

Home.getInitialProps = async function getInitialProps(ctx) {
  console.log(ctx);
  const me = {
    me: 'Mark',
  };
  return { me };
};

export default withAuth(Home);
