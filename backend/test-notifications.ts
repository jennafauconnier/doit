import * as admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Initialiser Firebase Admin
const serviceAccountPath = path.join(process.cwd(), 'firebase-service-account.json');
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const firestore = app.firestore();

// Fonction pour envoyer une notification push
async function sendPushNotification(
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
    console.error('Erreur lors de l\'envoi:', error);
    throw error;
  }
}

// Fonction principale de test
async function testNotificationSystem() {
  console.log(`\n${colors.bright}${colors.cyan}🧪 TEST DU SYSTÈME DE NOTIFICATIONS${colors.reset}\n`);

  try {
    // 1. Demander l'email de l'utilisateur
    console.log(`${colors.yellow}📧 Connectez-vous d'abord dans l'app pour enregistrer votre push token${colors.reset}`);
    console.log(`${colors.yellow}Puis entrez votre email ci-dessous:\n${colors.reset}`);

    const email = await promptUser('Email: ');

    // 2. Trouver l'utilisateur dans Firestore
    console.log(`\n${colors.blue}🔍 Recherche de l'utilisateur...${colors.reset}`);
    const usersSnapshot = await firestore
      .collection('users')
      .where('email', '==', email)
      .get();

    if (usersSnapshot.empty) {
      console.log(`${colors.red}❌ Utilisateur non trouvé avec l'email: ${email}${colors.reset}`);
      process.exit(1);
    }

    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;
    const pushToken = userData.pushToken;

    console.log(`${colors.green}✅ Utilisateur trouvé: ${userData.username || email}${colors.reset}`);

    if (!pushToken) {
      console.log(`${colors.red}❌ Pas de push token trouvé. Connectez-vous d'abord dans l'app !${colors.reset}`);
      process.exit(1);
    }

    console.log(`${colors.green}✅ Push token trouvé: ${pushToken.substring(0, 30)}...${colors.reset}`);

    // 3. Créer une tâche de test
    console.log(`\n${colors.blue}📝 Création d'une tâche de test...${colors.reset}`);
    const testTask = await firestore.collection('tasks').add({
      title: '🧪 Tâche de test - Système de notifications',
      description: 'Cette tâche va générer des notifications toutes les minutes',
      completed: false,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      reminderCount: 0,
    });

    console.log(`${colors.green}✅ Tâche créée avec ID: ${testTask.id}${colors.reset}`);

    // 4. Simuler l'envoi de notifications
    console.log(`\n${colors.bright}${colors.cyan}🚀 DÉMARRAGE DU TEST - 10 notifications sur 10 minutes${colors.reset}`);
    console.log(`${colors.yellow}⏰ Une notification sera envoyée chaque minute${colors.reset}`);
    console.log(`${colors.yellow}💡 Vous pouvez arrêter le test avec Ctrl+C\n${colors.reset}`);

    const messages = [
      { emoji: '👋', text: 'Prêt à accomplir votre tâche ?', phase: 'EARLY' },
      { emoji: '🌟', text: 'Un petit pas aujourd\'hui, un grand bond demain !', phase: 'EARLY' },
      { emoji: '💪', text: 'Allez, vous pouvez le faire !', phase: 'MEDIUM' },
      { emoji: '🎯', text: 'Ne laissez pas cette tâche attendre !', phase: 'MEDIUM' },
      { emoji: '⚡', text: 'Validez maintenant, vous vous sentirez mieux !', phase: 'MEDIUM' },
      { emoji: '⏰', text: 'Le temps passe vite !', phase: 'URGENT' },
      { emoji: '🔥', text: 'Cette tâche ne va pas se faire toute seule !', phase: 'URGENT' },
      { emoji: '🔴', text: 'Action requise MAINTENANT !', phase: 'CRITICAL' },
      { emoji: '⛔', text: 'Ne procrastinez plus !', phase: 'CRITICAL' },
      { emoji: '🚨', text: 'Validez cette tâche immédiatement !', phase: 'CRITICAL' },
    ];

    for (let i = 0; i < messages.length; i++) {
      const { emoji, text, phase } = messages[i];
      const reminderNum = i + 1;

      // Afficher dans le terminal
      console.log(`\n${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
      console.log(`${colors.cyan}⏱️  Minute ${reminderNum}/10${colors.reset}`);
      console.log(`${colors.yellow}📱 Phase: ${phase}${colors.reset}`);
      console.log(`${colors.green}📨 Envoi: ${emoji} ${text}${colors.reset}`);

      // Envoyer la notification
      try {
        await sendPushNotification(
          pushToken,
          `${emoji} Rappel #${reminderNum} [${phase}]`,
          text,
          { taskId: testTask.id, type: 'task_reminder_test', reminderNum, phase }
        );

        // Mettre à jour la tâche
        await testTask.update({
          lastReminderSent: new Date(),
          reminderCount: reminderNum,
        });

        console.log(`${colors.green}✅ Notification envoyée avec succès${colors.reset}`);
      } catch (error) {
        console.log(`${colors.red}❌ Erreur: ${error.message}${colors.reset}`);
      }

      // Attendre 1 minute avant la prochaine notification (sauf pour la dernière)
      if (i < messages.length - 1) {
        console.log(`${colors.blue}⏳ Attente de 60 secondes...${colors.reset}`);
        await sleep(60000);
      }
    }

    // 5. Résumé final
    console.log(`\n${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bright}${colors.green}🎉 TEST TERMINÉ !${colors.reset}`);
    console.log(`${colors.green}✅ ${messages.length} notifications envoyées${colors.reset}`);
    console.log(`${colors.yellow}📝 ID de la tâche de test: ${testTask.id}${colors.reset}`);
    console.log(`${colors.cyan}💡 Vous pouvez supprimer cette tâche dans l'app${colors.reset}\n`);

  } catch (error) {
    console.log('ERROR', error)
    console.error(`\n${colors.red}❌ ERREUR: ${error.message}${colors.reset}\n`);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Utilitaires
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function promptUser(question: string): Promise<string> {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Lancer le test
testNotificationSystem();