// Firebase Admin SDK initialization for backend notifications
const admin = require('firebase-admin');

// Initialize Firebase Admin with service account credentials
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

/**
 * Sends push notifications to multiple devices for stock updates
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body text
 * @param {string[]} params.tokens - Array of FCM device tokens
 */
export async function sendStockUpdateNotifications({
    title,
    body, 
    tokens
}: {
    title: string,
    body: string,
    tokens: string[]
}) {
    console.log('Sending stock update notifications...');

    try {
        // Send notifications to all tokens in batch
        const response = await admin.messaging().sendEachForMulticast({
            notification: {
                title,
                body
            },
            tokens
        });

        console.log('Successfully sent notifications');

        // Handle any failed deliveries
        if (response.failedTokens?.length > 0) {
            response.failedTokens.forEach((failedToken: { 
                token: string; 
                error: { message: string }; 
            }) => {
                console.error(
                    `Failed to send to token ${failedToken.token}: ${failedToken.error.message}`
                );
                // TODO: Consider removing invalid tokens from database
                // DELETE FROM user_fcm_tokens WHERE fcm_token = failedToken.token
            });
        }

    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}
