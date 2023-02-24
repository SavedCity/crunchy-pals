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

  return {
    props: { reviews: reviews },
  };
}

export default function HomePage({ reviews }: any) {
  return <Home reviews={reviews} />;
}
