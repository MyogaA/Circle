import { Button, Flex,  Box, Text, GridItem, Grid, Avatar, TabPanel, TabPanels, Tabs, TabList, Tab } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import { SuggestedCard } from "./SugestedFollow";
import { follow } from "../../../../Store/types/user";
import { RootState } from "../../../../Store/store";

interface IFollow {
  userId?: number;
  id: number | undefined;
  full_name?: string;
  username?: string;
  follow?: follow[];
}
export default function Follow() {

  const auth = useSelector((state: RootState) => state.auth);
  console.log("kontol",auth);
  
  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      gap={0}
      w={"full"}
    >
      <GridItem p={3} position={"fixed"} borderRight={"1px"} height={"full"} borderColor={"white"} gridArea="1 / 1 / 7 / 2">
        <Navbar />
      </GridItem>
      <GridItem p={3} gridArea="1 / 2 / 6 / 5" style={{ overflow: "auto" }}>
      <Box h={'screen'}>
      <Box>
        <Tabs isFitted variant="enclosed">
          <TabList >
            <Tab>Following</Tab>
            <Tab>Followers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w={'50%'}>
              {auth.following?.map((item: IFollow) => (
                <SuggestedCard key={item.id} id={item.id} full_name={item.full_name} username={item.username} />
              ))}
            </TabPanel>
            <TabPanel w={'50%'} ml={'auto'}>
              {auth.followers?.map((item: IFollow) => (
                <SuggestedCard key={item.id} id={item.id} full_name={item.full_name} username={item.username} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
      </GridItem>
      <GridItem m={3} p={3} borderLeft={"1px"} height={"full"} color={"white"} gridArea="1 / 5 / 7 / 7">
        <Sidebar />
      </GridItem>
    </Grid>
  );
}

