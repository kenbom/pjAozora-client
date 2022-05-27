import React from "react";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { GraphQLClient, request, gql } from "graphql-request";
import { BASE_URL } from "../../../config/constants";
import { atom, useRecoilState } from "recoil";
import type { StrdMenuItem } from "../../../store/strdStates";
import { strdMenuItem } from "../../../store/strdStates";
import { useCustomToast } from '../../app/hooks/useCustomToast';
// import {useCustomToast} from ""
import type { ShiwakeInput } from "../ShiwakeTouroku";
import type { Shiwakes } from "../../seisanHyou/hooks/useSeisanHyou";
import { queryKeys } from "../../../config/queryKeys" 
import {useSeisanHyou} from "../../seisanHyou/hooks/useSeisanHyou"
import Router from "next/router";

async function setSeisanHyou(input: ShiwakeInput) {
  const endpoint = BASE_URL;
  const tokenObj = localStorage.getItem("token")
  const auth = tokenObj ? JSON.parse(tokenObj) : undefined;
  if (!tokenObj) Router.push("/signin");
  const client = new GraphQLClient(endpoint, {
    headers:{
      authorization: auth
    },
  });
  const mutation = gql`
    mutation ShiwakeCreate($input: ShiwakeCreateArgs) {
    shiwakeCreate(input: $input) {
    
    userErrors {
      message
      }
    }
  }                          
  `;
  const requestHeaders = {
    authorization:auth
  }
  const data = await client.request(mutation, input, requestHeaders);
  // console.log(`returnedData:${JSON.stringify(data)}`)
}

export function useShiwakeTouroku(): UseMutateFunction<
  void,
  unknown,
  ShiwakeInput,
  unknown
> {
    const toast = useCustomToast();
    const queryClient = useQueryClient();

    const { mutate } = useMutation((newshiwakeInput: ShiwakeInput) =>
      setSeisanHyou(newshiwakeInput),
      {
        onSuccess: () => {
          queryClient.refetchQueries([queryKeys.useSeisanHyou])
          queryClient.invalidateQueries([queryKeys.useShiwakeTouroku]);
          toast({
            title: '登録完了しました。',
            status: 'success',
          });
        },
      }
    );
    return mutate;
}
