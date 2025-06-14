import { ThemeProvider } from "@/components/theme-provider"
import Body from './components/Body'

function App() {
  

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Body/>
    </ThemeProvider>
  )
}

export default App
