import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import firebase from '../firebase';

export async function registerForPushNotifications() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    const currentUser = firebase.auth().currentUser;
    let finalStatus = existingStatus;
    
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    console.log('finalStatus', finalStatus);
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      firebase
        .database()
        .ref('users/' + currentUser.uid + '/push_token')
        .set(token);
    } catch (error) {
      console.log(error);
    }
};

export const sendPushNotification = (token, partyName) => {
    console.log('token', token);
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: token, // user's push token
        sound: 'default',
        title: `Matches found for ${partyName}!`,
        body: 'Go to the room page in View Rooms to see your matches.'
      })
    });
  };