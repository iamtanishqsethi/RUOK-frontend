import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const Body = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button>Hello</Button>
      <ModeToggle/>
    </div>
  )
}

export default Body
