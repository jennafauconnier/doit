import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FirebaseService } from '../firebase/firebase.service';
import { TASKS_REMINDER_MESSAGES } from './tasks-reminder-messages';

@Injectable()
export class TasksReminderService {
  constructor(private readonly firebase: FirebaseService) {}

  private readonly motivationalMessages = TASKS_REMINDER_MESSAGES;

  private getRandomMessage(messages: string[], taskTitle: string): string {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    return `${randomMsg}\n"${taskTitle}"`;
  }

  private shouldSendReminder(
    createdAt: Date,
    lastReminder: Date | null,
    now: Date
  ): { send: boolean; phase: 'early' | 'medium' | 'urgent' | 'critical' } {
    const taskAge = now.getTime() - createdAt.getTime();
    const timeSinceLastReminder = lastReminder
      ? now.getTime() - lastReminder.getTime()
      : Infinity;

    const hours = taskAge / (1000 * 60 * 60);

    if (hours >= 24) {
      return {
        send: timeSinceLastReminder >= 30 * 60 * 1000,
        phase: 'critical',
      };
    }

    if (hours >= 12) {
      return {
        send: timeSinceLastReminder >= 60 * 60 * 1000,
        phase: 'urgent',
      };
    }

    if (hours >= 6) {
      return {
        send: timeSinceLastReminder >= 2 * 60 * 60 * 1000,
        phase: 'medium',
      };
    }

    if (hours >= 2) {
      return {
        send: lastReminder === null,
        phase: 'early',
      };
    }

    return { send: false, phase: 'early' };
  }

  @Cron('*/30 * * * *')
  async sendTaskReminders() {
    console.log('🔔 Vérification des tâches à rappeler...');

    const now = new Date();

    try {
      const snapshot = await this.firebase.firestore
        .collection('tasks')
        .where('completed', '==', false)
        .get();

      console.log(`📋 ${snapshot.size} tâches non complétées trouvées`);

      let sentCount = 0;

      for (const doc of snapshot.docs) {
        const task = doc.data();
        const taskId = doc.id;
        const createdAt = task.createdAt?.toDate() || new Date();
        const lastReminder = task.lastReminderSent?.toDate() || null;

        const { send, phase } = this.shouldSendReminder(
          createdAt,
          lastReminder,
          now
        );

        if (!send) {
          continue;
        }

        let messages;
        let emoji;
        switch (phase) {
          case 'critical':
            messages = this.motivationalMessages.critical;
            emoji = '🔴';
            break;
          case 'urgent':
            messages = this.motivationalMessages.urgent;
            emoji = '⏰';
            break;
          case 'medium':
            messages = this.motivationalMessages.medium;
            emoji = '💪';
            break;
          case 'early':
            messages = this.motivationalMessages.early;
            emoji = '👋';
            break;
        }

        const message = this.getRandomMessage(messages, task.title);
        const reminderCount = (task.reminderCount || 0) + 1;

        try {
          await this.firebase.sendPushNotificationToUser(
            task.userId,
            `${emoji} Rappel de tâche`,
            message,
            { taskId, type: 'task_reminder', phase, reminderCount }
          );

          await doc.ref.update({
            lastReminderSent: now,
            reminderCount,
          });

          sentCount++;
          console.log(
            `✅ Rappel ${phase} envoyé pour ${taskId} (${reminderCount} total)`
          );
        } catch (error) {
          console.error(`❌ Erreur lors de l'envoi du rappel pour ${taskId}:`, error);
        }
      }

      console.log(`📬 ${sentCount} rappels envoyés au total`);
    } catch (error) {
      console.error('❌ Erreur lors de la vérification des rappels:', error);
    }
  }

  async sendTestReminder(userId: string, taskId: string) {
    const messages = [
      ...this.motivationalMessages.early,
      ...this.motivationalMessages.medium,
      ...this.motivationalMessages.urgent,
      ...this.motivationalMessages.critical,
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    await this.firebase.sendPushNotificationToUser(
      userId,
      '🧪 Test de rappel',
      randomMsg,
      { taskId, type: 'task_reminder_test' }
    );
  }
}