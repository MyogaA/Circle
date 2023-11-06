import { Box, Text } from '@chakra-ui/react';
import { useUpdateProfile } from '../../Hooks/MyProfile/ProfileHooks';

export default function YourProfile() {
  const { profile } = useUpdateProfile();

  return (
    <Box color={'white'}>
      <Box>
        <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>
          Your Profile
        </Text>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={6}>
        <Text>
          <strong>Your name:</strong> {profile.full_name}
        </Text>
        <Text>
          <strong>Username:</strong> {profile.username}
        </Text>
        <Text>
          <strong>Email:</strong> {profile.email}
        </Text>
        <Text>
          <strong>Bio:</strong> {profile.bio}
        </Text>
      </Box>
    </Box>
  );
}
