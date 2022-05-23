import React, { VFC, useState } from "react";
import { Box, Button, HStack, Stack, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { strdGrpCd } from "../../store/strdStates";
import {
  strdMenuItem,
  strdShiwakeData,
  strdTekiyou,
} from "../../store/strdStates";
import { Grid, GridItem } from "@chakra-ui/react";
// import type { StrdMenuItem } from "../../store/strdStates";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker, { CalendarContainer } from "react-datepicker";
// import { ShiwakeLeft } from "./ShiwakeLeft";
// import { ShiwakeRight } from "./ShiwakeRight";
// import { graphqlSync } from "graphql";
import {ShiwakeSelected } from "./ShiwakeSelected";
import { ShiwakeUnselected } from "./ShiwakeUnselected";
// import type { Tekiyou } from "../../store/strdStates";

export type ShiwakeInput = {
  hasseiDate: string;
  tekiyou: string | undefined;
  kariCd: number;
  kariName: string;
  kariKingaku: number | undefined;
  kashiCd: number;
  kashiName: string;
  kashiKingaku: number | undefined;
};

type shiwakeTourokuProps = {
  // date: Date;
  name: string;
};

export const ShiwakeTouroku: VFC<shiwakeTourokuProps> = (props) => {
  const atomGrpCd = useRecoilState(strdGrpCd);
  const [atomMenuItem, setAtomMenuItem] = useRecoilState(strdMenuItem);
  const [atomTekiyou, setAtomTekiyou] = useRecoilState(strdTekiyou);
  const [atomShiwakeData, setAtomShiwakeData] = useRecoilState(strdShiwakeData);
  const [testItems, setTestItems] = useState({
    kamokuCd: 0,
    kamokuMei: "unclicked",
  });
  // const Today = new Date();
  // const [date, setDate] = React.useState(Today);
  // const MyContainer = ({ className, children }) => {
  //   return (
  //     <div style={{ color: "#fff" }}>
  //       <CalendarContainer className={className}>
  //         <div style={{ position: "relative" }}>{children}</div>
  //       </CalendarContainer>
  //     </div>
  //   );
  // };
  return (
    <div>
      <Box
        // m={0}
        h="220px"
        w="100%"
        border="1px"
        rounded="2xl"
        color="gray.700"
        fontSize="sm"
        textAlign="center"
      >
        {props.name}

        <Grid
          h="200px"
          w="100%"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={0.5}
        >
          {/* <GridItem
            rowSpan={1}
            colSpan={4}
            // border="1px"
            // color="gray.100"
          >
            <HStack spacing="1px" mt={2} ml={5}>
              <Box></Box>
              <HStack>
                <h3>日付を選択してください</h3>
                <ArrowRightIcon color="gray.300" />

                <DatePicker
                  placeholderText=""
                  onChange={(selectedDate) => {
                    setDate(selectedDate || Today);
                  }}
                  calendarContainer={MyContainer}
                  monthsShown={2}
                  showPreviousMonths
                  selected={date}
                ></DatePicker>
              </HStack>
            </HStack>
          </GridItem> */}
          <GridItem
            rowSpan={2}
            colSpan={2}
            // border="1px"
            // color="gray.100"
          >
            {atomShiwakeData.hyoujiPtn === "U" ? (
              <ShiwakeUnselected />
            ) : (
              <ShiwakeSelected />
            )}
          </GridItem>
          {/* <GridItem
            rowSpan={1}
            colSpan={2}
            // border="1px"
            // color="gray.100"
          >
            <Button w="90%" pb={1} color="gray.700">
              {" "}
              登録
            </Button>
          </GridItem> */}
        </Grid>
      </Box>
    </div>
  );
};
