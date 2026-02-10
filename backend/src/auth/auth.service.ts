import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  private readonly apiKey: string;

  constructor(
    private readonly firebase: FirebaseService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('FIREBASE_API_KEY')!;
  }

  async signup(dto: SignupDto) {
    try {
      // Create user in Firebase Auth
      const userRecord = await this.firebase.auth.createUser({
        email: dto.email,
        password: dto.password,
        displayName: dto.username,
      });

      // Store additional user data in Firestore
      await this.firebase.firestore
        .collection('users')
        .doc(userRecord.uid)
        .set({
          username: dto.username,
          email: dto.email,
          createdAt: new Date(),
        });

      // Generate custom token
      const token = await this.firebase.auth.createCustomToken(userRecord.uid);

      return {
        user: {
          id: userRecord.uid,
          email: userRecord.email,
          username: dto.username,
        },
        token,
      };
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException('Cet email est déjà utilisé');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    
    try {
      // Use Firebase REST API to sign in with email/password
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: dto.email,
            password: dto.password,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }

      // Get user data from Firestore
      const userDoc = await this.firebase.firestore
        .collection('users')
        .doc(data.localId)
        .get();

      return {
        user: {
          id: data.localId,
          email: data.email,
          username: userDoc.data()?.username || data.displayName,
        },
        token: data.idToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
  }

  async verifyToken(idToken: string) {
    try {
      const decodedToken = await this.firebase.auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }

  async getUser(uid: string) {
    const userRecord = await this.firebase.auth.getUser(uid);
    const userDoc = await this.firebase.firestore
      .collection('users')
      .doc(uid)
      .get();

    return {
      id: userRecord.uid,
      email: userRecord.email,
      username: userDoc.data()?.username || userRecord.displayName,
    };
  }

  async registerPushToken(userId: string, pushToken: string) {
    await this.firebase.firestore
      .collection('users')
      .doc(userId)
      .update({
        pushToken,
        updatedAt: new Date(),
      });
  
    return { success: true };
  }
}
