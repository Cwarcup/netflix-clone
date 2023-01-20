// operationsDoc is the GraphQL query or mutation
// operationName is the name of the query or mutation
// variables are the variables used in the query or mutation, is an object, can be empty

export async function queryGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: any
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}
