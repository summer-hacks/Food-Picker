import React from 'react'
import { useNavigation } from '@react-navigation/native';

const DoneSignUp = () => {
    state = { email: '', password: '', fullName: '', phoneNum: '', errorMessage: null }
    const navigation = useNavigation();
    return (
        <div>
            <Text>Welcome to </Text>
            <Text>Say goodbye to indecision and hangriness.</Text>
            <Button onPress = {() => navigation.navigate('Home')}>Sign Up</Button>
        </div>
    )
};

export default DoneSignUp;