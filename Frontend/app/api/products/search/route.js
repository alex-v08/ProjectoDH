import { NextResponse } from 'next/server'

async function fetchProducts() {
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  const response = await fetch(`${hostUrl}/api/products/all`, {
    cache: 'no-store'
  })
  const data = await response.json()
  const setOfProducts = new Set()
  while (setOfProducts.size < data.length) {
    const randomIndex = Math.floor(Math.random() * data.length)
    setOfProducts.add(data[randomIndex])
  }
  const results = Array.from(setOfProducts)
  return results
}

export async function GET(request) {
  const results = await fetchProducts()
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const filteredBoats = results.filter(boat => {
    return boat.category.includes(query)
  })
  return NextResponse.json(filteredBoats)
}
