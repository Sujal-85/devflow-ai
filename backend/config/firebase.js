import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Check if credentials are in an external file (best practice for production)
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let serviceAccount;

if (serviceAccountPath) {
    try {
        serviceAccount = JSON.parse(fs.readFileSync(path.resolve(serviceAccountPath), 'utf8'));
    } catch (error) {
        console.warn('Warning: Could not load service account from GOOGLE_APPLICATION_CREDENTIALS path.');
    }
}

// Fallback: Check if credentials are passed directly as individual env vars (e.g. for simple setups)
if (!serviceAccount && process.env.FIREBASE_PRIVATE_KEY) {
    serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
}

try {
    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase Admin Initialized successfully');
    } else {
        console.warn('Firebase Admin NOT initialized: No credentials found. Please set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_PRIVATE_KEY env vars.');
    }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

export default admin;
