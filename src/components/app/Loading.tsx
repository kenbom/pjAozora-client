import { Spinner, Text, Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useIsFetching, useIsMutating } from "react-query";

export function Loading(): ReactElement {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const display = isFetching || isMutating ? "inherit" : "none";

  return (
    // <Box>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.600"
        role="status"
        position="fixed"
        zIndex="9990"
        top="450px"
        left="550px"
        transform="translate(-50%, -50%)"
        display={display}
      >
        <Text display="inherit" fontWeight="black" color="gray.600">Loading...</Text>
      </Spinner>
    // </Box>
  );
}
