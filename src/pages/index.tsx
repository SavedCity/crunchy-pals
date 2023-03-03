import { ReviewsProvider } from 'contexts/reviews'
import Home from 'pages/Home'
// import axios from 'axios';

// export async function getServerSideProps() {
//   const base_url = process.env.BASE_URL;

//   const reviews = await axios
//     .get(`${base_url}/api/reviews/get-reviews/`)
//     .then(res => {
//       return res.data.reviews;
//     })
//     .catch(err => console.log(err));
//   // TODO: create a context so that the reviews can be accessed globally

//   return {
//     props: { reviews: reviews },
//   };
// }

export default function HomePage() {
  return (
    <ReviewsProvider>
      <Home />
    </ReviewsProvider>
  )
}
