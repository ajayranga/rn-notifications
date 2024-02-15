import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const requestUserPermission = async () => {
  await notifee.requestPermission({
    alert: true,
    sound: true,
  });
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  return authStatus;
};
