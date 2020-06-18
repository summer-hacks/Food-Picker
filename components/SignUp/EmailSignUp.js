import React from 'react'
import { useNavigation } from '@react-navigation/native';

const EmailSignUp = () => {
    state = { email: '', password: '', fullName: '', phoneNum: '', errorMessage: null }
    const navigation = useNavigation();
    return (
        <div>
            <Text>Step 3 of 4</Text>
            <Text>What's your email?</Text>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                //style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
            />
            <Button onPress = {() => navigation.navigate('EmailSignUp')}>Sign Up</Button>
        </div>
    )
};

export default EmailSignUp;