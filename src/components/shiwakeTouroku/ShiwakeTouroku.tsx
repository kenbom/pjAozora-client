import React, { VFC, useState } from "react";
import { Box } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { strdGrpCd } from "../../store/strdStates";
import {
  strdMenuItem,
  strdShiwakeData,
  strdTekiyou,
} from "../../store/strdStates";
import { Grid, GridItem } from "@chakra-ui/react";
import { ShiwakeSelected } from "./ShiwakeSelected";
import { ShiwakeUnselected } from "./ShiwakeUnselected";

export type ShiwakeInput = {
  hasseiDate: string | undefined;
  tekiyou: string | undefined;
  kariCd: number | undefined;
  kariName: string | undefined;
  kariKingaku: number | undefined;
  kashiCd: number | undefined;
  kashiName: string | undefined;
  kashiKingaku: number | undefined;
};

type shiwakeTourokuProps = {
  name: string;
};

export const ShiwakeTouroku: VFC<shiwakeTourokuProps> = (props) => {
  const [atomShiwakeData, setAtomShiwakeData] = useRecoilState(strdShiwakeData);
  const [testItems, setTestItems] = useState({
    kamokuCd: 0,
    kamokuMei: "unclicked",
  });
  return (
    <div>
      <Box
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
          <GridItem rowSpan={2} colSpan={2}>
            {atomShiwakeData.hyoujiPtn === "U" ? (
              <ShiwakeUnselected />
            ) : (
              <ShiwakeSelected />
            )}
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};
