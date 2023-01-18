# Netflix Clone

## User Stories

- As a user, I want to be able to login to my account
- I want to be able to see a list of videos
- I want to be able to play a video
- The app should be responsive
- I want to be able to like/dislike a video
- I want to be able to view my favourite videos
- I want to be able to view videos I have already watched
- I want to discover new videos by topic/category

## Features

- Users can login to their account with email, no password needed
  - Magic link sent to email
- Video content is created by using Youtube videos API
- Responsive app, mobile first
- SSR: all content on main page is SSR, improved performance
- Clicking a video fetches the videos content
- Can play, like/dislike, add to favourites
- Store and view favourite videos
- graphQL
- ‘Watch again’ section to view videos you have already watched
- ISG

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/)
- [Magic](https://magic.link/)

## Component Architecture

Netflix has a pretty complex UI, but let's break it down into components.

- Header/Navbar
  - Logo
  - Favourites List
  - Profile
- Banner
  - Large image
  - Title, Description
  - Play button
- Categories List
  - Title
  - List of videos (Card)
    - On hover...
      - Title, Description, Play button, Like/Dislike button
- Feature Section
  - Tall images list

## Data Fetching

Static Site Generation (SSG) was not the best option for this project, as the data depends on the logged in user. We face a similar issue if we try to use Incremental Site Regeneration (ISR) with `getStaticProps` and  `revalidate` option. We don't know which videos the user has liked, or which videos they have already watched.

Client Side Rendering (CSR) would work, but because we are fetching and loading video data, it would be slow.

So we need to fetch the data on the server side, and then send it to the client. This is called Server Side Rendering (SSR). Content is loaded on the server, and then sent to the client. This is the best option because the server takes care of fetching, processing and sending the data to the client. That being said, one downside is that every time a user visits the page, the server has to fetch the data again.

## Sign In

The user can sign in with their email. We use [Magic](https://magic.link/) to send a magic link to the user's email. The user can then click the link to sign in.

Instead of storing passwords, we use Magic to generate a public and private key on the client side. Therefore, users own their data, and we don't have to store passwords. Magic then generates a [DID (Decentralized Identifier)](https://magic.link/docs/auth/introduction/decentralized-id) for the user, which is a unique identifier for the user. We can then use this DID to identify the user.

## Playing Videos

Used the [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference) to embed videos within an iframe. The YouTube Player API allows us to control the video, such as play, pause, seek, etc.

One struggle was displaying a gradient over the `iframe` YouTube element. Because the gradient sits on top of the video, the native play and pause buttons could not be clicked. To get around this, I updated the player attribute to autoplay when the user clicks the video. This also causes the gradient to be hidden, so the user can click the native play and pause buttons. I don't love this solution, but it works for now.

## Fetching Data

As we know, Next.js provides multiple methods for fetching data. We can use [`getStaticProps` ](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)to fetch data at build time (SSG), or [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to fetch data at request time. We can also use [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props) to fetch data on the client side.

For the banner component, I decided to use static site generation (SSG). The banner component is the same for every user, so it makes sense to fetch the data at build time.

For the specific video page ('/video/:id'), I decided to use incremental site regeneration using `getStaticProps` with the `revalidate` option. This means that the page will be regenerated at a specific time interval.