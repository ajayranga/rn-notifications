import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useCallback, useEffect} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import OnePiecePic from './OnePiece.jpeg';
import {requestUserPermission} from './Utils';

const App = () => {
  const triggerLocalNotification = async () => {
    try {
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
          sound: 'DenDenMushi.wav',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Request permissions (required for iOS) on app start
  useEffect(() => {
    requestUserPermission();
  }, []);

  const onMessageReceived = async () => {
    console.log('Notification Received');
  };

  const addFbMsgListener = useCallback(async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log({token});
      messaging().onMessage(onMessageReceived);
      messaging().setBackgroundMessageHandler(onMessageReceived);
    } catch (error) {
      console.log('addFbMsgListener error', error);
    }
  }, []);

  useEffect(() => {
    addFbMsgListener();
  }, [addFbMsgListener]);

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <Button title="Display Notification" onPress={triggerLocalNotification} />
    </SafeAreaView>
  );
};

export default App;
