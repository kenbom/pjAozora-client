import React from 'react'
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { GraphQLClient, request, gql } from "graphql-request";
import { BASE_URL } from "../../../config/constants";
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { queryKeys } from "../../../config/queryKeys"
import Router from 'next/router';

type SigninArgs = {
    credentials: {
        mail: string
        password: string
    },
}

async function setSignin(credentials: SigninArgs) {
    const endpoint = BASE_URL
    const client = new GraphQLClient(endpoint)

    const mutation = gql`
        mutation Signin($credentials: CredentialsInput) {
        signin(credentials: $credentials) {
            token 
            }
        }
    `
    const serverToken = await client.request(mutation, credentials)
    const lclStrg = await JSON.stringify(serverToken.signin.token)
    await localStorage.setItem("token", lclStrg)
}

export function useSigninAuth(): UseMutateFunction<
    void,
    unknown,
    SigninArgs,
    unknown
> {
    const toast = useCustomToast()
    const queryClient = useQueryClient()

    const { mutate } = useMutation((newSigninArgs: SigninArgs) =>
        setSignin(newSigninArgs),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([queryKeys.useSigninAuth]);
                toast({
                    title: 'トークン取得しました。',
                    status: 'success',
                });
                queryClient.refetchQueries([queryKeys.useSeisanHyou])
                Router.push("/")
            },
            onError: () => {
                Router.push("/signin")
            }
        }
    );
    return mutate
}


