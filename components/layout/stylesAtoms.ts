import { atom, useAtom } from 'jotai'

type ColorScheme = 'light' | 'dark'

export const colorSchemeAtom = atom<ColorScheme>('light')

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom)

  const setScheme = (newColorScheme: ColorScheme) => {
    setColorScheme(newColorScheme)
  }

  return { colorScheme, setScheme }
}
