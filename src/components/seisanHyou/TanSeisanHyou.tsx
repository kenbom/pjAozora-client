import React, { ReactElement, VFC, FC } from "react";
// import { Box } from "@chakra-ui/layout";
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
  FormLabel,
  Input,
  chakra,
  Box,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import {
  Column,
  ColumnDef,
  Row,
  getCoreRowModel,
  useReactTable,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import styles from './Table.module.css'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useShiwakeSakujo } from "./hooks/useShiwakeSakujo";

import type { Shiwake } from "./hooks/useSeisanHyou";
import { DateSchema } from "yup";
// import { Checkbox } from "@chakra-ui/theme/dist/declarations/src/components";


interface SeisanHyouType {
  name: String;
}
export type TanShiwake = {
  id: number;
  createdAt: string;
  hasseiDate: string;
  "借方": string;
  "貸方": string;
  "金額": number;
  "取引メモ"?: string | null;
};
///////////////////////////////////
const data: Array<TanShiwake> = [
  {
    id: 156,
    hasseiDate: "1659678959292",
    createdAt: "1659678964792",
    借方: "事業主借方",
    貸方: "雑収入",
    金額: 500,
    取引メモ: "テスト１",
    //   "userId": 23
  },
  {
    id: 151,
    hasseiDate: "1658842857438",
    createdAt: "1658842934894",
    借方: "減価償却",
    貸方: "建物",
    金額: 100000,
    取引メモ: "テスト2",
    //   "userId": 23
  },
  {
    id: 154,
    hasseiDate: "1657695692000",
    createdAt: "1659598929191",
    借方: "荷造運賃",
    貸方: "事業主貸方",
    金額: 10000,
    取引メモ: "テスト3",
    //   "userId": 23
  },
];
const columnHelper = createColumnHelper<TanShiwake>();

const columns = [
  //   columnHelper.accessor("hasseiDate", {
  //     header: "発生日",
  //   }),
  columnHelper.accessor("借方", {
    header: "借方",
  }),
  columnHelper.accessor("貸方", {
    header: "貸方",
  }),
  columnHelper.accessor("金額", {
    header: "金額",
  }),
  columnHelper.accessor("取引メモ", {
    header: "取引メモ",
  }),
];

// const DraggableRow: FC<{
//   row: Row<TanShiwake>
//   reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
// }> = ({ row, reorderRow }) => {
//   const [, dropRef] = useDrop({
//     accept: 'row',
//     drop: (draggedRow: Row<TanShiwake>) => reorderRow(draggedRow.index, row.index),
//   })

//   const [{ isDragging }, dragRef, previewRef] = useDrag({
//     collect: monitor => ({
//       isDragging: monitor.isDragging(),
//     }),
//     item: () => row,
//     type: 'row',
//   })

//   return (
//     <Tr
//       ref={previewRef} //previewRef could go here
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//     >
//       <Td ref={dropRef}>
//         <button ref={dragRef}>🟰</button>
//       </Td>
//       {row.getVisibleCells().map(cell => (
//         <Td key={cell.id}>
//           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//         </Td>
//       ))}
//     </Tr>
//   )
// }
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
  const [columnVisibility, setColumnVisibility] = React.useState({})

  // const [data, setData] = React.useState([])

  // const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
  //   data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as TanShiwake)
  //   setData([...data])
  // }

  const table = useReactTable({
    // data: shiwakesData?.shiwakes, 
    data: data,
    columns: columns, // header
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(), // おまじない
    getRowId: row => JSON.stringify(row.id), //good to have guaranteed unique row ids/keys for rendering
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
      {/* //↓TanStackTable//////////////////////////////////////////////////////////////////////////////// */}
      {/* <label>
        <input
          {...{
            type: 'checkbox',
            checked: table.getIsAllColumnsVisible(),
            onChange: table.getToggleAllColumnsVisibilityHandler(),
          }}
        />{' '}
        Toggle All
      </label> */}

      {/* {table.getAllLeafColumns().map(column => {
        return (
          <div key={column.id} className="px-1">
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{' '}
              {column.id}
            </label>
          </div>
        )
      })} */}
      <HStack>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} >
              <FormLabel ml='20px' mt='20px' mb='-15px' fontSize='12px'>
                <Checkbox
                  size='sm'
                  defaultChecked
                  type='checkbox'
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  colorScheme='gray'
                >
                {column.id}</Checkbox>
              </FormLabel>
            </div>
          )
        })}
      </HStack>
      <Box m={4} width='max-content'>
        <Table>
          <Thead bgColor='gray.200'>
            {table.getHeaderGroups().map((headers) => (
              <Tr key={headers.id}>
                {headers.headers.map((header) => (
                  // <th key={header.id} className={styles.th}>
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (

              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  // <td key={cell.id} className={styles.td}>
                  <Td key={cell.id} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                {/* {table.getRowModel().rows.map(row => (
            <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
          ))} */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* /↑TanStackTable///////////////////////////////////////////////////////////////////////////////// */}
    </Box>
  );
};
