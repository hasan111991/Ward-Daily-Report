import * as XLSX from 'xlsx';
import { ShiftData, HandoverPoint, DeficiencyLogEntry, PatientAuditItem } from '../types';
import { MASTER_AUDIT_SECTIONS, RED_FLAG_ITEMS } from '../data/checklistData';

export function exportWardAuditExcel({
  morningData,
  eveningData,
  nightData,
  handoverPoints,
  deficiencyLog,
  patientAuditList,
  dateString
}: {
  morningData: ShiftData;
  eveningData: ShiftData;
  nightData: ShiftData;
  handoverPoints: HandoverPoint[];
  deficiencyLog: DeficiencyLogEntry[];
  patientAuditList: PatientAuditItem[];
  dateString: string;
}) {
  const wb = XLSX.utils.book_new();

  // Helper to build Shift Sheet
  const buildShiftSheet = (shiftName: string, data: ShiftData) => {
    const shiftTimingMap: Record<string, string> = {
      morning: '08:00 AM – 02:00 PM',
      evening: '02:00 PM – 08:00 PM',
      night: '08:00 PM – 08:00 AM'
    };
    const shiftTiming = shiftTimingMap[data.shift] || '';

    const rows: (string | number)[][] = [
      ['WARD 3B - INTERNAL AUDIT DAILY CHECKLIST', '', '', '', ''],
      [`Shift: ${shiftName.toUpperCase()} (${shiftTiming})`, `Date: ${data.date || dateString}`, `Checked By: ${data.staffName || 'Staff Nurse'}`, `Time: ${data.timeChecked || 'Current'}`, `Status: ${data.verified ? 'VERIFIED' : 'PENDING'}`],
      [''],
      ['S.No', 'Category', 'Audit Verification Item', 'Priority', 'Status (OK / Issue)', 'Notes / Deficiency Identified']
    ];

    let serialNo = 1;
    data.categories.forEach(cat => {
      // Category header
      rows.push(['', `[ ${cat.title.toUpperCase()} ]`, '', '', '', '']);
      cat.items.forEach(item => {
        const statusLabel = item.checked ? 'COMPLIANT / OK' : (item.status === 'issue' ? 'DEFICIENCY' : 'PENDING CHECK');
        rows.push([
          serialNo++,
          cat.title,
          item.text,
          (item.priority || 'routine').toUpperCase(),
          statusLabel,
          item.deficiencyNote || item.note || ''
        ]);
      });
    });

    rows.push(['']);
    rows.push(['CRITICAL RED FLAG VERIFICATION (MUST PHYSICALLY CHECK BEFORE SHIFT CLOSE):']);
    RED_FLAG_ITEMS.forEach((rf, idx) => {
      rows.push([idx + 1, 'RED-FLAG', rf.title, 'CRITICAL', 'PHYSICALLY VERIFIED', rf.standard]);
    });

    rows.push(['']);
    rows.push(['Staff Signature:', data.signature || 'Digital Sign-off on Floor', 'Verified By Ward Incharge:', '', 'Audit Readiness: SATISFACTORY']);

    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Column widths
    ws['!cols'] = [
      { wch: 8 },  // S.No
      { wch: 25 }, // Category
      { wch: 65 }, // Audit Verification Item
      { wch: 14 }, // Priority
      { wch: 22 }, // Status
      { wch: 40 }  // Notes
    ];

    return ws;
  };

  // 1. Morning Shift Sheet
  const morningWs = buildShiftSheet('Morning', morningData);
  XLSX.utils.book_append_sheet(wb, morningWs, 'Morning (8am-2pm)');

  // 2. Evening Shift Sheet
  const eveningWs = buildShiftSheet('Evening', eveningData);
  XLSX.utils.book_append_sheet(wb, eveningWs, 'Evening (2pm-8pm)');

  // 3. Night Shift Sheet
  const nightWs = buildShiftSheet('Night', nightData);
  XLSX.utils.book_append_sheet(wb, nightWs, 'Night (8pm-8am)');

  // 4. 3-Shift Handover Sheet
  const handoverRows: (string | number)[][] = [
    ['WARD 3B - 3-SHIFT CLINICAL & AUDIT HANDOVER RECORD', '', '', '', '', '', '', ''],
    [`Date: ${dateString}`, 'Ward: 3B General & Speciality', 'Compliance Standard: Hospital Internal Audit', '', '', '', '', ''],
    ['IMPORTANT: At shift conclusion, these 8 core clinical areas must be formally handed over at bedside.'],
    [''],
    [
      'S.No',
      'Mandatory Handover Area',
      'Morning → Evening (2:00 PM)',
      'Morning Handover Notes / Patients',
      'Evening → Night (8:00 PM)',
      'Evening Handover Notes / Patients',
      'Night → Morning (8:00 AM)',
      'Night Handover Notes / Patients'
    ]
  ];

  handoverPoints.forEach((hp, idx) => {
    handoverRows.push([
      idx + 1,
      hp.title,
      hp.morningToEvening.checked ? 'VERIFIED / TRANSFERRED' : 'PENDING',
      hp.morningToEvening.notes || (hp.morningToEvening.handedBy ? `By: ${hp.morningToEvening.handedBy}` : 'Nil specific'),
      hp.eveningToNight.checked ? 'VERIFIED / TRANSFERRED' : 'PENDING',
      hp.eveningToNight.notes || (hp.eveningToNight.handedBy ? `By: ${hp.eveningToNight.handedBy}` : 'Nil specific'),
      hp.nightToMorning.checked ? 'VERIFIED / TRANSFERRED' : 'PENDING',
      hp.nightToMorning.notes || (hp.nightToMorning.handedBy ? `By: ${hp.nightToMorning.handedBy}` : 'Nil specific')
    ]);
  });

  handoverRows.push(['']);
  handoverRows.push(['HANDOVER SIGN-OFF VERIFICATION MATRIX']);
  handoverRows.push(['Shift Transition', 'Relieving Staff (Handed Over By)', 'Incoming Staff (Taken Over By)', 'Time of Bedside Handover', 'All Patient Files Handed?']);
  handoverRows.push(['Morning to Evening', morningData.staffName || 'Staff Nurse (Morning)', eveningData.staffName || 'Staff Nurse (Evening)', '14:00 (2:00 PM)', 'YES - Physical & HMS Checked']);
  handoverRows.push(['Evening to Night', eveningData.staffName || 'Staff Nurse (Evening)', nightData.staffName || 'Staff Nurse (Night)', '20:00 (8:00 PM)', 'YES - Physical & HMS Checked']);
  handoverRows.push(['Night to Morning', nightData.staffName || 'Staff Nurse (Night)', morningData.staffName || 'Staff Nurse (Morning)', '08:00 (8:00 AM)', 'YES - Physical & HMS Checked']);

  const handoverWs = XLSX.utils.aoa_to_sheet(handoverRows);
  handoverWs['!cols'] = [
    { wch: 8 },  // S.No
    { wch: 38 }, // Area
    { wch: 25 }, // M->E status
    { wch: 35 }, // M->E notes
    { wch: 25 }, // E->N status
    { wch: 35 }, // E->N notes
    { wch: 25 }, // N->M status
    { wch: 35 }  // N->M notes
  ];
  XLSX.utils.book_append_sheet(wb, handoverWs, '3-Shift Handover');

  // 5. Master Audit Preparation (10 Core Sections)
  const masterRows: (string | number)[][] = [
    ['WARD 3B - COMPREHENSIVE INTERNAL AUDIT PREPARATION CHECKLIST (10 AREAS)', '', '', ''],
    ['Hospital Quality & Patient Safety Accreditation Standard', '', '', ''],
    ['NOTE: Do not just tick—physically verify each item before audit round.', '', '', ''],
    [''],
    ['S.No', 'Section & Standard Item', 'Audit Requirement & Verification Focus', 'Compliance Status']
  ];

  let masterItemIdx = 1;
  MASTER_AUDIT_SECTIONS.forEach(sec => {
    masterRows.push(['', `[ ${sec.title.toUpperCase()} ]`, '', '']);
    sec.items.forEach(itemText => {
      masterRows.push([
        masterItemIdx++,
        sec.title,
        itemText,
        'READY FOR PHYSICAL AUDIT'
      ]);
    });
  });

  const masterWs = XLSX.utils.aoa_to_sheet(masterRows);
  masterWs['!cols'] = [
    { wch: 8 },
    { wch: 35 },
    { wch: 75 },
    { wch: 25 }
  ];
  XLSX.utils.book_append_sheet(wb, masterWs, 'Master Audit (10 Areas)');

  // 6. Daily Deficiency & Sign-off Table
  const defRows: (string | number)[][] = [
    ['WARD 3B - DAILY AUDIT DEFICIENCY & CORRECTIVE ACTION LOG', '', '', '', '', '', ''],
    [`Date: ${dateString}`, 'Ward: 3B', 'Target: Zero Outstanding Critical Deficiencies', '', '', '', ''],
    [''],
    ['S.No', 'Clinical / Operational Area', 'Status (OK / Issue)', 'Deficiency Observed', 'Action Taken / CAPA', 'Responsible Person', 'Target Time / Resolved']
  ];

  deficiencyLog.forEach((def, idx) => {
    defRows.push([
      idx + 1,
      def.area,
      def.status,
      def.deficiency,
      def.actionTaken,
      def.responsible,
      `${def.targetTime} (${def.resolved ? 'RESOLVED' : 'IN PROGRESS'})`
    ]);
  });

  defRows.push(['']);
  defRows.push(['RANDOM 5-PATIENT BEDSIDE & HMS AUDIT SAMPLE:']);
  defRows.push(['Bed No', 'Patient Name', 'MRN', 'ID Band OK', 'Allergy Doc', 'Fall Risk Doc', 'MAR Complete', 'Physical = HMS']);
  patientAuditList.forEach(p => {
    defRows.push([
      p.bedNo,
      p.patientName,
      p.mrn,
      p.idBandOk ? 'YES' : 'NO',
      p.allergyDocumented ? 'YES' : 'NO',
      p.fallRiskAssessed ? 'YES' : 'NO',
      p.marComplete ? 'YES' : 'NO',
      p.physicalMatchesHms ? 'MATCHED' : 'DISCREPANCY'
    ]);
  });

  const defWs = XLSX.utils.aoa_to_sheet(defRows);
  defWs['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 45 },
    { wch: 45 },
    { wch: 25 },
    { wch: 25 }
  ];
  XLSX.utils.book_append_sheet(wb, defWs, 'Daily Sign-Off & Deficiencies');

  // Trigger browser download
  const cleanDate = dateString.replace(/[^a-zA-Z0-9]/g, '_');
  XLSX.writeFile(wb, `Ward_3B_Daily_Internal_Audit_Checklist_${cleanDate}.xlsx`);
}
