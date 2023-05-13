import { FavoriteForumsProvider } from 'contexts/forums/favorite-forums'
import Favorites from 'pages/Favorites'

export default function FavoritesPage() {
  return (
    <FavoriteForumsProvider>
      <Favorites />
    </FavoriteForumsProvider>
  )
}
