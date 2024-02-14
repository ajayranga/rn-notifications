import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import notifee from '@notifee/react-native';

const App = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <Button title="Display Notification" onPress={onDisplayNotification} />
    </SafeAreaView>
  );
};

export default App;
