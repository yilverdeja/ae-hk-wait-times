import { i18n } from "@/lib/i18n"
import { LocalizedString, Region } from "@/types"

/**
 * A map providing the localized names for each Region enum member.
 */
export const regionNames: Record<Region, LocalizedString> = {
    [Region.HongKongIsland]: i18n("Hong Kong Island", "香港島"),
    [Region.Kowloon]: i18n("Kowloon", "九龍"),
    [Region.NewTerritories]: i18n("New Territories", "新界"),
}
