import { Box, Button, Flex, Avatar, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';
import { useCreateReply } from '../../Hooks/Reply/ReplyHooks';




export default function ReplyDetail() {
  const { handleChange, handleButtonClick, fileInputRef, mutate } = useCreateReply();
  
  return (
    <div>
        <Box w={'full'}>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Add reply
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault(), mutate();
              }}
              encType="multipart/form-data">
              <Flex alignItems={'center'} w={'full'} justifyContent={'space-between'}>
                <Box display={'flex'} w={'full'} gap={4}>
                  <Avatar />
                  <Box w={'80%'}>
                    <Box w={'full'} borderBottom={'1px solid gray'} mt={2} pb={1}>
                      <Input
                        placeholder="Type your reply"
                        size={'sm'}
                        border={'none'}
                        color={'white'}
                        onChange={handleChange}
                        name="content"
                        focusBorderColor='none'
                      />
                    </Box>
                    <Input placeholder="Type your reply" size={'sm'} border={'none'} onChange={handleChange} type="file" ref={fileInputRef} hidden />
                  </Box>
                </Box>
                <Box display={'flex'} gap={2}>
                <Button onClick={ handleButtonClick}>
                    <BiImageAdd size={20} />
                  </Button>
                  <Button colorScheme="green" type="submit">
                    Reply
                  </Button>
                </Box>
              </Flex>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
    </div>
    
  );
}