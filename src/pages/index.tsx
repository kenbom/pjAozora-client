import type { NextPage } from "next";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ShiwakeTouroku } from "../components/shiwakeTouroku/ShiwakeTouroku";
import { KamokuMenu } from "../components/kamokuMenu/KamokuMenu";
import { SeisanHyou } from "../components/seisanHyou/SeisanHyou";
import { Header } from "../components/header/Header";
import { TanSeisanHyou } from "../components/seisanHyou/TanSeisanHyou";

const Home: NextPage = () => {
  return (
    <div>
      <Box m={2}>
        <Header />
        <Grid
          h="750px"
          w="900px"
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={2}
        >
          <GridItem rowSpan={10} colSpan={2}>
            <KamokuMenu name="取引選択" flug={false}></KamokuMenu>
          </GridItem>
          <GridItem rowSpan={3} colSpan={6}>
            <ShiwakeTouroku name="取引登録"></ShiwakeTouroku>
          </GridItem>
          <GridItem rowSpan={6} colSpan={6}>
            <TanSeisanHyou name="取引履歴"></TanSeisanHyou>
            {/* <SeisanHyou name="取引履歴"></SeisanHyou> */}
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
