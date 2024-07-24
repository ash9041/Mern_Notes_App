import { Button, Card, CardBody, Heading, VStack, Text, Flex, HStack, CardHeader, CardFooter } from "@chakra-ui/react"
import "./notestyle.css"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteNotes, updateNotes } from "../../../redux/notes/note_actions"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    useDisclosure,
     AlertDialog,AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from "@chakra-ui/react";
import { EditIcon ,DeleteIcon} from '@chakra-ui/icons'; 

export default function NoteCard({title, body, user, _id}){
    
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
     const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [notes, setNotes] = useState([])
    const [tempTitle, setTitle] = useState(title)
    const [tempBody, setBody] = useState(body)
    const cancelRef = useRef();
    const updateNote = ()=>{
        dispatch(updateNotes(_id, {title: tempTitle, body: tempBody}))
        onClose()
    }
    const handleDelete = () => {
    dispatch(deleteNotes(_id));
    onDeleteClose();
  };

    return <Card className="card" align={"center"} size='md'>
        <CardHeader height={"20%"} alignItems={'center'}>
            <Heading size='xl' noOfLines={1}>{title}</Heading>
        </CardHeader>
        <CardBody mt={"10px"} height = {"50%"}>
            <Text noOfLines={"8"}>{body}</Text>
        </CardBody>
        <CardFooter height={"30%"}>
            <HStack width = {"100%"}>
                <>
                <Button bgColor={"#00e9bf"} onClick={onOpen}><EditIcon mr={2} />
        Edit</Button>
                    <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                        onClose={onClose}
                        isCentered
                    >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Note</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>

                            <Input value={tempTitle}m placeholder={title} onChange={(e)=>setTitle(e.target.value)}></Input>
                            <Textarea mt={8} value={tempBody} placeholder={body} onChange={(e)=>setBody(e.target.value)}></Textarea>
                        
                        </ModalBody>

                        <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={updateNote}>
                            Update
                        </Button>
                         
                        <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                    </Modal>
                </>
                     <Button bgColor={"#00e9bf"} onClick={onDeleteOpen}>
                    <DeleteIcon mr={2} /> Delete
                    </Button>
                

                    <AlertDialog
                    isOpen={isDeleteOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onDeleteClose}
                    isCentered
                    >
                    <AlertDialogOverlay>
                    <Flex align="center" justify="center" minH="100vh">
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Note
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this note? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onDeleteClose}>
                            Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            Delete
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </Flex>
                    </AlertDialogOverlay>
                </AlertDialog>

            </HStack>
        </CardFooter>
    </Card>
}