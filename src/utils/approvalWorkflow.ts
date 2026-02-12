import { Room } from '../components/MobileApp';

export type ApproverRole = 
  | 'CTHM Program Chair' 
  | 'SECA Program Chair' 
  | 'ITSO' 
  | 'FMO (Facility Admin)'
  | 'Librarian'
  | 'Department Endorser'
  | 'Super Admin';

/**
 * Determines the approval workflow based on room type
 * 
 * Workflow Rules:
 * - Kitchen/Restaurant/Suites → CTHM Program Chair → FMO
 * - Engineering Lab/Science Lab → SECA Program Chair → FMO
 * - Comlab → SECA Program Chair → ITSO → FMO
 * - Study Rooms → Librarian ONLY
 * - Regular rooms (classroom, gym, hall, lab) → FMO only
 */
export function getApprovalWorkflow(roomType: Room['type'], hasEquipment: boolean): {
  approvers: ApproverRole[];
  description: string;
} {
  switch (roomType) {
    case 'kitchen':
    case 'restaurant':
    case 'suite':
      return {
        approvers: ['CTHM Program Chair', 'FMO (Facility Admin)'],
        description: 'CTHM Program Chair → Facility Admin (FMO)'
      };
    
    case 'engineering-lab':
    case 'science-lab':
      return {
        approvers: ['SECA Program Chair', 'FMO (Facility Admin)'],
        description: 'SECA Program Chair → Facility Admin (FMO)'
      };
    
    case 'comlab':
      return {
        approvers: ['SECA Program Chair', 'ITSO', 'FMO (Facility Admin)'],
        description: 'SECA Program Chair → ITSO → Facility Admin (FMO)'
      };
    
    case 'study-room':
      return {
        approvers: ['Librarian'],
        description: 'Librarian approval only'
      };
    
    // Regular rooms
    case 'classroom':
    case 'gym':
    case 'hall':
    case 'lab':
    case 'library':
    default:
      return {
        approvers: ['FMO (Facility Admin)'],
        description: 'Facility Admin (FMO) approval'
      };
  }
}

/**
 * External renter approval workflow
 * 
 * Workflow Rules:
 * - Affiliates: Department Endorsement → FMO (NO PAYMENT REQUIRED)
 * - Guests: Super Admin Review → FMO → Payment Required
 */
export function getExternalRenterWorkflow(renterType: 'affiliate' | 'guest'): {
  approvers: ApproverRole[];
  description: string;
  requiresPayment: boolean;
} {
  if (renterType === 'affiliate') {
    return {
      approvers: ['Department Endorser', 'FMO (Facility Admin)'],
      description: 'Department Endorsement → Facility Admin (FMO)',
      requiresPayment: false, // Affiliates don't pay
    };
  } else {
    // Guest
    return {
      approvers: ['Super Admin', 'FMO (Facility Admin)'],
      description: 'Letter of Intent Review (Super Admin) → Facility Admin (FMO) → Payment',
      requiresPayment: true, // Guests must pay
    };
  }
}