# Netflix Clone

![Netflix Clone](/public/static/netflix-clone-preview.png)

## Live Website

In order to view the live website, you will need to sign in with your email. You can use any email address, no password is required. Once you sign in, you will be able to view the videos, like/dislike videos, and view your favourites list.

Link: [https://netflix-clone-cwarcup.vercel.app/](https://netflix-clone-cwarcup.vercel.app/)

## Preview and Demo Clips

<details>
<summary>Check out a few video examples!</summary>
<br>

![Login Process with Magic](https://media3.giphy.com/media/ymP37FR6ysb0UO9PYM/giphy.gif?cid=790b761178b5bdd93f316a49ab10f9c0b61ac857e9298293&rid=giphy.gif&ct=g)

![Discover videos, like/dislike](https://media4.giphy.com/media/Uk04F9P3ZNA3OtHQgU/giphy.gif?cid=790b76115f93b8db3499249e81a7615dcc3eba21a39983d6&rid=giphy.gif&ct=g)

![View and like a video](https://media4.giphy.com/media/t0DtMGwAEDO5g6xm37/giphy.gif?cid=790b76119e93a37ef0ce97369eec93c35df70d3c2952f1f2&rid=giphy.gif&ct=g)

</details>

![Homepage image](/public/static/readmeImages/homepage.png)

<details>
<summary>More Images</summary>
<br>

![Dynamic Pages Image](/public/static/readmeImages/dynamic-page.png)

![My-List of favourited videos](/public/static/readmeImages/my-list.png)

</details>


## User Stories

Users should ba able to:

- login to their account with email, no password needed
- see a list of videos
- play a video
- be responsive on mobile
- like/dislike a video
- view favourited videos (liked videos)
- view videos they have already watched
- discover new videos by topic/category

## Tech Stack

- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Hasura](https://hasura.io/)
- [Supabase](https://supabase.io/)
- [GraphQL](https://graphql.org/)
- [Magic](https://magic.link/)
- [Cookie](https://github.com/jshttp/cookie#readme)
- [JWT](https://jwt.io/) and [Jose](https://github.com/panva/jose#readme) to sign and verify JWTs

## Component Architecture

The real Netflix app has a pretty complex UI, but to break it down into simple components it looks something like this:

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

I used these as the basis for my component architecture.

## Sign In

The user can sign in with their email. I used [Magic](https://magic.link/) to send a link to the user's email and once they click the link, they are signed in.

Instead of storing passwords, I used Magic to generate a public and private key on the client side. Instead of creating and storing passwords in a database I control, Magic generates a [DID (Decentralized Identifier)](https://magic.link/docs/auth/introduction/decentralized-id) for the user, which is a unique identifier for the user. I used the DID to identify the user and store their watch data in a [Supabase](https://supabase.com/) database.

## Playing Videos

Videos are displayed using the  [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference) to embed videos within an iframe. This allows us to control the video using JavaScript, however it created some challenges.

One struggle was displaying a gradient over the `iframe` YouTube element. Because the gradient sits on top of the video, the native play and pause buttons could not be clicked. To get around this, I updated the player attribute to auto-play when the user clicks the video. This also causes the gradient to be hidden, so the user can click the native play and pause buttons. I don't love this solution, but it works for now.

## Fetching Data

As we know, Next.js provides multiple methods for fetching data. We can use [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) to fetch data at build time (SSG), or [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to fetch data at request time. We can also use [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props) to fetch data on the client side.


For the specific video page ('/video/:id'), I decided to use [incremental site regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) using `getStaticProps` with the `revalidate` option. This means that the page will be regenerated at a specific time interval.

Some of the pages I could create statically at build time, and some of the pages I could create at request time. For example, the banner video will always be the same, so I could create that page statically at build time. However, the video page will change depending on the video, so I could create that page at request time.

## GraphQL and Database

I used [Hasura](https://hasura.io/docs/latest/databases/connect-db/index/) to create a GraphQL API. Hasura is a GraphQL engine that connects to a Postgres database.

For my database, I used a Postgres database hosted by [Supabase](https://supabase.io/). Supabase is an open source Firebase alternative. It provides a Postgres database, and a GUI to create tables, and to query the database.

### Architecture

|            | Users              |                   |                  |         |
| ---------- | ------------------ | ----------------- | ---------------- | ------- |
| **column** | **issuer (PK)**    | **publicAddress** | **email**        | **id**  |
| **type**   | **text**           | **text**          | **text**         | **int** |
|            | did:ethr:0x92bc... | 0x92bc...         | info@cwarcup.com | 1       |

I used the Decentralized ID from Magic to identify the user and is the primary key for the users table. The [`getMetadata`](https://magic.link/docs/auth/api-reference/client-side-sdks/web#getmetadata) method returns an object with the user's public address, email, and DID.

|            | Stats       |                    |             |                     |             |
| ---------- | ----------- | ------------------ | ----------- | ------------------- | ----------- |
| **column** | **id (PK)** | **userId (FK)**    | **videoId** | **favourited**      | **watched** |
| **type**   | **int**     | **text**           | **text**    | **boolean or Null** | **boolean** |
|            | 1           | did:ethr:0x92bc... | Lcd0df7jwpM | true                | true        |

The stats table stores information about the user's interactions with a video. The `userId` is the user's DID, and the `videoId` is the YouTube video ID. The `favourited` column is a boolean that indicates whether the user has liked/disliked the video. The `watched` column is a boolean that indicates whether the user has watched the video.

I created a `user` role to ensure that only that user has access to their data. I used a [JSON Web Token (JWT)](https://jwt.io/introduction) token to [authenticate the user](https://hasura.io/docs/latest/auth/authentication/index/#2-jwt-json-web-token).

## Authentication `api/auth`

Created an [API route](https://nextjs.org/docs/api-routes/introduction) (`/api/auth`) to handle authentication. The API route uses the [Magic Admin SDK](https://magic.link/docs/auth/login-methods/email/integration/server-side/node) NodeJS implementation to authenticate the user. The API route returns a [JWT token](https://jwt.io/introduction) to the client. The client then stores the JWT token in a [cookie](https://github.com/jshttp/cookie#readme).

### Middleware

Next.js provides a [middleware](https://nextjs.org/docs/middleware) feature. Middleware is a function that is executed before a request is sent to the API route. I used the middleware to verify the JWT token from the browsers cookie.

I initially used [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) to handle the signing and verification of the JWT token. However, because the middleware was being run on Next.js' Edge Runtime, I didn't have access to the Native NodeJS modules, and therefore some of the methods in the `jsonwebtoken` package were not available. I decided to use [jose](https://www.npmjs.com/package/jose) instead.

### Authentication Flow

The JWT token contains information about the user, such as their email, public address, and DID. When a user logs in, a new JWT token is generated, GraphQL queries Hasura to see if the user exists in the database by using the newly created JWT token (remember, this has 3 parts).  If the user exists, user is logged in and the JWT token is stored in a cookie. If the user *doesn't* exist, GraphQL mutation occurs to create a new user in the database. The user is then logged in and the JWT token is stored in a cookie.

> The database is setup to only allow a user to access their own data unless they have `X-Hasura-Role` set to `admin` and have the `x-hasura-admin-secret`. This ensures that a user can only access their own data.

## User Stats `api/stats`

The `stats` API is used to read the token from the cookie created during the authentication process. The JWT token if verified using the [Magic SDK](https://magic.link/docs/sdk-for-web) and then queried against the database. If the stats for that user do not exist, they are created. If the stats do exist, they are returned to the client.

The API's purpose is to allow a user to like/dislike a video, as well as view previously watched videos.