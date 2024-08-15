![Vercel Deploy](https://deploy-badge.vercel.app/vercel/ae-hk-wait-times)

# Hong Kong Accident & Emergency Wait Times

Revamping the [original A&E Wait Time page](https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=235504&Lang=ENG) using NextJS and Flask by using a responsive design, real-time filtering, and hourly wait trends to optimize visit planning.

## Features

Using the [A&E Wait Times Open Data API](https://data.gov.hk/en-data/dataset/hospital-hadata-ae-waiting-time), we can retrieve the current snapshot, in addition to historical snapshots at 15 minute intervals of every A&E hospital. Currently, this application can:

- Display the estimated wait times of each hospital with a dynamic table that can be sorted by their name or wait times, and filtered by their region
  - Data is automatically retrieved and updated every 15-17 minutes
- Clicking on a hospital opens a side modal with more in depth information:
  - Hospital information like google maps address, contact information, and relevant links
  - A text displaying the current wait time relative to the average wait time on that specific day and hour
  - A bar chart to show the hourly trend of each day from Monday to Sunday. The trend is shown in blue, whilst the current wait time is overlayed with a single pink bar
- Responsive for desktop and mobile applications
- "Understanding the Wait" modal to let users understand better how wait times are generated and what they mean
- A dark and light mode theme toggle

## Demo

https://ae-hk-wait-times.vercel.app/

## Tech Stack

This app was developed with Typescript, NextJS, and [shadcn/ui](https://ui.shadcn.com/) with TailwindCSS for easier development. Using Flask as the API backend. The starter template was generated from the [NextJS Flask Starter Boilerplate](https://vercel.com/templates/next.js/nextjs-flask-starter)

### Why Flask?

Honestly, for the current implementation, there was no need. However, this project started with a simple idea: **Can I create machine learning models to predict future wait times?**

I would still love to have this as a possible feature in the future. Within the `/python` directory you can find the historical `/data`, the basic trained `/models` for each hospital, and jupyter `/notebooks` testing out the process.

## What Inspired Me?

### TLDR;

I needed to use the A&E hospital services, but due to a recent typhoon, the wait times of all hospitals were estimated at 8+ hours... except for the hospital at Cheng Chau island. I took the ferry over, and instantly got admitted when I arrived to the hospital.

Even though the general public can see a snapshot of the estimated wait times at 15 minute intervals, it doesn't help us predict how busy it will be in the future. What if I could do that?

### Story Time

In the summer of 2023, I sprained my left shoulder AC joint playing volleyball. Following the game, there was a typhoon in Hong Kong. The pain wasn't immediate, but it eventually followed with a very limited range of motion, and pain with slight movements.

However, due to the typhoon, trying to make appointments to visit a public general doctor was next to impossible. _Note: Booking a doctor in the public system on normal days is hard enough already._

My friends suggested going to the A&E instead as I wouldn't have to rely on a booking to get admitted - I could just walk in and then wait in line. So I walked into the [Queen Mary Hospital](https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100131) and saw how packed it was. I got a ticket, and asked the nurse how long it would take, and she said it would be more than 8 hours!

I couldn't imagine waiting there for more than 8 hours. Even if I decided to leave then come back, what if I missed my appointment? Could I rely on the hospital app to remind me on when to come back? I didn't feel comfortable taking that risk.

That's when I learned that the [hospital authority has a site with an estimated wait time of each of their A&E hospitals](https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=235504&Lang=ENG). At that time, each hospital had an 8+ hour wait... except for [St John Hospital in Cheng Chau island](https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100146) with "Around 1 hour" of wait.

So I decided to take a little day trip to Cheng Chau and take my chances - The moment I arrived to the hospital, I instantly got admitted. We went through the process of getting a checkup, an X-ray, an analysis, then getting a customized sling in the Occupational Therapy department in a span of 2 hours.

It was a fun trip, but taking the ferry to another island is not for everyone. So it begged the question... how could we plan our visits better to avoid the wait?

## Local Development

### Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

## Improvements

### API

The API doesn't follow RESTUL practices. In certain cases, it doesn't return a JSON, and for the hourly hospital trend endpoint it returns a value and the endpoint is confusing.

Perhaps it would be better to combine

```python
# get the following endpoints
@app.route("/api/hospitals/<string:slug>/trend")
def get_hospital_trend(slug): pass
@app.route("/api/hospitals/<string:slug>/hourly-trend/<int:day>/<string:hour>")
def get_hourly_hospital_trend(slug, day, hour): pass

# and combine them into one and use query parameters for day and hour
@app.route("/api/hospitals/<string:slug>/trend")
def get_hospital_trend(slug): pass
```

### Cleanup Types

Commonly used types can be found in `/lib/types.ts` but it's not structured, and hard to understand.

### Add Chinese
For Chinese speakers, add the option to switch between English, Traditional or Simplified Chinese.

### Display previous hourly averages on current day

On the hospital chart for the current day, rather than only displaying a bar with the wait time at the current hour, also show the previous hour wait times so users can see if the it's following a trend or not.

### Show map

Similar to the original site, it would be helpful to have a view of the hospitals on a map with their current wait times.

### Predict Future Wait Times

Create machine learning models to predict future wait times and display them appropriately on the chart view.
