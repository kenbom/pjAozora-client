import React from "react";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { GraphQLClient, request, gql } from "graphql-request";
import { BASE_URL } from "../../../config/constants";
import { atom, useRecoilState } from "recoil";
import type { StrdMenuItem } from "../../../store/strdStates";
import { strdMenuItem } from "../../../store/strdStates";
import { useCustomToast } from "../../app/hooks/useCustomToast";
// import {useCustomToast} from ""
import type { ShiwakeInput } from "../../shiwakeTouroku/ShiwakeTouroku";
import type { Shiwakes } from "./useSeisanHyou";
import { queryKeys } from "../../../config/queryKeys";
import { useSeisanHyou } from "./useSeisanHyou";
import Router  from "next/router";

type ShiwakeId = {
    input:{
    shiwakeId: string,
    }
}

async function setSeisanHyouSakujo(input: ShiwakeId) {
    console.log(`checkIdUse:${JSON.stringify(input)}`)
    const endpoint = BASE_URL;
    const tokenObj = localStorage.getItem("token");
    // const auth = undefined
    const auth=tokenObj?JSON.parse(tokenObj):undefined
    if(!tokenObj) Router.push('/signin')
    // const auth = JSON.parse(tokenObj);
    // const input = JSON.parse(strInput)
    const client = new GraphQLClient(endpoint, {
        headers: {
            authorization: auth,
        },
    });
    const mutation = gql`
    mutation shiwakeDelete($input: ShiwakeDeleteArgs) {
      shiwakeDelete(input: $input) {
        userErrors {
          message
        }
      }
    }
  `;
    const requestHeaders = {
        authorization: auth,
    };
    const data = await client.request(mutation, input, requestHeaders);
    // console.log(`returnedData:${JSON.stringify(data)}`);
}

export function useShiwakeSakujo(): UseMutateFunction<
    void,
    unknown,
    ShiwakeId,
    unknown
> {
    const toast = useCustomToast();
    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        (newShiwakeId: ShiwakeId) => setSeisanHyouSakujo(newShiwakeId),
        
        {
            onSuccess: () => {
                queryClient.refetchQueries([queryKeys.useSeisanHyou]);
                queryClient.invalidateQueries([queryKeys.useShiwakeTouroku]);
                toast({
                    title: "削除完了しました。",
                    status: "success",
                });
            },
        }
    );
    return mutate;
}
