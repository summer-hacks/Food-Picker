import React from 'react'
import { useNavigation } from '@react-navigation/native';

const BirthdaySignUp = () => {
    state = { email: '', password: '', fullName: '', phoneNum: '', errorMessage: null }
    const navigation = useNavigation();
    return (
        <div>
            <Text>Step 2 of 4</Text>
            <Text>What's your birthday?</Text>
            <DatePickerIOS></DatePickerIOS>
            <Button onPress = {() => navigation.navigate('EmailSignUp')}>Sign Up</Button>
        </div>
    )
};

export default BirthdaySignUp;