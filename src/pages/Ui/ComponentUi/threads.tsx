import {Grid, GridItem } from "@chakra-ui/react";
import   Post  from "./PostUi/Post";
import { Sidebar } from "./Sidebar/Sidebar";
import { Navbar } from "./Navbar/Navbar";

  
export default function Thread() {
  return (
<Grid
  templateColumns="repeat(6, 1fr)"
  templateRows="repeat(5, 1fr)"
  gap={0}
  w={"full"}
>
  <GridItem p={3} position={"fixed"} borderRight={"1px"} height={"full"} borderColor={"white"} gridArea="1 / 1 / 7 / 2">
  <Navbar/>
  </GridItem>
  <GridItem p={3} gridArea="1 / 2 / 6 / 5"style={{ overflow: "hidden" }}>
  <Post />
  </GridItem>
  <GridItem w={"full"}  m={3} p={3} borderLeft={"1px"} height={"full"} color={"white"} gridArea="1 / 5 / 7 / 7">
  <Sidebar />
</GridItem>
</Grid>
  )
}
