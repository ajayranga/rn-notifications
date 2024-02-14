import notifee from '@notifee/react-native';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import OnePiecePic from './OnePiece.jpeg';

const App = () => {
  async function onDisplayNotification() {
    try {
      // Request permissions (required for iOS)
      await notifee.requestPermission({
        alert: true,
        sound: true,
      });
      notifee.setBadgeCount(1).then(() => console.log('Badge count set!'));
      await notifee.setNotificationCategories([
        {
          id: 'post',
          actions: [
            {
              id: 'like',
              title: 'Like Post',
            },
            {
              id: 'dislike',
              title: 'Dislike Post',
            },
          ],
        },
      ]);

      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        ios: {
          categoryId: 'post',
          attachments: [
            {
              url: OnePiecePic,
            },
          ],
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
          sound: './Assets/DenDenMushi.wav', // not working
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <Button title="Display Notification" onPress={onDisplayNotification} />
    </SafeAreaView>
  );
};

export default App;
