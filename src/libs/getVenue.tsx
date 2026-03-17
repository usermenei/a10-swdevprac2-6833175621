export interface VenueDetail {
  id: string
  name: string
  picture: string
  address: string
  district: string
  province: string
  postalcode: string
  tel: string
  dailyrate: number
}

export interface VenueDetailJson {
  success: boolean
  data: VenueDetail
}

export default async function getVenue(id: string): Promise<VenueDetailJson> {
  const response = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${id}`, {
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch venue')
  }

  return await response.json()
}

