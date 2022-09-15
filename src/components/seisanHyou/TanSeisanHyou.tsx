import React, { ReactElement, VFC } from "react";
// import '../../../styles/index.css'
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
import {
  useReactTable,
  createColumnHelper,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useShiwakeSakujo } from "./hooks/useShiwakeSakujo";

import type { Shiwake } from "./hooks/useSeisanHyou";
import { DateSchema } from "yup";
interface SeisanHyouType {
  name: String;
}
export type TanShiwake = {
  id: number;
  createdAt: string;
  hasseiDate: string;
  kariName: string;
  kashiName: string;
  kariKingaku: number;
  tekiyou?: string|null;
};
///////////////////////////////////
const data: Array<TanShiwake> = [
  {
    id: 156,
    hasseiDate: "1659678959292",
    createdAt: "1659678964792",
    kariName: "事業主借方",
    kashiName: "雑収入",
    kariKingaku: 500,
    tekiyou: "テスト１",
    //   "userId": 23
  },
  {
    id: 151,
    hasseiDate: "1658842857438",
    createdAt: "1658842934894",
    kariName: "減価償却",
    kashiName: "建物",
    kariKingaku: 100000,
    tekiyou: "テスト2",
    //   "userId": 23
  },
  {
    id: 154,
    hasseiDate: "1657695692000",
    createdAt: "1659598929191",
    kariName: "荷造運賃",
    kashiName: "事業主貸方",
    kariKingaku: 10000,
    tekiyou: "テスト3",
    //   "userId": 23
  },
];
const columnHelper = createColumnHelper<TanShiwake>();

const columns = [
  //   columnHelper.accessor("hasseiDate", {
  //     header: "発生日",
  //   }),
  columnHelper.accessor("kariName", {
    header: "借方",
  }),
  columnHelper.accessor("kashiName", {
    header: "貸方",
  }),
  columnHelper.accessor("kariKingaku", {
    header: "金額",
  }),
  columnHelper.accessor("tekiyou", {
    header: "取引メモ",
  }),
];
////////////////////////////////////////

export const TanSeisanHyou: VFC<SeisanHyouType> = (props) => {
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
  ////////////////////////////////////////////////////////////
  const table = useReactTable({
    // data: shiwakesData?.shiwakes, 
    data: data,
    columns: columns, // header
    getCoreRowModel: getCoreRowModel(), // おまじない
  });
  ///////////////////////////////////////////////////////////
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

      <table>
        <thead>
          {table.getHeaderGroups().map((headers) => (
            <tr key={headers.id}>
              {headers.headers.map((header) => (
                // <th key={header.id} className={styles.th}>
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                // <td key={cell.id} className={styles.td}>
                    <td key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};
