import React, { useState,  useEffect, useCallback, VFC } from "react";

interface Shiwake {
  kamoku: string;
  kamokuGroup: number;
  kingaku: number;
}
export const useTestFunc = () => {
  const [test, setTest] = useState<Shiwake>({
    kamoku: "",
    kamokuGroup: 1,
    kingaku: 0,
  });

 useEffect(()=> setTest({
    kamoku: "費用だよ",
    kamokuGroup: 100,
    kingaku: 1000,
  }), []);

  return (
   test
  )
};
