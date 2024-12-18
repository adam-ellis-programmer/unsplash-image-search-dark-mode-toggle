import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'
// can still see the api key in the network tab
// fixed with serveless fucntions on netlify
const url = `https://api.unsplash.com/search/photos?page=4&client_id=${
  import.meta.env.VITE_API_KEY
}_page=12`
console.log(import.meta.env.VITE_API_KEY)
const Gallery = () => {
  const { searchTerm } = useGlobalContext()
  const response = useQuery({
    // setSearch issue as we cache the images with react query
    // any values in this array changes we trigger a re-fetch
    // if search for a term already cahced, no re-fetch
    // if the results are the same nothing changes
    // if the results are different we get fresh data
    queryKey: ['images', searchTerm],
    queryFn: async (params) => {
      const result = await axios.get(`${url}&query=${searchTerm}`)
      return result.data
    },
  })

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }
  if (response.isError) {
    console.log(response)
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  const results = response.data.results
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    )
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        // optinal chainging for just in case
        const url = item?.urls?.regular
        return (
          <img src={url} key={item.id} alt={item.alt_description} className="img"></img>
        )
      })}
    </section>
  )
}

export default Gallery
