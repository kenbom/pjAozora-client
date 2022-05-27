import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { GraphQLClient, request, gql } from "graphql-request";
import { BASE_URL } from "../../../config/constants";
import { animationControls } from 'framer-motion';
import { UseMutateFunction, useQuery, useQueryClient } from "react-query"
import { queryKeys } from "../../../config/queryKeys"
import Router from 'next/router';
// import type { QueryObserverIdleResul } from "react-query"

// interface Shiwakes {
//   shiwakes: MiniShiwake[]
// }

export type Shiwakes={
shiwakes:Shiwake[]
}

export type Shiwake = {
  id:number
  createdAt: number
  hasseiDate: number
  kariName: string
  kashiName: string
  kariKingaku: number
  tekiyou: string
}

// const queryKey = queryKeys.useSeisanHyou

async function getSeisanHyou(): Promise<Shiwakes> {
  // const queryKey = queryKeys.useSeisanHyou
  const endpoint = BASE_URL
  const tokenObj = localStorage.getItem("token")
  const auth = tokenObj?JSON.parse(tokenObj):undefined
  if (!tokenObj) Router.push('/signin')
  const client = new GraphQLClient(endpoint, {
    headers:{
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
  // if (!data) Router.push('/signin')
  console.log(`atUseSeisanHyou:${JSON.stringify(data, undefined, 2)}`)
  // if(!data) return
  return data
}

export function useSeisanHyou(): Shiwakes {
  const queryKey = queryKeys.useSeisanHyou
  const fallback:any = []
  const { data = fallback } = useQuery(queryKey, getSeisanHyou)
  //console.log(data)
  return data

}
