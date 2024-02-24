import type { VideoStatsType, GetWatchedVideosType } from "../../types"

// operationsDoc is the GraphQL query or mutation
// operationName is the name of the query or mutation
// variables are the variables used in the query or mutation, is an object, can be empty
// passing in the token and using it in the headers
export async function queryGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: any,
  token: string
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  const json = await result.json()
  return json
}

// checks to see if a user exists in the database
export async function isNewUser(token: string, issuer: string | null): Promise<boolean> {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    my_new_schema_users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`

  const response = await queryGraphQL(
    operationsDoc,
    "isNewUser",
    {
      issuer,
    },
    token
  )

  // return response.data.Users.length === 0
  // Check if response.data exists and has Users property
  if (response.data && response.data.my_new_schema_users) {
    return response.data.my_new_schema_users.length === 0
  } else {
    // Log the error response if there's no data or Users property
    console.error("[Hasura response error]:", response)
    throw new Error("Failed to fetch Users")
  }
}

// adds a new user to the database
export async function addUser(
  token: string,
  issuer: string | null,
  publicAddress: string | null,
  email: string | null
): Promise<any> {
  const operationsDoc = `
  mutation addUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_my_new_schema_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`
  const response = await queryGraphQL(
    operationsDoc,
    "addUser",
    {
      issuer,
      publicAddress,
      email,
    },
    token
  )

  return response
}

// get a users stats for a specific video
export async function findVideoIdByUserId(
  token: string,
  userId: string | null,
  videoId: string | null
): Promise<VideoStatsType | null> {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    my_new_schema_stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
      id
      userId
      videoId
      favourited
      watched
    }
  }
`

  // userId needs to be the token issuer (did:ethr:0x92b...)
  const response = await queryGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      videoId,
      userId,
    },
    token
  )

  return response?.data?.stats.length > 0 ? response.data.stats : null
}

// update a users stats for a specific video
export async function updateStats(
  token: string,
  { favourited, userId, watched, videoId }: VideoStatsType
) {
  const operationsDoc = `
mutation updateStats($favourited: Boolean, $userId: String!, $watched: Boolean!, $videoId: String!) {
  update_my_new_schema_stats(
    _set: {watched: $watched, favourited: $favourited}, 
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}
    }) {
    returning {
      favourited,
      userId,
      watched,
      videoId
    }
  }
}
`

  return await queryGraphQL(
    operationsDoc,
    "updateStats",
    { favourited, userId, watched, videoId },
    token
  )
}

export async function insertStats(
  token: string,
  { favourited, userId, watched, videoId }: VideoStatsType
): Promise<{
  favourited: boolean
  userId: string
  watched: boolean
  videoId: string
}> {
  const operationsDoc = `
  mutation insertStats($favourited: Boolean, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_my_new_schema_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      watched: $watched, 
      videoId: $videoId
    }) {
        favourited
        userId
        watched
        videoId
    }
  }
`

  return await queryGraphQL(
    operationsDoc,
    "insertStats",
    { favourited, userId, watched, videoId },
    token
  )
}

// query to return all videos that a user has watched
export async function getWatchedVideos(
  token: string,
  userId: string
): Promise<GetWatchedVideosType[]> {
  const operationsDoc = `
  query getWatchedVideos($userId: String!) {
    my_new_schema_stats(where: {
        userId: {_eq: $userId},
        watched: {_eq: true}}
        ){
      videoId
    }
  }
`

  const response = await queryGraphQL(
    operationsDoc,
    "getWatchedVideos",
    { userId },
    token
  )

  return response?.data?.stats ?? []
}

export async function getMyListVideos(
  token: string,
  userId: string
): Promise<GetWatchedVideosType[]> {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    my_new_schema_stats(where: {
      userId: {_eq: $userId}, 
      favourited: {_eq: true}
    }) {
      videoId
    }
  }
`

  const response = await queryGraphQL(
    operationsDoc,
    "favouritedVideos",
    {
      userId,
    },
    token
  )

  return response?.data?.stats
}
