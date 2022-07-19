# Setup
I used `Node.js` v16.13.0 and `yarn` v1.22.17 while developing. You can easily switch Node versions via `nvm`.

You can just run `yarn` to install everything and `yarn run dev` to setup the Vite server. Visit `localhost:3001` to view the site.

## TL;DR

I delivered a scrappy little NFT collection browser - Barnyard. I pull data directly from Trader Joe APIs. I also piggyback on TJ's CDN for image loading.

## Tools

* TypeScript
* React
* Semantic UI + `styled-components`
* React Router
* Vite (build system)
* ESLint + Prettier

## Features

* Collections browsing
* Collections infinite scroll
* Collections skeleton loading
* Basic collection statistics per card
* NFT collection browsing
* NFT collection infinite scroll
* NFT collection skeleton loading
* Basic NFT statistics per card
* NFT collection plain-text search
* NFT collection search query debouncing
* Error page / 404 when collection information can't be loaded

## Future Work

* **NFT Details** - The UI lacks a page to click into an individual NFT to view information. I was considering implementing a modal, but didn't get to it. I was considering a modal over a separate page to keep the user in the NFT browsing experience.
* **Top-Line NFT Collection Stats** - I don't surface these on the NFT collection browsing page.
* **NFT Collection Logo & Description** - I like how there's a representative logo and description on JoePegs per NFT collection. This is lacking in Barnyard.
* **Graphs / Charts** - I really like the way OpenSea allows users to quantitatively understand NFTs via charts in the "activity" section (https://opensea.io/collection/boredapeyachtclub/activity).
* **Filters / Sorts / Aggregations** - Both my collections view and NFT collection view lack filters, sorts, and aggregations. It would also be handy to extract metadata from IPFS (if TJ doesn't return this already) to build toggle filters based on NFT attributes (background color, character hats, etc.).
* **Components** - My components are scrappy here, and not super well-parameterized. This was also my first time using `styled-components`, so I'm sure there's a better way for me to re-use styling logic. I come from a MUI background, so there was some adjusting I had to do.
* **Paging** - I threw paging together in this prototype. I'd want to stress test it to make sure it doesn't skip pages on fast loading or otherwise double-load pages, since we load + `concat`. This was something on my mind but I didn't have time to strain-test it a lot.
* **Infinite Scroll** - It can feel a bit stiff sometimes. I'd want to improve this.