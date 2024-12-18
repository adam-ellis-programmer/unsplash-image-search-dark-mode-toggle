import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const storedDarkMode = localStorage.getItem('darkTheme')

  if (storedDarkMode === null) {
    return prefersDarkMode
  }

  return storedDarkMode === 'true'
}

let mql = window.matchMedia('(max-width: 500px)')
// console.log(mql)
export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('lady')
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)

    // removed as we now check in the use effect
    // const body = document.querySelector('body')
    // // if true add it not remove
    // body.classList.toggle('dark-theme', newDarkTheme)
    // console.log(body)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  // when the app firsh loads run a check to add class
  // and then every time the button is toggled
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
    // console.log(isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{
        toggleDarkTheme,
        isDarkTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom hook
export const useGlobalContext = () => useContext(AppContext)
