import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box w="890px" borderBottom="2px" borderBottomColor="blue.300" m={2}>
      <Flex>
        <Box m={2} fontSize="xl">
          らくらく！青色申告
        </Box>
        <Spacer />
        <Box m={2}>損益計算書</Box>
        <Box m={2}>貸借対照表</Box>
      </Flex>
    </Box>
  );
};
