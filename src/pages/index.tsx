import { ForumsProvider } from 'contexts/forums/all-forums'
import Home from 'pages/Home'

export default function HomePage() {
  return (
    <ForumsProvider>
      <Home />
    </ForumsProvider>
  )
}
