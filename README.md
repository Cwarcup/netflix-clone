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

