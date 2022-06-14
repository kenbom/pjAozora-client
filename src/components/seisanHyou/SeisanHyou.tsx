import React, { ReactElement, VFC } from "react";
import { Box } from "@chakra-ui/layout";
import { useSeisanHyou } from "./hooks/useSeisanHyou";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useShiwakeSakujo } from "./hooks/useShiwakeSakujo";

import type { Shiwake } from "./hooks/useSeisanHyou";
interface SeisanHyouType {
  name: String;
}

export const SeisanHyou: VFC<SeisanHyouType> = (props) => {
  const shiwakesData = useSeisanHyou();
  function testTime(stamp: number): string {
    const newStamp = dayjs(new Date(Math.round(stamp))).format("YYYY/MM/DD");
    const newNewStamp = JSON.stringify(newStamp).substr(1, 10);
    return newNewStamp;
  }
  const deleteShiwake = useShiwakeSakujo();
  function shiwakeSet(shiwakeId: number) {
    const objShiwakeId = { input: { shiwakeId: String(shiwakeId) } };
    console.log(`checkIdOya:${JSON.stringify(objShiwakeId)}`);
    deleteShiwake(objShiwakeId);
  }
  return (
    <Box
      height="525px"
      width="100%"
      border="1px"
      rounded="2xl"
      color="gray.700"
      fontSize="sm"
      textAlign="center"
      overflow="scroll"
    >
      {props.name}
      <TableContainer>
        <Table variant="simple" fontSize="xs" size="sm" colorScheme="twitter">
          <Thead fontSize="xs">
            <Tr>
              <Th>発生日</Th>
              <Th>借方</Th>
              <Th>貸方</Th>
              <Th isNumeric>金額</Th>
              <Th>取引メモ</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody fontSize="xs">
            {shiwakesData.shiwakes?.map((shiwakeItem: Shiwake) => {
              return (
                <Tr fontSize="xs" key={shiwakeItem.id}>
                  <Td fontSize="xs">{testTime(shiwakeItem.hasseiDate)}</Td>
                  <Td fontSize="xs">{shiwakeItem.kariName}</Td>
                  <Td fontSize="xs">{shiwakeItem.kashiName}</Td>
                  <Td isNumeric fontSize="xs">
                    {shiwakeItem.kariKingaku}
                  </Td>
                  <Td fontSize="xs">{shiwakeItem.tekiyou}</Td>
                  <Td>
                    <Button
                      onClick={() => shiwakeSet(shiwakeItem.id)}
                      fontSize="xs"
                    >
                      削除
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
