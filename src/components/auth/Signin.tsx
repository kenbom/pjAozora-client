import React, { VFC } from "react";
import { AuthHeader } from "./AuthHeader";
import {
  Box,
  Center,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  InputControl,
  ResetButton,
  SubmitButton,
} from "formik-chakra-ui";
import { useSigninAuth } from "./hooks/useSigninAuth";
const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, "英数字半角にて設定してください")
    .min(2, "4文字以上で設定してください")
    .max(50, "Too Long!")
    .required("必須項目です"),
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
                await mutateSignin(signinArgs);
                await console.log(
                  `lclStrgTkn:${localStorage.getItem("token")}`
                );
              }}
              onReset={(values) => {
                values.email = "";
                values.password = "";
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <InputControl name="email" label="メールアドレス" mb={7} />
                  <InputControl name="password" label="パスワード" mb={5} />
                  <Flex>
                    <SubmitButton
                      mt={4}
                      h={12}
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
                      pb={6} 
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
