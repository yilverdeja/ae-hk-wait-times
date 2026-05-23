/** One row from HA opendata `facility-fmc.json`. */
export interface HaFmcFacilityRow {
    cluster_eng: string
    institution_eng: string
    address_eng: string
    cluster_tc: string
    institution_tc: string
    address_tc: string
    cluster_sc: string
    institution_sc: string
    address_sc: string
    latitude: number
    longitude: number
}
