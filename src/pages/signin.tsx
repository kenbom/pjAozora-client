import React, { VFC } from "react";
import { Signin } from "../components/auth/Signin";
import {Box,} from "@chakra-ui/react"
const SigninPage: VFC = () => {
  return (
    <Box  bgColor="blue.50" h="1000px" >
      <Signin />
    </Box>
  );
};

export default SigninPage;
