import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
     useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/users/user_actions';
import axios from 'axios';
import { BASE_URL } from '../constants/config';
  
  export default function Signuppage() {
    const nav = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const handleSignUp = async () => {
      setIsLoading(true);
      try{
      let data = await axios.post(BASE_URL+"/user/register", {
          name, email, password
      })
     let { message, status } = data.data;
      if (status === 1) {
        toast({
          title: "Registration successful.",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        nav("/login");
      } else {
        toast({
          title: "Registration failed.",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to register user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      }
      finally {
      setIsLoading(false); 
    }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8}  mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
           
          </Stack>
        
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="userName" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                onClick={handleSignUp}
                isLoading={isLoading} 
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign up
              </Button>
            </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link onClick={()=>{
                    nav("/login")
                  }} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }