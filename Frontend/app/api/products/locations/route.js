import { NextResponse } from 'next/server'

async function fetchLocations() {
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  const response = await fetch(`${hostUrl}/api/location/all`, {
    cache: 'no-store'
  })
  const data = await response.json()
  const results = Array.from(data)
  return results
}

export async function GET() {
  const results = await fetchLocations()
  return NextResponse.json(results)
}
