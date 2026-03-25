import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { Roadmap } from "@/types/sdg";

const firebaseConfig = {
  // Config would normally go here from .env
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firebaseService = {
  // Push the architected roadmap to Firestore
  async pushRoadmap(classId: string, roadmap: Roadmap) {
    await setDoc(doc(db, "classrooms", classId), {
      roadmap,
      updatedAt: new Date().toISOString()
    });
  },

  // Listen for roadmap changes (used by Student Portal)
  subscribeToRoadmap(classId: string, callback: (roadmap: Roadmap) => void) {
    return onSnapshot(doc(db, "classrooms", classId), (doc) => {
      const data = doc.data();
      if (data?.roadmap) {
        callback(data.roadmap as Roadmap);
      }
    });
  }
};
