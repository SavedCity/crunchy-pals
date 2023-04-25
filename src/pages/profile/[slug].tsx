import axios from 'axios'
import { MyReviewsProvider } from 'contexts/forums/my'
import { NextPageContext } from 'next'
import Profile from 'pages/Profile'

// export async function getServerSideProps(context: NextPageContext) {
//   const username = context.query.slug
//   const base_url = process.env.BASE_URL

//   const user = await axios
//     .post(`${base_url}/api/users/get-profile/${username}`)
//     .then(res => {
//       return res.data.user
//     })
//     .catch(err => console.log(err))
//   return {
//     props: { user },
//   }
// }

export default function ProfilePage() {
  return (
    <MyReviewsProvider>
      <Profile />
    </MyReviewsProvider>
  )
}
