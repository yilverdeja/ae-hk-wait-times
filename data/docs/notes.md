## Wait Time API Available (HK Sanitorium)
`hk-sanitorium` has wait time data available at: https://patser.hksh.com/fmcwaitingtime?lang=en

The APIs are:
* [For waiting status indicators](https://api-hkshpatser-a8bsf4a5gzcyhqhu.z01.azurefd.net/api/static/WaitingStatus)
* [For actual waiting times](https://api-hkshpatser-a8bsf4a5gzcyhqhu.z01.azurefd.net/api/static/FmcWaitingTime?requestBody=Return_FMC_Waiting_Time_2024)

## HA public charges (2026 fee reform)

| Service | Eligible (HKID) | Non-eligible |
|---------|-----------------|--------------|
| Family Medicine Clinic (FMC) attendance | HK$150 | HK$500 |
| FMC drug (per item dispensed) | HK$5 | HK$40 |
| Public hospital A&E attendance | HK$400 | HK$2,100 |

Sources: `data/ha/public-charges.ts`, `data/ha/urls.ts` (HA visitor charges page). FMC list: `data/ha/facility-fmc.json` (from HA opendata).

## Updates for the app
* Need to add more vouchers, and find all alternative options that take this vouchers
* FMC entries: per-clinic phones/hours to be added when PDF details are available

## Future improvements
* Add a comparison page that will compare costs + waiting time in public hospital, to an alternative care option nearby (with best time to go)
  * Looks at users symptoms or issues (simple filter), and can determine level of urgency, current costs and wait time if going now, and maybe a better time to go later

* Add a filter's on /alternatives page
  * HKID holder or not
  * Voucher (HCVS) only
  * Sort by cost (default cheapest first)
  * Filter by cost
  * Filter by region
  * Filter by allowing walk-in, or need appointment (default set to allow walk in)


* Update /alternative cards OR show as a table
  * Instead of "HK$X now" show the time frame in which it's active
  * If the time frame is expiring soon (i.e. less than 30 minutes, show the next time frame cost)
  * Instead of "Open 24 hours", say something like "Open now" or "Closed"

* Show alternatives in a map