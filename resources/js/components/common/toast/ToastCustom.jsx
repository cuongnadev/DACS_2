import { Toast } from '@chakra-ui/react';    

const ToastCustom = ({ title, description, status }) => {
    const toast = Toast();
    return (
        toast({
            title: title,
            description: description,
            status: status,
            duration: 9000,
            isClosable: true,
        })
    );
}

export default ToastCustom;