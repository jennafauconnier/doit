import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

type TaskRecord = {
  id: string;
  title: string;
  description?: string;
  dueAt?: Date;
  completed: boolean;
  proofPhoto?: string; 
  validatedAt?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  lastReminderSent?: Date;
  reminderCount?: number; 
};

@Injectable()
export class TasksService {
  constructor(private readonly firebase: FirebaseService) {}

  private normalizeDate(value: any): Date | undefined {
    if (!value) return undefined;
    return typeof value.toDate === 'function' ? value.toDate() : value;
  }

  private mapDoc(doc: FirebaseFirestore.DocumentSnapshot): TaskRecord {
    const data = doc.data()!;
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      dueAt: this.normalizeDate(data.dueAt),
      completed: data.completed ?? false,
      proofPhoto: data.proofPhoto,  // Changé
      validatedAt: this.normalizeDate(data.validatedAt),
      userId: data.userId,
      createdAt: this.normalizeDate(data.createdAt)!,
      updatedAt: this.normalizeDate(data.updatedAt)!,
    };
  }

  async create(userId: string, dto: CreateTaskDto) {
    const now = new Date();
    const data: Record<string, any> = {
      title: dto.title,
      completed: dto.completed ?? false,
      userId,
      createdAt: now,
      updatedAt: now,
    };

    if (dto.description !== undefined) data.description = dto.description;
    if (dto.dueAt !== undefined) data.dueAt = new Date(dto.dueAt);

    const docRef = await this.firebase.firestore.collection('tasks').add(data);
    const doc = await docRef.get();
    return this.mapDoc(doc);
  }

  async findAll(userId: string) {
    const snapshot = await this.firebase.firestore
      .collection('tasks')
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map((doc) => this.mapDoc(doc));
  }

  async findOne(userId: string, id: string) {
    const doc = await this.firebase.firestore.collection('tasks').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException('Tâche introuvable');
    }

    const data = doc.data()!;
    if (data.userId !== userId) {
      throw new NotFoundException('Tâche introuvable');
    }

    return this.mapDoc(doc);
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const docRef = this.firebase.firestore.collection('tasks').doc(id);
    await this.findOne(userId, id);

    const updates: Record<string, any> = { updatedAt: new Date() };
    if (dto.title !== undefined) updates.title = dto.title;
    if (dto.description !== undefined) updates.description = dto.description;
    if (dto.completed !== undefined) updates.completed = dto.completed;
    if (dto.dueAt !== undefined) updates.dueAt = new Date(dto.dueAt);

    await docRef.update(updates);
    const updated = await docRef.get();
    return this.mapDoc(updated);
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.firebase.firestore.collection('tasks').doc(id).delete();
    return { id };
  }

  async validate(userId: string, id: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Photo requise pour valider la tâche');
    }
  
    const task = await this.findOne(userId, id);
  
    if (task.validatedAt) {
      throw new BadRequestException('Tâche déjà validée');
    }
  
    const base64Photo = file.buffer.toString('base64');
    const proofPhoto = `data:${file.mimetype};base64,${base64Photo}`;
  
    const now = new Date();
    const docRef = this.firebase.firestore.collection('tasks').doc(id);
    await docRef.update({
      proofPhoto,
      validatedAt: now,
      completed: true,
      updatedAt: now,
    });
  
    await this.firebase.sendPushNotificationToUser(
      userId,
      '🎉 Tâche validée !',
      `La tâche "${task.title}" a été validée avec succès`,
      { taskId: id, type: 'task_validated' }
    );
  
    const updated = await docRef.get();
    return this.mapDoc(updated);
  }
}