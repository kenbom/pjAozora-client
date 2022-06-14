import React, { useState } from 'react'
import { GraphQLClient, request, gql } from "graphql-request";
import { BASE_URL } from "../../../config/constants";
import { UseMutateFunction, useQuery, useQueryClient } from "react-query"
import { queryKeys } from "../../../config/queryKeys"
import Router from 'next/router';

export type Shiwakes = {
  shiwakes: Shiwake[]
}

export type Shiwake = {
  id: number
  createdAt: number
  hasseiDate: number
  kariName: string
  kashiName: string
  kariKingaku: number
  tekiyou: string
}

async function getSeisanHyou(): Promise<Shiwakes> {
  const endpoint = BASE_URL
  const tokenObj = localStorage.getItem("token")
  const auth = tokenObj ? JSON.parse(tokenObj) : undefined
  if (!tokenObj) Router.push('/signin')
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: auth
    }
  })
  const query = gql`
     {
       shiwakes {
         id 
         hasseiDate
         createdAt
         kariName
         kashiName
         kariKingaku
         tekiyou
         userId
       }
     }
     `
  const data = await client.request(query)
  console.log(`atUseSeisanHyou:${JSON.stringify(data, undefined, 2)}`)
  return data
}

export function useSeisanHyou(): Shiwakes {
  const queryKey = queryKeys.useSeisanHyou
  const fallback: any = []
  const { data = fallback } = useQuery(queryKey, getSeisanHyou)
  return data

}
