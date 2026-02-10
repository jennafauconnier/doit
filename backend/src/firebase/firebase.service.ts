import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;

  onModuleInit() {
    if (!admin.apps.length) {
      const serviceAccountPath = path.join(
        process.cwd(),
        'firebase-service-account.json',
      );

      this.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    } else {
      this.app = admin.apps[0]!;
    }
  }

  get auth() {
    return this.app.auth();
  }

  get firestore() {
    return this.app.firestore();
  }

  get storage() {
    return this.app.storage().bucket();
  }

  async sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data?: any
  ) {
    const message = {
      to: pushToken,
      sound: 'default',
      title,
      body,
      data,
    };
  
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      throw error;
    }
  }

  async sendPushNotificationToUser(
    userId: string,
    title: string,
    body: string,
    data?: any
  ) {
    const userDoc = await this.firestore.collection('users').doc(userId).get();
    const pushToken = userDoc.data()?.pushToken;
  
    if (pushToken) {
      return this.sendPushNotification(pushToken, title, body, data);
    } else {
      console.warn(`Pas de push token pour l'utilisateur ${userId}`);
    }
  }
}