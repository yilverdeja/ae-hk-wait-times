# Improvements

## Research Findings
1. A&E Misuse because of lack of alternative care services, low public awareness and financial consideration (entry to A&E now is 400HKD)
2. Only 3.1% of patients know about wait time data, and they are willing to travel an additional 4.8km to save an hour of waiting
3. Urgent patients are less likely to look at wait time information (as expected). Less urgent are more likely.
4. Providing predicted WT information (1-hour median predicted WT) instead of current 95th percentile would be more beneficial for patients.
5. To promote Wait time announcements and increase awareness, we should focus more on the OLDER population and Kowloon districts
6. Cat 4/5 Wait times spike during shifts where staffing is optimized only for Cat 1–3 targets. By incorporating staffing shift-patterns, we can help predict better times.

### Main Takeaways
1. Overuse for Cat 4/5 from older patients (especially in kowloon) who are unaware of alternatives, and how much A&E costs and other services cost
2. Using predicted wait time information is more beneficial than the current 95th percentile wait times. Instead of just using wait time data, also add temporal patterns of staffing shifts, and additional information that might affect wait time days

### Ways to improve our site
1 Show other facilities, and display availability by the hours of day. So don't show clinics at 12AM when they're not available.
2. Show telehealth services. The older population may like physical checks more thann online so this may not cater well for them.
3. Show the cost of the services, especially A&E, but also consultation fees for other services if possible.
4. Create a manifest file so it can be added to phone as an app for easy accessibility (for older population)
5. Find a way to get the Primary Care Directory information (https://apps.pcdirectory.gov.hk/Public/EN/SearchResult) which does not have an API, but seems to be auto-updated by the doctors themselves.
6. Create predictive models and add to trend data so users can figure out what the next few hours may look like
7. Fix map such that it show's the current users location, and perhaps help them determine how long it would take to get to specific places
8. Allow users to self-triage with a note saying that this is not official. Allow users to chat to a chatbot to help determine the best needs for them.
9. Add other physical services people can visit

## Simple Improvements
1. Create a seperate page for all hospitals/clinics, allow filtering by time, public/private, facilities, cost etc. This will serve as a directory.
2. Create another page for all telehealth services as another directory.
3. Fix and add user's marker on the map
4. Add a filter toggle to view other clinics on the map
5. Show previous wait times in the current day

## ML ideas
1. Look at strategy 1 in research.md, and create a plan for getting A&E data and finding the median, and maybe even doing predictions of the times in the next 1-3 hours ahead


