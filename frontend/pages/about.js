import withAuth from '../lib/withAuth';
import Link from 'next/link';

function About() {
  return <div>About Page! <Link href="/">
      <a>Home</a>
    </Link></div>;
}

export default withAuth(About);
