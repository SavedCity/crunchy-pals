import axios from 'axios'
import UserContext from 'contexts/user'
import { NextPageContext } from 'next'
import { useSession } from 'next-auth/react'
import Profile from 'pages/Profile'
import { useContext } from 'react'
import useSWR from 'swr'

const fetcher = async (context: NextPageContext) => {
  const { query } = context
  // console.log(query)
  const res = await axios.post('/api/users/get-user', {
    // email,
  })
  return res
}

export async function getServerSideProps(context: NextPageContext) {
  const { req, query } = context
  // console.log(query)

  // Fetch data from external API
  // const res = await axios
  //   .post(`/api/users/get-user/`, {
  //     // email,
  //   })
  //   .then(res => {
  //     // console.log(res)
  //     return res
  //   })
  //   .catch(err => console.log(err))
  // const data = query.slug

  // Pass data to the page via props
  return {
    props: {
      // data
    },
  }
}

export default function ProfilePage() {
  const { userData }: object | any = useContext(UserContext)
  // const { email } = userData

  const { data, error } = useSWR('/api/users/get-user', fetcher)
  // data && console.log(data)
  // error && console.log(error)

  return <Profile />
}
