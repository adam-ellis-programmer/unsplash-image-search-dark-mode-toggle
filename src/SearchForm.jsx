import { useGlobalContext } from './context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const handleSubmit = (e) => {
    // console.log(e.target.elements[1].type)
    // console.dir(e.target)
    e.preventDefault()
    const searchValue = e.target.elements.search.value

    if (!searchValue) return 
    setSearchTerm(searchValue) 
  }
  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          // name as not controlled input
          name="search"
          placeholder="cat"
        />
        <button name="test" type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  )
}
export default SearchForm
