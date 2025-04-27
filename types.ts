/**
 * TypeScript definitions for SproutOps single-table entities.
 */

/**
 * Status of a Job item.
 */
export type JobStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";

/**
 * Status of an Invoice item.
 */
export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "OVERDUE";

/**
 * Status of a Proposal item.
 */
export type ProposalStatus = "DRAFT" | "SENT" | "ACCEPTED" | "DECLINED";

/**
 * Status of a Recurring Job template.
 */
export type RecurringJobStatus = "ACTIVE" | "PAUSED" | "CANCELLED";

/**
 * Status of Equipment.
 */
export type EquipmentStatus = "AVAILABLE" | "IN_USE" | "MAINTENANCE";

/**
 * Type of an inventory transaction.
 */
export type InventoryTxnType = "PURCHASE" | "CONSUMPTION";

/**
 * User profile item representing an application user.
 */
export interface UserProfile {
  /** Partition key: "USER#<userId>" */
  PK: string;
  /** Sort key: always "PROFILE" */
  SK: "PROFILE";
  /** Discriminator for item type */
  entityType: "USER";
  /** Unique user identifier */
  userId: string;
  /** Full name of the user */
  name: string;
  /** Email address of the user */
  email: string;
  /** Role of the user (e.g. ADMIN, EMPLOYEE) */
  role: string;
  /** ISO timestamp when created */
  createdAt: string;
  /** ISO timestamp when last updated */
  updatedAt: string;
}

/**
 * Business profile item representing a tenant (landscaping company).
 */
export interface BusinessProfile {
  PK: string; // "BUS#<businessId>"
  SK: "PROFILE";
  entityType: "BUSINESS";
  businessId: string;
  name: string; // Company name
  address: string; // Street address
  createdAt: string;
  updatedAt: string;
}

/**
 * Links a user to a business with a specific role.
 */
export interface Membership {
  PK: string; // "USER#<userId>"
  SK: string; // "BUS#<businessId>"
  entityType: "MEMBERSHIP";
  /** Role of the user within the business (e.g. OWNER) */
  role: string;
  /** ISO timestamp when joined */
  joinedAt: string;
  /** GSI1 partition key for reverse lookup (business -> user) */
  GSI1PK: string;
  /** GSI1 sort key for reverse lookup */
  GSI1SK: string;
}

/**
 * Customer profile item scoped globally (for portals).
 */
export interface CustomerProfile {
  PK: string; // "CUST#<customerId>"
  SK: "PROFILE";
  entityType: "CUSTOMER";
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Links a customer to a business for portal access.
 */
export interface CustomerMembership {
  PK: string; // "CUST#<customerId>"
  SK: string; // "BUS#<businessId>"
  entityType: "CUSTOMER_MEMBERSHIP";
  /** ISO timestamp when joined */
  joinedAt: string;
  GSI1PK: string; // "BUS#<businessId>"
  GSI1SK: string; // "CUST#<customerId>"
}

/**
 * A service offered by a business, with pricing models.
 */
export interface Service {
  PK: string; // "BUS#<businessId>"
  SK: string; // "SERV#<serviceId>"
  entityType: "SERVICE";
  serviceId: string;
  name: string;
  description: string;
  /** "HOURLY" or "FLAT" */
  pricingType: "HOURLY" | "FLAT";
  /** Rate per hour (if pricingType=HOURLY) */
  pricePerHour?: number;
  /** Flat fee (if pricingType=FLAT) */
  flatFee?: number;
  /** Estimated duration in minutes */
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
}

/** Snapshot of a service at booking time. */
export interface ServiceSnapshot {
  serviceId: string;
  serviceName: string;
  pricingType: "HOURLY" | "FLAT";
  pricePerHour?: number;
  flatFee?: number;
  estimatedDuration: number;
  actualStartAt?: string;
  actualEndAt?: string;
  actualDuration?: number;
}

/**
 * A job booked by a customer, may contain multiple services.
 */
export interface Job {
  PK: string; // "BUS#<businessId>"
  SK: string; // "JOB#<jobId>"
  entityType: "JOB";
  jobId: string;
  customerId: string;
  /** Array of service snapshots */
  services: ServiceSnapshot[];
  totalEstimatedDuration: number;
  scheduledStartAt: string; // ISO timestamp
  scheduledEndAt: string; // ISO timestamp
  totalEstimatedCost: number;
  actualStartAt?: string;
  actualEndAt?: string;
  totalActualDuration?: number;
  /** Job status */
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  /** GSI2: customer->jobs lookup */
  GSI2PK: string; // "CUST#<customerId>"
  GSI2SK: string; // ISO timestamp (#JOB#<jobId>)
}

/**
 * A team or crew within a business.
 */
export interface Crew {
  PK: string; // "BUS#<businessId>"
  SK: string; // "CREW#<crewId>"
  entityType: "CREW";
  crewId: string;
  name: string;
  /** Optional list of user PKs */
  members?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Equipment profile item.
 */
export interface Equipment {
  PK: string; // "BUS#<businessId>"
  SK: string; // "EQUIP#<equipmentId>"
  entityType: "EQUIPMENT";
  equipmentId: string;
  name: string;
  type: string; // e.g. "MOWER", "TRACTOR"
  /** Equipment status */
  status: EquipmentStatus;
  purchaseDate: string; // ISO date
  lastServiceAt: string;
  nextServiceDue: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Associates equipment with a scheduled job and crew.
 */
export interface EquipmentAssignment {
  PK: string; // "EQUIP#<equipmentId>"
  SK: string; // "JOB#<startAt>#<jobId>"
  entityType: "EQUIPMENT_ASSIGNMENT";
  equipmentId: string;
  jobId: string;
  crewId: string;
  scheduledStart: string;
  scheduledEnd: string;
  /** GSI3: business->equipment assignments */
  GSI3PK: string;
  GSI3SK: string;
  /** GSI4: crew->equipment assignments */
  GSI4PK: string;
  GSI4SK: string;
}

/**
 * Line item on invoices or proposals.
 */
export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  jobRef?: string;
}

/**
 * An invoice issued to a customer.
 */
export interface Invoice {
  PK: string; // "BUS#<businessId>"
  SK: string; // "INV#<invoiceId>"
  entityType: "INVOICE";
  invoiceId: string;
  customerId: string;
  /** Invoice status */
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string; // ISO date
  paidAt?: string;
  lineItems: LineItem[];
  subTotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  /** GSI5: customer->invoices lookup */
  GSI5PK: string;
  GSI5SK: string;
}

/**
 * A payment for an invoice.
 */
export interface Payment {
  PK: string; // "BUS#<businessId>"
  SK: string; // "PAY#<paidAt>#<paymentId>"
  entityType: "PAYMENT";
  paymentId: string;
  invoiceId: string;
  customerId: string;
  amount: number;
  method: string; // e.g. "CREDIT_CARD", "ACH", "CASH"
  provider?: string;
  externalPaymentId?: string;
  externalChargeId?: string;
  checkoutSessionId?: string;
  stripeStatus?: string;
  receiptUrl?: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  GSI2PK: string; // CUST#
  GSI2SK: string;
  GSI5PK: string; // INV#
  GSI5SK: string;
}

/**
 * A sales proposal or estimate sent to a customer.
 */
export interface Proposal {
  PK: string; // "BUS#<businessId>"
  SK: string; // "PROP#<proposalId>"
  entityType: "PROPOSAL";
  proposalId: string;
  customerId: string;
  /** Proposal status */
  status: ProposalStatus;
  createdAt: string;
  validUntil: string; // ISO date
  updatedAt: string;
  lineItems: LineItem[];
  subTotal: number;
  tax: number;
  total: number;
  GSI5PK: string;
  GSI5SK: string;
}

/**
 * A recurring job template.
 */
export interface RecurringJob {
  PK: string;
  SK: string; // "RECUR#<recurringId>"
  entityType: "RECURRING_JOB";
  recurringId: string;
  name: string;
  customerId: string;
  services: ServiceSnapshot[];
  recurrenceRule: string; // iCal RRULE
  leadTimeDays: number;
  nextRunAt: string;
  /** Recurring job status */
  status: RecurringJobStatus;
  createdAt: string;
  updatedAt: string;
  GSI6PK: string;
  GSI6SK: string;
}

/**
 * A time entry logged by a user, crew, or job.
 */
export interface TimeEntry {
  PK: string; // "BUS#<businessId>"
  SK: string; // "TIME#<ownerType>#<ownerId>#<startAt>#<timeEntryId>"
  entityType: "TIME_ENTRY";
  timeEntryId: string;
  userId: string;
  crewId?: string;
  jobId?: string;
  startAt: string;
  endAt: string;
  duration: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * A material definition with stock information.
 */
export interface Material {
  PK: string;
  SK: string; // "MATERIAL#<materialId>"
  entityType: "MATERIAL";
  materialId: string;
  name: string;
  unit: string;
  unitCost: number;
  currentStock: number;
  reorderThreshold: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * An inventory transaction (purchase or consumption).
 */
export interface InventoryTransaction {
  PK: string; // "MATERIAL#<materialId>"
  SK: string; // "INVENTORY#<timestamp>#<txnId>"
  entityType: "INVENTORY_TXN";
  txnId: string;
  /** Transaction type */
  type: InventoryTxnType;
  quantity: number;
  relatedJob?: string;
  unitCost: number;
  supplierId?: string;
  note?: string;
  createdAt: string;
}

/**
 * A maintenance record for equipment.
 */
export interface MaintenanceRecord {
  PK: string; // "EQUIP#<equipmentId>"
  SK: string; // "MAINT#<serviceDate>#<maintenanceId>"
  entityType: "MAINTENANCE_RECORD";
  maintenanceId: string;
  serviceDate: string;
  type: string; // "ROUTINE" | "REPAIR"
  provider: string;
  notes?: string;
  cost?: number;
  nextServiceDue?: string;
  createdAt: string;
  updatedAt: string;
  GSI6PK: string; // "BUS#<businessId>"
  GSI6SK: string;
}
