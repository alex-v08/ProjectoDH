import { NextResponse } from 'next/server'

async function fetchCategories() {
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  const response = await fetch(`${hostUrl}/api/category/all`, {
    cache: 'no-store'
  })
  const data = await response.json()
  const results = Array.from(data)
  return results
}

export async function GET() {
  const results = await fetchCategories()
  return NextResponse.json(results)
}
