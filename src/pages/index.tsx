import { ReviewsProvider } from 'contexts/reviews/all-reviews'
import Home from 'pages/Home'

export default function HomePage() {
  return (
    <ReviewsProvider>
      <Home />
    </ReviewsProvider>
  )
}
