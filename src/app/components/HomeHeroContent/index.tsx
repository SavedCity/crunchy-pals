import { useMyUser } from 'contexts/users/my'
import React from 'react'

export default function HomeHeroContent() {
  const { user } = useMyUser()
  const { username } = user || {}

  return <div>Great Home Page Content by {username}</div>
}
