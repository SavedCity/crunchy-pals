import axios from 'axios';
import Home from 'pages/Home';

export async function getServerSideProps() {
  const base_url = process.env.BASE_URL;

  const reviews = await axios
    .get(`${base_url}/api/reviews/get-reviews/`)
    .then(res => {
      return res.data.reviews;
    })
    .catch(err => console.log(err));

  // const res = await fetch(`${base_url}/api/reviews/get-reviews/`);
  // const data = await res.json();

  return {
    props: { reviews: reviews },
  };
}

export default function HomePage({ reviews }: any) {
  return <Home reviews={reviews} />;
}
