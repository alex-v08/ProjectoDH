export const getAllUseClient = async (url, set) => {
  try {
    const response = await fetch(url, {
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const all = await response.json()
    set(all)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
