import React, { VFC, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeftIcon } from "@chakra-ui/icons";

export const ShiwakeUnselected = () => {
  return (
    <>
      <HStack paddingLeft={10} paddingTop={30}>
        <ArrowLeftIcon color="gray.300" />
        <Box color="gray.400" fontSize="md">
          取引を選択してください
        </Box>
      </HStack>
    </>
  );
};
