import { Box, Text, FormControl, FormLabel, Input, Button, GridItem, Grid } from '@chakra-ui/react';
import { useUpdateProfile } from '../../Hooks/MyProfile/ProfileHooks';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';

export default function EditProfile() {
  const {profile, mutate, handleChange } = useUpdateProfile();


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
  <GridItem p={3} gridArea="1 / 2 / 6 / 5"style={{ overflow: "auto" }}>
  <Box>
      <Box>
        <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>
          Your Profile
        </Text>
      </Box>

      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault(), mutate();
          }}>
          <Box display={'flex'} flexDirection={'column'} gap={6}>
            <FormControl color={'white'}>
              <FormLabel>Your name</FormLabel>
              <Input placeholder="full name" value={profile.full_name} name="full_name" onChange={handleChange} />
            </FormControl>
            <FormControl color={'white'}>
              <FormLabel>Username</FormLabel>
              <Input placeholder="username" value={profile.username} name="username" onChange={handleChange} />
            </FormControl>
            <FormControl color={'white'}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="email" value={profile.email} name="email" onChange={handleChange} />
            </FormControl>
            <FormControl color={'white'}>
              <FormLabel>Bio</FormLabel>
              <Input  value={profile.bio} name="bio" onChange={handleChange} />
            </FormControl>
            <Button colorScheme="green" type="submit" >
              Edit Profile
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  </GridItem>
  <GridItem w={"full"}  m={3} p={3} borderLeft={"1px"} height={"full"} color={"white"} gridArea="1 / 5 / 7 / 7">
  <Sidebar />
</GridItem>
</Grid>
  )
}
