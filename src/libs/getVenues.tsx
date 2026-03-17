export interface VenueItem {
  id: string
  name: string
  picture: string
  address: string
  province: string
  postalcode: string
  dailyrate: number
}

export interface VenueJson {
  success: boolean
  count: number
  data: VenueItem[]
}

export default async function getVenues(): Promise<VenueJson> {
  const response = await fetch('https://a08-venue-explorer-backend.vercel.app/api/v1/venues')

  if (!response.ok) {
    throw new Error('Failed to fetch venues')
  }

  return await response.json()
}