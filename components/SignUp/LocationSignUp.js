import React from 'react'
import { useNavigation } from '@react-navigation/native';

const LocationSignUp = () => {
    state = { email: '', password: '', fullName: '', phoneNum: '', errorMessage: null }
    const navigation = useNavigation();
    return (
        <div>
            <Text>Step 3 of 4</Text>
            <Text>Where do you live?</Text>
            {/* Map??? lol */}
            <Button onPress = {() => navigation.navigate('DoneSignUp')}>Sign Up</Button>
        </div>
    )
};

export default LocationSignUp;