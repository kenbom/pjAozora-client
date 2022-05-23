import React, { VFC, useState } from "react";
import { Box, Button, HStack, Input, VStack, Center } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { strdGrpCd } from "../../store/strdStates";
import { strdShiwakeData } from "../../store/strdStates";
import { Grid, GridItem } from "@chakra-ui/react";
import { useShiwakeTouroku } from "./hooks/useShiwakeTouroku";
import { useSeisanHyou } from "../seisanHyou/hooks/useSeisanHyou";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  InputControl,
  PercentComplete,
  ResetButton,
  SubmitButton,
  CheckboxSingleControl,
} from "formik-chakra-ui";

type ShiwakePropsType = {
  date: Date;
  tekiyou?: string;
};

export const ShiwakeLeft = (props: ShiwakePropsType) => {
  const [atomShiwakeData, setAtomShiwakeData] = useRecoilState(strdShiwakeData);
  const [kingaku, setKingaku] = useState(undefined);
  const changeKingaku = (e: any) => {
    setKingaku(e.target.value);
  };
  const { date, tekiyou } = props;
  const shiwakeInput = {
    input: {
      hasseiDate: date.toISOString(),
      tekiyou: tekiyou,
      kariCd: atomShiwakeData.kariKamokuCd,
      kariName: atomShiwakeData.kariKamokuMei,
      kariKingaku: Number(kingaku),
      kashiCd: atomShiwakeData.kashiKamokuCd,
      kashiName: atomShiwakeData.kashiKamokuMei,
      kashiKingaku: Number(kingaku),
    },
  };
  const mutateShiwake = useShiwakeTouroku();
  return (
    <>
      <GridItem rowSpan={3} colSpan={2} textAlign="center">
        <HStack spacing="8px">
          <VStack w="50%">
            <Center w="80%" h="40px" bg="cyan.50">
              借方：{atomShiwakeData.kariKamokuMei}
            </Center>
            <Box>
              <Input
                type="text"
                value={kingaku}
                placeholder="金額を入力してください"
                fontSize="sm"
                w="100%"
                onChange={changeKingaku}
              />
            </Box>
          </VStack>
          <VStack w="50%">
            <Center w="80%" h="40px">
              貸方：{atomShiwakeData.kashiKamokuMei}
            </Center>
            <Box color="gray.300" fontSize="sm" w="100%" h="35px" pb={1} pt={2}>
              <p>{kingaku}</p>
            </Box>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Button
          w="90%"
          mt={2}
          pb={1}
          color="gray.600"
          onClick={() => {
            mutateShiwake(shiwakeInput);
          }}
        >
          登録
        </Button>
      </GridItem>
    </>
  );
};
