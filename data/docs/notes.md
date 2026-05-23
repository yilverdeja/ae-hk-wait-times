## Wait Time API Available (HK Sanitorium)
`hk-sanitorium` has wait time data available at: https://patser.hksh.com/fmcwaitingtime?lang=en

The APIs are:
* [For waiting status indicators](https://api-hkshpatser-a8bsf4a5gzcyhqhu.z01.azurefd.net/api/static/WaitingStatus)
* [For actual waiting times](https://api-hkshpatser-a8bsf4a5gzcyhqhu.z01.azurefd.net/api/static/FmcWaitingTime?requestBody=Return_FMC_Waiting_Time_2024)

## Updates for the app
* Need to add more vouchers, and find all alternative options that take this vouchers
* Need to get a list of all public hospitals so we can connect it to the app for alternative care times

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