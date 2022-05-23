import React, { VFC } from "react";
import { AuthHeader } from "./AuthHeader";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Box,
  Center,
  HStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  InputControl,
  PercentComplete,
  ResetButton,
  SubmitButton,
  CheckboxSingleControl,
} from "formik-chakra-ui";
import { GraphQLEnumType } from "graphql";
import { useSigninAuth } from "./hooks/useSigninAuth";
import { redirect } from "next/dist/server/api-utils";
import Router from "next/router";
import { NextPage } from "next";
const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, "英数字半角にて設定してください")
    .min(2, "4文字以上で設定してください")
    .max(50, "Too Long!")
    .required("必須項目です"),
  // lastName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, "英数字半角にて入力してください")
    .email("正しいメールアドレスを入力してください")
    .required("必須項目です"),
});

export const Signin: VFC = () => {
  const mutateSignin = useSigninAuth();
  return (
    <>
      <Box>
        <Center>
          <Box w="300px" p="20px" border="1px" bgColor="white" mt="50px">
            <AuthHeader></AuthHeader>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { resetForm }) => {
                const signinArgs = {
                  credentials: {
                    mail: values.email,
                    password: values.password,
                  },
                };
                // await localStorage.removeItem("token")
                await mutateSignin(signinArgs);
                await console.log(
                  `lclStrgTkn:${localStorage.getItem("token")}`
                );
                // await !!localStorage.getItem("token")?Router.push("/"):resetForm()
                // else {return}
                // const isLoginSuccess = await setSignin;
                // isLoginSuccess ? Router.push("/") : resetForm();
              }}
              onReset={(values) => {
                values.email = "";
                values.password = "";
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* <Field name="firstName" />
                {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor='firstName'>First name</FormLabel> */}
                  <InputControl name="email" label="メールアドレス" mb={7} />
                  {/* <FormErrorMessage>{form.errors.firstName}</FormErrorMessage> */}
                  {/* </FormControl> */}
                  {/* )} */}
                  {/* {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null} */}
                  {/* <Field name="lastName" />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
                <Field name="email" type="email" />
                {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
                  <InputControl name="password" label="パスワード" mb={5} />
                  <Flex>
                    <SubmitButton
                      mt={4}
                      h={12}
                      //   color="gray.800"
                      //   bgColor="gray.200"
                      colorScheme="gray"
                      type="submit"
                    >
                      Signin
                    </SubmitButton>
                    <Spacer />
                    <ResetButton
                      mt={4}
                      h={10}
                      pt={6}
                      pb={6} //   color="black"
                      //   bgColor="gray.200"
                      colorScheme="gray"
                      type="reset"
                    >
                      Reset
                    </ResetButton>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Center>
      </Box>
    </>
  );
};
