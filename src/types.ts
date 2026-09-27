export type ShiftType = 'morning' | 'evening' | 'night';

export interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  priority?: 'critical' | 'high' | 'routine';
  note?: string;
  checked: boolean;
  status?: 'ok' | 'issue' | 'na';
  deficiencyNote?: string;
}

export interface ShiftCategory {
  id: string;
  title: string;
  badgeColor?: string;
  priorityLevel: 'critical' | 'important' | 'routine';
  items: ChecklistItem[];
}

export interface ShiftData {
  shift: ShiftType;
  date: string;
  staffName: string;
  staffRole?: string;
  timeChecked: string;
  signature: string;
  verified: boolean;
  categories: ShiftCategory[];
}

export interface HandoverPoint {
  id: string;
  title: string;
  morningToEvening: { checked: boolean; notes: string; handedBy: string; receivedBy: string };
  eveningToNight: { checked: boolean; notes: string; handedBy: string; receivedBy: string };
  nightToMorning: { checked: boolean; notes: string; handedBy: string; receivedBy: string };
}

export interface DeficiencyLogEntry {
  id: string;
  area: string;
  status: 'OK' | 'Issue';
  deficiency: string;
  actionTaken: string;
  responsible: string;
  targetTime: string;
  resolved: boolean;
}

export interface PatientAuditItem {
  bedNo: string;
  patientName: string;
  mrn: string;
  idBandOk: boolean;
  allergyDocumented: boolean;
  fallRiskAssessed: boolean;
  vitalSignsCurrent: boolean;
  marComplete: boolean;
  physicalMatchesHms: boolean;
  notes: string;
}

export interface StaffQuestion {
  id: string;
  question: string;
  keyAnswer: string;
  sopReference: string;
  passed?: boolean;
  staffTested?: string;
}
