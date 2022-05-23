import React, { VFC } from "react";
import { kamokuList } from "../../config/dataKamokuList";
import {
  strdGrpCd,
  strdMenuItem,
  strdShiwakeData,
} from "../../store/strdStates";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export type KamokuMenuItem = {
  kamokuMenuGrpCd: number;
  kamokuMenuCd: number;
  kamokuMenuMei: string;
};

export type ShiwakeData = {
  kariKamokuGrpCd: number;
  kariKamokuCd: number;
  kariKamokuMei: string;
  kashiKamokuGrpCd: number;
  kashiKamokuCd: number;
  kashiKamokuMei: string;
  hyoujiPtn: string;
};
type KamokuProps = { kamokuMenuGrpCd: number };

function selectKamokuGrp(
  kamokuMenuGrpCd: number,
  kamokuList: KamokuMenuItem[]
): KamokuMenuItem[] {
  const selectedKamokus = kamokuList.filter(
    (kamoku: KamokuMenuItem) => kamoku.kamokuMenuGrpCd === kamokuMenuGrpCd
  );
  return selectedKamokus;
}

function getPreShiwakeData(kamokuItem: KamokuMenuItem): ShiwakeData {
  const { kamokuMenuGrpCd, kamokuMenuCd, kamokuMenuMei } = kamokuItem;
  if (kamokuMenuGrpCd === 4)
    return {
      kariKamokuGrpCd: 3,
      kariKamokuCd: 301,
      kariKamokuMei: "事業主借方",
      kashiKamokuGrpCd: kamokuMenuGrpCd,
      kashiKamokuCd: kamokuMenuCd,
      kashiKamokuMei: kamokuMenuMei,
      hyoujiPtn: "R",
    };
  else if (kamokuMenuGrpCd === 5)
    return {
      kariKamokuGrpCd: kamokuMenuGrpCd,
      kariKamokuCd: kamokuMenuCd,
      kariKamokuMei: kamokuMenuMei,
      kashiKamokuGrpCd: 3,
      kashiKamokuCd: 302,
      kashiKamokuMei: "事業主貸方",
      hyoujiPtn: "L",
    };
  else if (kamokuMenuGrpCd === 1)
    return {
      kariKamokuGrpCd: 0,
      kariKamokuCd: 0,
      kariKamokuMei: "未定",
      kashiKamokuGrpCd: 0,
      kashiKamokuCd: 0,
      kashiKamokuMei: "未定",
      hyoujiPtn: "B",
    };
    return {
      kariKamokuGrpCd: 0,
      kariKamokuCd: 0,
      kariKamokuMei: "未定",
      kashiKamokuGrpCd: 0,
      kashiKamokuCd: 0,
      kashiKamokuMei: "未定",
      hyoujiPtn: "U",
    };

}

export const MenuItem: VFC<KamokuProps> = (props) => {
  const kamokuMenuItems: KamokuMenuItem[] = kamokuList;
  const { kamokuMenuGrpCd } = props;
  const selectedKamokus = selectKamokuGrp(kamokuMenuGrpCd, kamokuMenuItems);
  const [changedGrpCd, setChangedGrpCd] = useRecoilState(strdGrpCd);
  const setChangedMenuItem = useSetRecoilState(strdMenuItem);
  const setPreShiwakeData = useSetRecoilState(strdShiwakeData);
  
  function handleOnClick(kamokuItem: KamokuMenuItem): void {
    const preShiwakeData = getPreShiwakeData(kamokuItem);
    setPreShiwakeData(preShiwakeData);
  }
  return (
    <div>
      {selectedKamokus.map((item) => {
        return (
          <Box
            key={item.kamokuMenuCd}
            _hover={{ color: "blue.200" }}
            onClick={() => {
              handleOnClick(item);
            }}
          >
            {item.kamokuMenuMei}
          </Box>
        );
      })}
    </div>
  );
};
