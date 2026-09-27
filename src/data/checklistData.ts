import { ShiftCategory, HandoverPoint, DeficiencyLogEntry, PatientAuditItem, StaffQuestion } from '../types';

export const MORNING_SHIFT_CATEGORIES: ShiftCategory[] = [
  {
    id: 'm-patient',
    title: 'Patient & Files',
    priorityLevel: 'critical',
    items: [
      { id: 'm-p-1', category: 'Patient & Files', text: 'All patients physically identified', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-2', category: 'Patient & Files', text: 'ID bands/cards checked and legible', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-3', category: 'Patient & Files', text: 'Allergy status checked & documented', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-4', category: 'Patient & Files', text: 'Fall-risk patients identified & precautions in place', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-5', category: 'Patient & Files', text: 'Pressure-injury-risk patients checked (Braden scale / repositioning)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-6', category: 'Patient & Files', text: 'Pain assessment documented with score', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-p-7', category: 'Patient & Files', text: 'Vital signs complete & current on chart', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-8', category: 'Patient & Files', text: 'Nursing notes updated and timely', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-p-9', category: 'Patient & Files', text: 'Doctor / consultant orders reviewed & carried out', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-10', category: 'Patient & Files', text: 'Medication administration record (MAR) updated', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-11', category: 'Patient & Files', text: 'Intake / Output documented where applicable', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-p-12', category: 'Patient & Files', text: 'Investigation reports / critical lab results checked', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-p-13', category: 'Patient & Files', text: 'Minimum 5 patient files / HMS randomly audited', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-p-14', category: 'Patient & Files', text: 'Physical paper file strictly matches HMS electronic record', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'm-medication',
    title: 'Medication & Drug Storage',
    priorityLevel: 'critical',
    items: [
      { id: 'm-m-1', category: 'Medication', text: 'Medication trolley & cupboard clean and organized', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-m-2', category: 'Medication', text: 'No expired medicines in stock or drawers', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-m-3', category: 'Medication', text: 'Near-expiry medicines identified & flagged (Red dot/tag)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-m-4', category: 'Medication', text: 'All medicines properly labelled with open date/time', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-m-5', category: 'Medication', text: 'High-alert & LASA medicines properly separated & highlighted', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-m-6', category: 'Medication', text: 'Emergency medicines available & within expiry dates', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-m-7', category: 'Medication', text: 'Antibiotic stock physically verified against indent', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-m-8', category: 'Medication', text: 'Refrigerator temperature recorded (2°C – 8°C)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-m-9', category: 'Medication', text: 'Controlled-drug (Narcotics) register double-checked & signed', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-m-10', category: 'Medication', text: 'Stock discrepancy / drug shortage reported to pharmacy', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'm-crash-cart',
    title: 'Crash Cart & Emergency Equipment',
    priorityLevel: 'critical',
    items: [
      { id: 'm-c-1', category: 'Crash Cart', text: 'Crash cart accessible & completely unobstructed', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-2', category: 'Crash Cart', text: 'Seal / checking system verified intact with serial number', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-3', category: 'Crash Cart', text: 'Crash-cart daily checklist completed & signed', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-4', category: 'Crash Cart', text: 'Defibrillator functional (battery self-test status verified OK)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-5', category: 'Crash Cart', text: 'Adult & Pediatric defibrillator pads available & in-date', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-6', category: 'Crash Cart', text: 'Ambu bag with appropriate masks (Adult/Pediatric) ready', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-7', category: 'Crash Cart', text: 'Ward central & portable suction tested functional', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-8', category: 'Crash Cart', text: 'Oxygen cylinder pressure checked & flowmeter functional', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-9', category: 'Crash Cart', text: 'Airway equipment (laryngoscope, blades, ET tubes) available', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-c-10', category: 'Crash Cart', text: 'IV cannulas, syringes, needles & infusion sets stocked', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'm-infection-control',
    title: 'Infection Prevention & Control',
    priorityLevel: 'important',
    items: [
      { id: 'm-i-1', category: 'Infection Control', text: 'Hand sanitizers filled and available at each bedside', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-i-2', category: 'Infection Control', text: 'Handwash stations equipped with soap & paper towels', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-i-3', category: 'Infection Control', text: 'PPE (gloves, masks, aprons, eye shields) fully stocked', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-i-4', category: 'Infection Control', text: 'Sharps containers safe, properly mounted & not over 3/4 filled', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-i-5', category: 'Infection Control', text: 'Biomedical waste segregation strictly followed (Yellow/Red/Blue/Black)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-i-6', category: 'Infection Control', text: 'Isolation precautions & barrier signage displayed where required', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-i-7', category: 'Infection Control', text: 'Clean and soiled linen segregation handled correctly', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-i-8', category: 'Infection Control', text: 'High-touch surfaces sanitized & cleaning checklist signed', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'm-equipment',
    title: 'Ward Environment & Equipment',
    priorityLevel: 'important',
    items: [
      { id: 'm-e-1', category: 'Ward & Equipment', text: 'Ward corridors, nursing station & bedside clean & organized', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-e-2', category: 'Ward & Equipment', text: 'Bed castor brakes functional and locked', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-e-3', category: 'Ward & Equipment', text: 'Side rails functional and raised where indicated', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-e-4', category: 'Ward & Equipment', text: 'Nurse call bell system functional at all beds & washrooms', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-e-5', category: 'Ward & Equipment', text: 'BP apparatus & pulse oximeters tested & batteries charged', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-e-6', category: 'Ward & Equipment', text: 'Glucometer calibrated with matching strips available', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-e-7', category: 'Ward & Equipment', text: 'Digital thermometers sanitized & functional', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-e-8', category: 'Ward & Equipment', text: 'Faulty equipment red-tagged, logged & removed from clinical area', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'm-handover',
    title: 'Morning Shift Handover Preparation',
    priorityLevel: 'important',
    items: [
      { id: 'm-h-1', category: 'Handover', text: 'Critical/unstable patients identified with handover notes ready', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-h-2', category: 'Handover', text: 'Pending stat investigations & pending lab samples noted', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-h-3', category: 'Handover', text: 'Scheduled afternoon procedures & pre-op checklists ready', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-h-4', category: 'Handover', text: 'Medication discrepancies / shortages communicated', priority: 'critical', checked: false, status: 'ok' },
      { id: 'm-h-5', category: 'Handover', text: 'Biomedical / maintenance breakdown tickets communicated', priority: 'high', checked: false, status: 'ok' },
      { id: 'm-h-6', category: 'Handover', text: 'Previous internal audit action points verified on floor', priority: 'critical', checked: false, status: 'ok' }
    ]
  }
];

export const EVENING_SHIFT_CATEGORIES: ShiftCategory[] = [
  {
    id: 'e-patient',
    title: 'Patient Safety & Bedside',
    priorityLevel: 'critical',
    items: [
      { id: 'e-p-1', category: 'Patient Safety', text: 'Patient ID band verified for all active beds', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-2', category: 'Patient Safety', text: 'Allergy status verified against current orders', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-3', category: 'Patient Safety', text: 'Fall precautions actively maintained (bed low position, call bell within reach)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-4', category: 'Patient Safety', text: 'Pressure injury repositioning documented on turn-chart', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-5', category: 'Patient Safety', text: 'Evening pain score documented with intervention evaluation', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-p-6', category: 'Patient Safety', text: 'Evening vital signs charted and abnormal values escalated', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-7', category: 'Patient Safety', text: 'IV lines, central lines, surgical drains & catheters safely secured & dated', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-8', category: 'Patient Safety', text: 'Oxygen cannulas/masks safely positioned & humidifiers checked', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-p-9', category: 'Patient Safety', text: 'Call bells tested and within patient physical reach', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-p-10', category: 'Patient Safety', text: 'Bed brakes locked & side rails used as per assessment', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'e-files',
    title: 'Files & HMS Documentation',
    priorityLevel: 'critical',
    items: [
      { id: 'e-f-1', category: 'Files & HMS', text: 'Evening nursing notes updated and reflective of clinical state', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-f-2', category: 'Files & HMS', text: 'Medication administration recorded concurrently with dose given', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-f-3', category: 'Files & HMS', text: 'Afternoon consultant / on-call doctor orders countersigned & followed', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-f-4', category: 'Files & HMS', text: 'Intake / Output balance tallied for evening hours', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-f-5', category: 'Files & HMS', text: 'Evening lab / diagnostic results retrieved, reviewed & signed by MO', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-f-6', category: 'Files & HMS', text: 'New afternoon admissions: admission paperwork & initial orders complete', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-f-7', category: 'Files & HMS', text: 'Discharge / transfer documentation complete with summary in hand', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-f-8', category: 'Files & HMS', text: 'All clinical entries dated, timed (24h format) and signed with designation', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-f-9', category: 'Files & HMS', text: 'No missing history sheets, consent forms or progress notes in files', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'e-medication',
    title: 'Medication & Controlled Drugs',
    priorityLevel: 'critical',
    items: [
      { id: 'e-m-1', category: 'Medication', text: 'Medication trolley re-organized and restocked for night shift', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-m-2', category: 'Medication', text: 'All reconstituted medicines labelled with date, time & initial', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-m-3', category: 'Medication', text: 'Night doses checked against orders; no missed doses', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-m-4', category: 'Medication', text: 'Refrigerator temperature logged for evening shift (2°C – 8°C)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-m-5', category: 'Medication', text: 'Controlled drug register counted, verified and signed jointly', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-m-6', category: 'Medication', text: 'Antibiotic inventory cross-checked with pharmacy indent', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-m-7', category: 'Medication', text: 'Any drug shortage or transcription discrepancy escalated', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'e-emergency',
    title: 'Crash Cart & Emergency Preparedness',
    priorityLevel: 'critical',
    items: [
      { id: 'e-em-1', category: 'Emergency', text: 'Crash cart accessibility unobstructed in corridor/alcove', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-em-2', category: 'Emergency', text: 'Cart seal intact; if seal broken, physical count checklist complete', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-em-3', category: 'Emergency', text: 'Defibrillator status indicator shows ready/green self-test', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-em-4', category: 'Emergency', text: 'Emergency oxygen port/cylinder pressure verified', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-em-5', category: 'Emergency', text: 'Emergency suction bottle clean with functional vacuum pressure', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-em-6', category: 'Emergency', text: 'Ambu bag, laryngoscope & emergency drug tray inspected', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'e-infection-env',
    title: 'Infection Control, Ward & Fire Safety',
    priorityLevel: 'important',
    items: [
      { id: 'e-ie-1', category: 'Infection Control & Environment', text: 'Hand hygiene stations replenished with sanitizers & gloves', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-ie-2', category: 'Infection Control & Environment', text: 'Sharps bins checked; closed/replaced if at fill line', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-ie-3', category: 'Infection Control & Environment', text: 'Biomedical waste collected & segregated by housekeeping', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-ie-4', category: 'Infection Control & Environment', text: 'Ward patient rooms & toilets inspected clean and odor-free', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-ie-5', category: 'Infection Control & Environment', text: 'Nursing station de-cluttered, documents filed away securely', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-ie-6', category: 'Infection Control & Environment', text: 'Emergency exit doors unlocked, clear of trolleys/beds', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-ie-7', category: 'Infection Control & Environment', text: 'Fire extinguishers accessible with inspection tag in-date', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'e-handover',
    title: 'Evening to Night Handover',
    priorityLevel: 'important',
    items: [
      { id: 'e-ho-1', category: 'Handover to Night', text: 'Critical / high-dependency patients verbally communicated at bedside', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-ho-2', category: 'Handover to Night', text: 'Pending lab results & urgent night investigations communicated', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-ho-3', category: 'Handover to Night', text: 'Night-time medications, IV infusions & NPO status highlighted', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-ho-4', category: 'Handover to Night', text: 'Any patient fall, near-miss or clinical incident logged & reported', priority: 'critical', checked: false, status: 'ok' },
      { id: 'e-ho-5', category: 'Handover to Night', text: 'Faulty medical equipment tagged and reported for biomedical team', priority: 'high', checked: false, status: 'ok' },
      { id: 'e-ho-6', category: 'Handover to Night', text: 'Outstanding audit deficiencies from morning reviewed with night team', priority: 'critical', checked: false, status: 'ok' }
    ]
  }
];

export const NIGHT_SHIFT_CATEGORIES: ShiftCategory[] = [
  {
    id: 'n-patient',
    title: 'Patient Safety & Night Surveillance',
    priorityLevel: 'critical',
    items: [
      { id: 'n-p-1', category: 'Patient Safety', text: 'All ward patients physically counted and verified in assigned beds', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-2', category: 'Patient Safety', text: 'Patient ID bands checked, legible and securely attached', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-3', category: 'Patient Safety', text: 'High-risk fall patients assessed; bed rails up, night lights on', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-4', category: 'Patient Safety', text: 'Bed castor brakes locked on all occupied patient beds', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-5', category: 'Patient Safety', text: 'Pressure injury two-hourly turn-chart protocol executed', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-6', category: 'Patient Safety', text: 'Pain assessment performed & night analgesia documented', priority: 'high', checked: false, status: 'ok' },
      { id: 'n-p-7', category: 'Patient Safety', text: 'Night vital signs charted (including midnight & early morning rounds)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-8', category: 'Patient Safety', text: 'Oxygen lines, IV infusion pumps, drains & Foley catheters patent and safe', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-9', category: 'Patient Safety', text: 'Call bells positioned within easy grasp of sleeping/resting patients', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-p-10', category: 'Patient Safety', text: 'Patient bedside free from trip hazards, loose wires or spilled fluids', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'n-files',
    title: 'Files & HMS Cross-Verification',
    priorityLevel: 'critical',
    items: [
      { id: 'n-f-1', category: 'Files & HMS', text: 'Night shift nursing notes summarized and recorded', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-2', category: 'Files & HMS', text: 'Midnight & 06:00 vital signs charted in HMS and paper file', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-3', category: 'Files & HMS', text: 'Medication administration record (MAR) completely signed; no blanks', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-4', category: 'Files & HMS', text: '24-hour Intake / Output total calculated and balanced for morning report', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-5', category: 'Files & HMS', text: 'Any sudden clinical deterioration escalated to on-call MO with SBAR notes', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-6', category: 'Files & HMS', text: 'Doctor orders verified and signed with date & time', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-7', category: 'Files & HMS', text: 'Random audit of 5 patient files completed to ensure zero missing sheets', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-f-8', category: 'Files & HMS', text: 'Physical paper charts and electronic HMS data verified 100% matched', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'n-med-emergency',
    title: 'Medication & Emergency Ready',
    priorityLevel: 'critical',
    items: [
      { id: 'n-me-1', category: 'Medication & Emergency', text: 'Medication trolley locked and secure at nursing station', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-me-2', category: 'Medication & Emergency', text: 'Emergency medication tray verified intact and unexpired', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-me-3', category: 'Medication & Emergency', text: 'Medicine refrigerator temperature recorded (2°C – 8°C log updated)', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-me-4', category: 'Medication & Emergency', text: 'Crash cart access unobstructed; pathway clear of rollaways', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-me-5', category: 'Medication & Emergency', text: 'Defibrillator test status confirmed ready for emergency code', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-me-6', category: 'Medication & Emergency', text: 'Emergency oxygen & suction apparatus tested ready at bedside/cart', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-me-7', category: 'Medication & Emergency', text: 'Ambu bag and airway masks verified in crash cart', priority: 'critical', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'n-infection',
    title: 'Infection Control & Environment',
    priorityLevel: 'important',
    items: [
      { id: 'n-i-1', category: 'Infection Control', text: 'Hand sanitizers checked and filled for the morning rush', priority: 'high', checked: false, status: 'ok' },
      { id: 'n-i-2', category: 'Infection Control', text: 'PPE supplies replenished at nursing station & isolation rooms', priority: 'high', checked: false, status: 'ok' },
      { id: 'n-i-3', category: 'Infection Control', text: 'Sharps containers verified safe; zero loose needles or exposed sharps', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-i-4', category: 'Infection Control', text: 'Biomedical waste bags tied & arranged for early morning collection', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-i-5', category: 'Infection Control', text: 'Isolation precautions maintained & visitors restricted appropriately', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-i-6', category: 'Infection Control', text: 'Used linen bagged in color-coded hampers and removed from corridors', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'n-fire-safety',
    title: 'Fire Safety, Electrical & Ward Security',
    priorityLevel: 'important',
    items: [
      { id: 'n-fs-1', category: 'Fire & Security', text: 'Emergency fire exits completely clear, illuminated and unobstructed', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-fs-2', category: 'Fire & Security', text: 'Fire extinguishers accessible with inspection seal in place', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-fs-3', category: 'Fire & Security', text: 'No frayed cords, overloaded multi-plugs or electrical trip hazards', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-fs-4', category: 'Fire & Security', text: 'Oxygen cylinder trolleys chained/secured properly against wall', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-fs-5', category: 'Fire & Security', text: 'Ward security check: all external doors secured and visitor log checked', priority: 'high', checked: false, status: 'ok' }
    ]
  },
  {
    id: 'n-morning-handover',
    title: 'Night to Morning Handover Preparation',
    priorityLevel: 'important',
    items: [
      { id: 'n-mh-1', category: 'Morning Handover', text: 'Critical patients highlighted for consultant morning ward round', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-mh-2', category: 'Morning Handover', text: 'Overnight clinical incidents / unexpected events documented', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-mh-3', category: 'Morning Handover', text: 'New overnight admissions detailed with pending consultant reviews', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-mh-4', category: 'Morning Handover', text: 'Fasting (NPO) patients flagged for early morning OT/procedures', priority: 'critical', checked: false, status: 'ok' },
      { id: 'n-mh-5', category: 'Morning Handover', text: 'Fasting blood samples collected or pending for early lab pick-up', priority: 'high', checked: false, status: 'ok' },
      { id: 'n-mh-6', category: 'Morning Handover', text: 'Equipment faults or maintenance complaints listed for biomedical dept', priority: 'high', checked: false, status: 'ok' },
      { id: 'n-mh-7', category: 'Morning Handover', text: 'Audit readiness summary: all 6 red-flag items physically verified', priority: 'critical', checked: false, status: 'ok' }
    ]
  }
];

export const INITIAL_HANDOVER_POINTS: HandoverPoint[] = [
  {
    id: 'ho-1',
    title: 'Critical patients (Vitals, GCS, SpO2, inotropes, unstable)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-2',
    title: 'New admissions (File workup, consultant orders, initial tests)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-3',
    title: 'Pending investigations (Labs, cultures, radiology, ECG)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-4',
    title: 'Pending procedures (NPO, OT, cannulas, dressings, drain care)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-5',
    title: 'Medication issues (Near-expiry, shortages, high-risk LASA)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-6',
    title: 'Incidents / falls (Near-misses, needle-stick, medication error)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-7',
    title: 'Equipment / maintenance (Crash cart seal, suction, BP, defib)',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  },
  {
    id: 'ho-8',
    title: 'Audit deficiencies & pending corrective actions',
    morningToEvening: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    eveningToNight: { checked: false, notes: '', handedBy: '', receivedBy: '' },
    nightToMorning: { checked: false, notes: '', handedBy: '', receivedBy: '' }
  }
];

export const INITIAL_DEFICIENCY_LOG: DeficiencyLogEntry[] = [
  {
    id: 'def-1',
    area: 'Patient Files / HMS',
    status: 'OK',
    deficiency: 'All 5 random files audited; doctor notes signed and timed.',
    actionTaken: 'Verified with Head Nurse',
    responsible: 'Staff Nurse Incharge',
    targetTime: '08:00',
    resolved: true
  },
  {
    id: 'def-2',
    area: 'Medication Storage',
    status: 'OK',
    deficiency: 'Near-expiry stickers checked on top shelf.',
    actionTaken: 'Flagged with red stickers',
    responsible: 'Pharmacy Liaison Nurse',
    targetTime: '09:30',
    resolved: true
  },
  {
    id: 'def-3',
    area: 'Crash Cart',
    status: 'OK',
    deficiency: 'Cart seal intact; Defibrillator self-test PASS.',
    actionTaken: 'Logged in Crash Cart Register',
    responsible: 'Code Blue Team Nurse',
    targetTime: '07:15',
    resolved: true
  },
  {
    id: 'def-4',
    area: 'Infection Control',
    status: 'OK',
    deficiency: 'Yellow and red BMW bin bags verified < 75% full.',
    actionTaken: 'Housekeeping replaced morning bags',
    responsible: 'ICN Coordinator',
    targetTime: '10:00',
    resolved: true
  },
  {
    id: 'def-5',
    area: 'Environment & Fire',
    status: 'OK',
    deficiency: 'Fire exit corridor completely clear of stretchers.',
    actionTaken: 'Moved portable x-ray machine to designated bay',
    responsible: 'Ward Supervisor',
    targetTime: '07:45',
    resolved: true
  },
  {
    id: 'def-6',
    area: 'Equipment',
    status: 'OK',
    deficiency: 'BP apparatus calibrated and cuffs sanitized.',
    actionTaken: 'Spare battery installed in pulse oximeter',
    responsible: 'Ward Equipment Incharge',
    targetTime: '08:30',
    resolved: true
  }
];

export const RED_FLAG_ITEMS = [
  {
    id: 'rf-1',
    title: 'Patient Files + HMS Synchronization',
    description: 'Ensure 100% agreement between physical bedside file and HMS. Randomly audit at least 5 active patient records.',
    standard: 'Zero missing clinical notes; all entries dated, timed and signed.'
  },
  {
    id: 'rf-2',
    title: 'Medication Expiry & High-Alert Storage',
    description: 'Physically inspect trolley and fridge. Check for expired vials, near-expiry labels, and LASA sound-alike separation.',
    standard: 'Zero expired meds; Refrigerator log 2°C – 8°C updated.'
  },
  {
    id: 'rf-3',
    title: 'Crash Cart & Defibrillator Self-Test',
    description: 'Ensure crash cart is accessible, seal is intact, and defibrillator battery self-test indicates ready.',
    standard: 'Seal intact; Emergency drugs within validity; Ambu bags present.'
  },
  {
    id: 'rf-4',
    title: 'Infection Control & Sharps Containers',
    description: 'Verify BMW bin segregation and confirm sharps boxes are below 3/4 fill line with zero recapped exposed needles.',
    standard: 'Zero exposed needles; Hand rubs full at all beds.'
  },
  {
    id: 'rf-5',
    title: 'Fire Safety & Emergency Exits',
    description: 'Check that all emergency exit pathways are clear of equipment and fire extinguishers have current inspection seals.',
    standard: 'Unobstructed corridors; extinguisher inspection status current.'
  },
  {
    id: 'rf-6',
    title: 'Previous Audit Deficiencies Closure',
    description: 'Confirm that non-conformities identified in the previous round have written corrective action evidence.',
    standard: 'Documented root cause, responsible assignee & verified closure.'
  }
];

export const INITIAL_PATIENT_AUDIT: PatientAuditItem[] = [
  {
    bedNo: 'Bed 301',
    patientName: 'Mohammad Ali',
    mrn: 'MRN-84210',
    idBandOk: true,
    allergyDocumented: true,
    fallRiskAssessed: true,
    vitalSignsCurrent: true,
    marComplete: true,
    physicalMatchesHms: true,
    notes: 'Post-op day 1, drain checked, IV site healthy.'
  },
  {
    bedNo: 'Bed 304',
    patientName: 'Ayesha Bibi',
    mrn: 'MRN-84245',
    idBandOk: true,
    allergyDocumented: true,
    fallRiskAssessed: true,
    vitalSignsCurrent: true,
    marComplete: true,
    physicalMatchesHms: true,
    notes: 'Diabetic protocol active, sliding scale signed.'
  },
  {
    bedNo: 'Bed 308',
    patientName: 'Zahid Hussain',
    mrn: 'MRN-84302',
    idBandOk: true,
    allergyDocumented: true,
    fallRiskAssessed: true,
    vitalSignsCurrent: true,
    marComplete: true,
    physicalMatchesHms: true,
    notes: 'High fall risk; yellow band & side rails up.'
  },
  {
    bedNo: 'Bed 312',
    patientName: 'Farhana Tariq',
    mrn: 'MRN-84318',
    idBandOk: true,
    allergyDocumented: true,
    fallRiskAssessed: true,
    vitalSignsCurrent: true,
    marComplete: true,
    physicalMatchesHms: true,
    notes: 'Antibiotic sensitivity reviewed; MAR up to date.'
  },
  {
    bedNo: 'Bed 316',
    patientName: 'Kareem Buksh',
    mrn: 'MRN-84350',
    idBandOk: true,
    allergyDocumented: true,
    fallRiskAssessed: true,
    vitalSignsCurrent: true,
    marComplete: true,
    physicalMatchesHms: true,
    notes: 'Pending discharge summary; all orders signed.'
  }
];

export const MASTER_AUDIT_SECTIONS = [
  {
    id: 's1',
    title: '1. Patient Safety & Identification',
    items: [
      'Patient identification verified using at least 2 identifiers (Name + MRN/DOB)',
      'Identification bands/cards complete, legible and attached to patient',
      'Allergy status clearly documented on chart, ID band and HMS',
      'Fall-risk assessment completed upon admission and shift re-evaluation',
      'Fall precautions implemented (low bed, call bell, side rails, assistance sign)',
      'Pressure-injury risk assessment completed where applicable (Braden scale)',
      'Pressure-injury prevention measures implemented (air mattress, 2h turn schedule)',
      'Pain assessment documented using appropriate validated scale',
      'Patient/family education documented where required in education record'
    ]
  },
  {
    id: 's2',
    title: '2. Patient Files & HMS',
    items: [
      'Admission assessment complete within hospital specified timeframe',
      'History/clinical history thoroughly documented',
      'Clinical examination documented by admitting doctor',
      'Medical/consultant orders available, signed and dated',
      'Nursing initial assessment complete with baseline parameters',
      'Nursing notes updated each shift with clinical observations',
      'Vital signs complete and current on TPR graphic chart',
      'Medication administration record (MAR) complete with no omitted signatures',
      'Intake/output documented and calculated accurately where applicable',
      'Progress notes updated daily by medical team',
      'Investigation reports and lab results available and acknowledged',
      'Consultation/referral notes available where applicable',
      'Procedure documentation & informed consents complete where applicable',
      'Discharge/transfer documentation complete where applicable',
      'All entries appropriately dated, timed (24h) and signed with designation',
      'Physical file and HMS electronic record strictly correspond',
      'No missing clinical notes, history sheets or investigation reports',
      'Randomly audit at least 5 current active patient records'
    ]
  },
  {
    id: 's3',
    title: '3. Medication & Drug Storage',
    items: [
      'No expired medicines in medication cupboards, trollies or trays',
      'Near-expiry medicines identified with warning labels and managed proactively',
      'All medicines properly labelled with open date, concentration and expiry',
      'High-alert medicines appropriately stored, labelled with red alerts and separated',
      'LASA (Look-Alike Sound-Alike) medicines physically separated with tall-man lettering',
      'Emergency medicines available, indexed and within expiry date',
      'Medication trolley and drug cupboards clean, dusted and organized',
      'Medicine refrigerator functioning within 2°C to 8°C',
      'Refrigerator temperature recorded twice daily on temperature log sheet',
      'No unidentified, unlabelled or open multidose vials past shelf-life',
      'Physical stock matches bin card registers and hospital electronic stock',
      'Controlled-drug register updated, counted at shift handover and signed jointly',
      'Medication shortages/discrepancies reported and documented to clinical pharmacy',
      'Antibiotic stock checked and stored according to guidelines'
    ]
  },
  {
    id: 's4',
    title: '4. Crash Cart & Emergency Equipment',
    items: [
      'Crash cart located in an accessible, unobstructed and designated area',
      'Crash-cart break-away seal or checking system intact with logged serial number',
      'Crash-cart daily checklist updated and signed by designated shift nurse',
      'Defibrillator functional and self-test/operational status checked',
      'Appropriate defibrillator pads (Adult & Paediatric) available and in-date',
      'ECG electrodes, paper and monitoring cables available and functional',
      'Ambu bag and correct sized masks (Adult/Paediatric) available and clean',
      'Ward suction functional with test pressure gauge verified',
      'Oxygen equipment and backup cylinder functional with flowmeter and key',
      'Airway equipment (laryngoscopes, blades, stylets, ET tubes) tested and available',
      'Emergency drug tray completely stocked and all vials within expiry date',
      'IV cannulas, syringes, needles, 3-way stopcocks and infusion sets stocked',
      'Paediatric emergency equipment available if required by ward/hospital policy'
    ]
  },
  {
    id: 's5',
    title: '5. Infection Prevention & Control',
    items: [
      'Alcohol-based hand sanitizer available at every bedside and entrance',
      'Handwash sinks stocked with liquid soap and disposable paper towels',
      'Personal Protective Equipment (PPE) readily available and accessible to staff',
      'Staff actively following 5 moments of hand-hygiene practices',
      'Biomedical waste segregation strictly adhered to per color code guidelines',
      'Sharps containers correctly positioned, mounted and puncture-resistant',
      'Sharps containers sealed and disposed before reaching 3/4 fill line',
      'No exposed needles, uncapped sharps or needles left on trays',
      'Isolation precautions implemented where required for infectious patients',
      'Isolation signage displayed outside room with required PPE at door',
      'Clean and dirty utility areas appropriately segregated and maintained',
      'Soiled linen handled and bagged appropriately in designated hampers',
      'High-touch environmental surfaces cleaned and disinfected according to schedule'
    ]
  },
  {
    id: 's6',
    title: '6. Ward Environment & Bedside',
    items: [
      'Ward corridors and common areas clean, quiet and organized',
      'Patient beds and bedside lockers sanitized and clean',
      'Bed castor brakes functional, engaged and inspected',
      'Bed side rails functional, latching securely and used appropriately',
      'Call bell and communication system functional at all beds and bathrooms',
      'Oxygen flowmeters and bedside suction equipment safely positioned',
      'IV lines, drains and urinary catheters secured, unkinked and below level',
      'No unnecessary clutter, surplus trolleys or personal items around beds',
      'Nursing station clean, tidy and documents protected from unauthorized viewing',
      'Ward patient toilets and wash areas clean, dry and with working lighting',
      'Ward lighting adequate for day and night clinical observation',
      'No electrical hazards, frayed cables or unauthorized multi-plug adapters',
      'Emergency fire exits completely unobstructed and illuminated',
      'Fire extinguishers accessible with up-to-date annual inspection tag'
    ]
  },
  {
    id: 's7',
    title: '7. Equipment',
    items: [
      'Blood pressure apparatus calibrated, clean and functional',
      'Pulse oximeters functional with undamaged sensors and charged batteries',
      'Digital clinical thermometers functional with disposable probe covers',
      'Glucometer functional with control check logged and valid test strips',
      'Central and portable suction units functional and tested under load',
      'Ward nebulizer compressor functional with clean tubing and chambers',
      'ECG machine functional with adequate thermal paper rolls and clean leads',
      'Infusion and syringe pumps functional with safety alarms verified',
      'Calibration and preventive maintenance stickers current on all medical devices',
      'Faulty equipment clearly labelled "OUT OF ORDER", reported and removed'
    ]
  },
  {
    id: 's8',
    title: '8. Registers & Records',
    items: [
      'Admission and discharge register updated and reconcilable with HMS',
      'Medication and general consumable stock registers updated',
      'Controlled-drug register updated with joint shift sign-off',
      'Medicine refrigerator temperature log sheet updated twice daily',
      'Crash-cart daily checklist updated and signed',
      'Medical equipment daily verification checklist updated',
      'Housekeeping and deep cleaning checklist updated and verified',
      'Infection-control surveillance and compliance records updated',
      'Clinical incident reports, near-miss forms and sentinel logs available',
      'Fall and pressure-injury assessment and incidence records updated',
      'Patient and family health education records updated',
      'Clinical handover documentation complete for all shifts',
      'Maintenance and biomedical repair complaint log updated'
    ]
  },
  {
    id: 's9',
    title: '9. Staff Knowledge & Preparedness',
    items: [
      'Staff know patient-identification procedure using 2 unique identifiers',
      'Staff know fall-risk assessment and post-fall protocol',
      'Staff know medication-error reporting and open disclosure procedure',
      'Staff know needle-stick injury immediate first aid and PEP reporting process',
      'Staff know emergency codes (Code Blue, Code Red, Code Pink) and activation',
      'Staff know clinical incident and adverse event reporting workflow',
      'Staff know exactly where ward SOP manual and clinical policies are kept',
      'Staff know how to recognize and escalate a deteriorating patient (NEWS/MEWS)',
      'Staff know whom to contact for urgent equipment breakdown and maintenance'
    ]
  },
  {
    id: 's10',
    title: '10. Quality & Previous Audit Follow-up',
    items: [
      'Previous internal and external audit findings reviewed by ward team',
      'Previous non-conformities and deficiencies physically verified on the floor',
      'Pending deficiencies have approved Corrective and Preventive Action (CAPA) plans',
      'Responsible person clearly identified for every pending corrective action',
      'Follow-up target dates documented and monitored',
      'Ward quality indicators (falls, CLABSI, CAUTI, pressure injuries) displayed',
      'Ward SOP and clinical policy folder neatly organized and indexed',
      'Emergency departmental and consultant contact list updated and posted',
      'Staff in-service training and BLS/ACLS certification records available',
      'Documented evidence of implemented corrective actions ready for auditors'
    ]
  }
];

export const STAFF_VIVA_QUESTIONS: StaffQuestion[] = [
  {
    id: 'sq-1',
    question: 'How do you correctly identify a patient before medication or procedure?',
    keyAnswer: 'Use at least 2 unique identifiers: Full Name and MRN (Medical Record Number). Never identify by bed/room number.',
    sopReference: 'SOP-W3B-PID-001 (Patient Identification)'
  },
  {
    id: 'sq-2',
    question: 'What is the immediate action when a patient suffers a needle-stick injury?',
    keyAnswer: 'Wash immediately with soap and running water (do not scrub or squeeze). Report to Incharge, register incident, test source patient, and report to Employee Health/Infection Control within 2 hours for PEP assessment.',
    sopReference: 'SOP-ICN-NSI-004 (Needle-stick & Sharp Injury Protocol)'
  },
  {
    id: 'sq-3',
    question: 'How do you activate Code Blue in Ward 3B?',
    keyAnswer: 'Call out for help, press the ward Code Blue emergency button at the nursing station/bedside, dial the emergency extension (e.g. 5555), state "Code Blue Ward 3B Bed #", and begin CPR with the crash cart immediately.',
    sopReference: 'SOP-EMERG-CB-002 (Hospital Resuscitation Code Blue)'
  },
  {
    id: 'sq-4',
    question: 'What are High-Alert and LASA medications, and how are they handled?',
    keyAnswer: 'High-Alert medications (Insulin, Heparin, Concentrated Electrolytes, Narcotics) have high risk of catastrophic harm. Stored with red highlight, require independent double check before administration. LASA (Look-Alike Sound-Alike) are stored separately with tall-man lettering.',
    sopReference: 'SOP-PHARM-HAM-007 (High Alert & LASA Policy)'
  },
  {
    id: 'sq-5',
    question: 'How do you escalate a deteriorating patient in Ward 3B?',
    keyAnswer: 'Calculate Modified Early Warning Score (MEWS/NEWS). If score triggers amber/red threshold, immediately notify primary Medical Officer/Registrar using SBAR format (Situation, Background, Assessment, Recommendation) and document in progress notes.',
    sopReference: 'SOP-CLIN-MEWS-003 (Deteriorating Patient Escalation)'
  },
  {
    id: 'sq-6',
    question: 'What is the fill limit for biomedical sharps boxes?',
    keyAnswer: 'Sharps containers must be closed and sealed when they reach 3/4 (75%) fill line. Never overfill, never force sharps in, and never recap needles.',
    sopReference: 'SOP-ICN-BMW-005 (Biomedical Waste Management)'
  }
];
