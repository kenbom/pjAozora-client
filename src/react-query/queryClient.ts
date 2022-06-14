import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';
import Router from "next/router";

const toast = createStandaloneToast();

function queryErrorHandler(error: unknown): void {
    const title =
        error instanceof Error ? error.message : 'error connecting to server';

    toast.closeAll();
    toast({ title, status: 'error', variant: 'subtle', isClosable: true });
    Router.push("/signin")
}

export function generateQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                onError: queryErrorHandler,
                staleTime: 600000, 
                cacheTime: 900000, 
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
            },
            mutations: {
                onError: queryErrorHandler,
            },
        },
    });
}

export const queryClient = generateQueryClient();
