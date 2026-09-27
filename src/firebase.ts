import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { ShiftData, HandoverPoint, DeficiencyLogEntry, PatientAuditItem } from './types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// CRITICAL: Must pass firestoreDatabaseId according to Firebase skill
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection to Firestore
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'daily_audits', '_connection_check_'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore: Running in offline cache mode.');
    }
    return false;
  }
}

export interface AuditRecordPayload {
  date: string;
  morningData: ShiftData;
  eveningData: ShiftData;
  nightData: ShiftData;
  handoverPoints: HandoverPoint[];
  deficiencies: DeficiencyLogEntry[];
  patientList: PatientAuditItem[];
  verifiedFlags: Record<string, boolean>;
  wardReady: boolean;
  finalCheckedBy: string;
  updatedAt: string;
}

export async function saveDailyAuditToFirestore(payload: AuditRecordPayload): Promise<void> {
  const docId = (payload.date || new Date().toISOString().split('T')[0]).replace(/[^a-zA-Z0-9_-]/g, '_');
  const docRef = doc(db, 'daily_audits', docId);

  try {
    await setDoc(docRef, {
      ...payload,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `daily_audits/${docId}`);
  }
}

export function subscribeToDailyAudit(
  dateStr: string,
  onUpdate: (data: AuditRecordPayload) => void,
  onError?: (err: any) => void
): () => void {
  const docId = (dateStr || new Date().toISOString().split('T')[0]).replace(/[^a-zA-Z0-9_-]/g, '_');
  const docRef = doc(db, 'daily_audits', docId);

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as AuditRecordPayload);
      }
    },
    (error) => {
      console.error('Firestore subscription error:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, `daily_audits/${docId}`);
    }
  );
}

export async function fetchDailyAudit(dateStr: string): Promise<AuditRecordPayload | null> {
  const docId = (dateStr || new Date().toISOString().split('T')[0]).replace(/[^a-zA-Z0-9_-]/g, '_');
  const docRef = doc(db, 'daily_audits', docId);

  try {
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as AuditRecordPayload;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `daily_audits/${docId}`);
  }
}
