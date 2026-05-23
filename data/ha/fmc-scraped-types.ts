/** Scraped clinic details (English) from HA Family Medicine Clinic pages. */
export interface FmcScrapedDetail {
    name: string
    address: string
    contacts: {
        clinic: string[]
        booking: string[]
    }
    hours: {
        registration: string[]
        consultation: string[]
    }
}
