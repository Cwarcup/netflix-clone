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

  return await result.json()
}

// checks to see if a user exists in the database
export async function isNewUser(
  token: string,
  issuer: string | null
): Promise<boolean> {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    Users(where: {issuer: {_eq: $issuer}}) {
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
  // if the user exists, return false, otherwise return true

  return response.data.Users.length === 0
}

// adds a new user to the database
export async function addUser(
  token: string,
  issuer: string | null,
  publicAddress: string | null,
  email: string | null
) {
  const operationsDoc = `
  mutation addUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_Users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
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
