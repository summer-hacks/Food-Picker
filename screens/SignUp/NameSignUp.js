import React from 'react'
import { useNavigation } from '@react-navigation/native';

const StartSignUp = () => {
    state = { email: '', password: '', fullName: '', phoneNum: '', errorMessage: null }
    const navigation = useNavigation();
    return (
        <div>
            <Text>Step 1 of 4</Text>
            <Text>What's your name?</Text>
            <TextInput
                placeholder="First Name"
                autoCapitalize="none"
                //style={styles.textInput}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
            />
            <Text>What's your name?</Text><TextInput
                placeholder="Last Name"
                autoCapitalize="none"
                //style={styles.textInput}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
            />
            <Button onPress = {() => navigation.navigate('BirthdaySignUp')}>Sign Up</Button>
        </div>
    )
};

export default StartSignUp;