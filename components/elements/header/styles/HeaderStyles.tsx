export const setHeaderStyles = (colorScheme: string) => {
  document.documentElement.style.setProperty(
    '--header-background-color',
    colorScheme === 'light' ? 'white' : '#2D283B'
  )
  document.documentElement.style.setProperty(
    '--post-text-color',
    colorScheme === 'light' ? '#45432B' : '#ACA4CE'
  )
  document.documentElement.style.setProperty(
    '--items-background-color',
    colorScheme === 'light' ? 'white' : '#2D283B'
  )
  document.documentElement.style.setProperty(
    '--input-color',
    colorScheme === 'light' ? '#45432B' : '#ACA4CE'
  )
  document.documentElement.style.setProperty(
    '--textarea-background-color',
    colorScheme === 'light' ? 'white' : '#2D283B'
  )
  document.documentElement.style.setProperty(
    '--menu-item-color',
    colorScheme === 'light' ? 'white' : '#2D283B'
  )
  document.documentElement.style.setProperty(
    '--button-color',
    colorScheme === 'light' ? '#955764' : '#8e99c0'
  )
  document.documentElement.style.setProperty(
    '--button-hover-color',
    colorScheme === 'light' ? '#a1a14e' : '#737ba7'
  )
  document.documentElement.style.setProperty(
    '--button-text-color',
    colorScheme === 'light' ? '#eae3e8' : '#2d283b'
  )
  document.documentElement.style.setProperty(
    '--menu-hover-color',
    colorScheme === 'light' ? '#eae3e8' : 'black'
  )
}
