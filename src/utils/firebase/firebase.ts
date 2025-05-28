'use client'

import { addUserFcmToken } from "@/app/home/actions";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize messaging only on client side
let messaging: any = null;

if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

export function requestPermission() {
    if (typeof window === 'undefined') return;
    let token: string | null = null;
    
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY }).then((currentToken) => {
            if (currentToken) {
                console.log("Token:", token)
                localStorage.setItem('fcmToken', currentToken);
                addUserFcmToken(currentToken)
            } else {
                console.log('No registration token available. Request permission to generate one.');
                return null
            }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });

    return token
    } else {
        console.log('Notification permission denied.');
        return null
    }
    });
}

// Initialize Firebase Cloud Messaging and get a reference to the service

