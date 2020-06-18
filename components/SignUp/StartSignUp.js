import React from 'react'
import { useNavigation } from '@react-navigation/native';

const StartSignUp = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Text>Looks like you're new!</Text>
            <Text>Make an account to start a party!</Text>
            <Button onPress = {() => navigation.navigate('NameSignUp')}>Sign Up</Button>
        </div>
    )
};

export default StartSignUp;