import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all scale-0 dark:scale-100" />
    </Button>
  )
}
