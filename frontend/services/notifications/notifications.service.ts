import * as Notifications from 'expo-notifications';

console.log('EXPO_PROJECT_ID', process.env.EXPO_PROJECT_ID)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {

  async registerForPushNotifications(): Promise<string | null> {


    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Permission de notification refusée');
      return null;
    }

    try {
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: '0b0798c6-2499-47cb-a3c4-4fc5d49dca40',
      });
      console.log('📱 Push Token obtenu:', tokenData.data);
      return tokenData.data;
    } catch (error) {
      console.error('Erreur lors de l\'obtention du token:', error);
      return null;
    }
  },

  setupNotificationListeners(
    onNotificationReceived: (notification: Notifications.Notification) => void,
    onNotificationTapped: (response: Notifications.NotificationResponse) => void
  ) {
    const receivedSubscription = Notifications.addNotificationReceivedListener(onNotificationReceived);

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(onNotificationTapped);

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  },


  async scheduleLocalNotification(title: string, body: string, data?: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: null,
    });
  },


  async getAllNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  },


  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },
};