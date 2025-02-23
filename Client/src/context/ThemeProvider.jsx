import {createContext, useState, useContext, useEffect} from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem('bioma') || 'jungla')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('bioma', theme)

    // Ajustar las variables CSS para que coincidan con el tema
    const themeColors = getThemeColors(theme)
    applyThemeColors(themeColors)
  }, [theme])

  const getThemeColors = (theme) => {
    // Devuelve los colores correspondientes para cada tema
    switch (theme) {
      case 'jungla':
        return {
          primary: '#52b788', // color de acento
          secondary: '#2d6a4f', // fondo
          text: '#f1faee' // color de texto
        }
      case 'desierto':
        return {
          primary: '#f4a261',
          secondary: '#e9c46a',
          text: '#264653'
        }
      case 'nieve':
        return {
          primary: '#457b9d',
          secondary: '#a8dadc',
          text: '#1d3557'
        }
      default:
        return {
          primary: '#3b82f6', // color de acento por defecto
          secondary: '#1e3a8a',
          text: '#f8f9fa'
        }
    }
  }

  const applyThemeColors = (colors) => {
    // Asigna los colores al documento
    document.documentElement.style.setProperty('--primary', colors.primary)
    document.documentElement.style.setProperty('--secondary', colors.secondary)
    document.documentElement.style.setProperty('--body-color', colors.text)
  }

  const changeTheme = (newTheme) => setTheme(newTheme)

  return <ThemeContext.Provider value={{theme, changeTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
