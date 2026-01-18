import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

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
}
