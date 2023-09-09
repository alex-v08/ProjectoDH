export const getCategories = async urlCategories => {
  try {
    const response = await fetch(`${urlCategories}`)
    if (!response.ok) {
      throw new Error('Error al realizar la petición: ' + response.status)
    }
    const jsonData = await response.json()
    return jsonData
    //setCategories(jsonData)
  } catch (error) {
    console.error('Error al realizar la petición: ', error)
  }
}

export const doSearch = async (urlSearch, idCategory) => {
  try {
    const response = await fetch(`${urlSearch}?categoriesId=${idCategory}`)
    if (!response.ok) {
      throw new Error('Error al realizar la búsqueda: ' + response.status)
    }
    const jsonData = await response.json()
    return jsonData
    //setResults(jsonData)
  } catch (error) {
    console.error('Error al realizar la búsqueda: ', error)
  }
}

export const getAllUseClient = async (url, set, setLoading) => {
  setLoading(true)
  try {
    const response = await fetch(url, {
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const all = await response.json()
    set(all)
    setLoading(false)
  } catch (error) {
    console.error('Error fetching data:', error)
    setLoading(false)
  }
}
