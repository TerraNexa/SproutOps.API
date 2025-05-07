export type JobStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "OVERDUE";
export type ProposalStatus = "DRAFT" | "SENT" | "ACCEPTED" | "DECLINED";
export type RecurringJobStatus = "ACTIVE" | "PAUSED" | "CANCELLED";
export type EquipmentStatus = "AVAILABLE" | "IN_USE" | "MAINTENANCE";
export type InventoryTxnType = "PURCHASE" | "CONSUMPTION";

/**
 * Common base fields shared by all table items in the SproutOps schema.
 */
export interface BaseItem {
  /** Partition key */
  PK: string;
  /** Sort key */
  SK: string;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last update */
  updatedAt?: string;
  /** Entity discriminator */
  entityType: string;
}

// ========== USER ==========
/**
 * Represents a Cognito-authenticated user profile.
 */
export interface UserItem extends BaseItem {
  entityType: "USER";
  PK: `USER#${string}`;
  SK: "PROFILE";
  GSI1PK: `USER_EMAIL#${string}`;
  GSI1SK: "PROFILE";
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Maps a user to a business with a defined role.
 */
export interface MembershipItem extends BaseItem {
  entityType: "MEMBERSHIP";
  PK: `USER#${string}`;
  SK: `BUS#${string}`;
  role: "OWNER" | "MANAGER" | "EMPLOYEE";
  joinedAt: string;
  GSI1PK: `BUS#${string}`;
  GSI1SK: `USER#${string}`;
}

export interface CrewItem {
  PK: `BUS#${string}`;
  SK: `CREW#${string}`;
  entityType: "CREW";
  crewId: string;
  name: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

// ========== BUSINESS ==========
/**
 * Represents a business tenant within SproutOps.
 */
export interface BusinessItem extends BaseItem {
  entityType: "BUSINESS";
  PK: `BUS#${string}`;
  SK: "PROFILE";
  businessId: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// ========== CUSTOMER ==========
/**
 * Represents a customer served by a business.
 */
export interface CustomerItem extends BaseItem {
  entityType: "CUSTOMER";
  PK: `CUST#${string}`;
  SK: "PROFILE";
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Links a customer to a specific business.
 */
export interface CustomerMembershipItem extends BaseItem {
  entityType: "CUSTOMER_MEMBERSHIP";
  PK: `CUST#${string}`;
  SK: `BUS#${string}`;
  joinedAt: string;
  GSI1PK: `BUS#${string}`;
  GSI1SK: `CUST#${string}`;
}

// ========== SERVICE ==========
/**
 * A service offering defined by a business.
 */
export interface ServiceItem extends BaseItem {
  entityType: "SERVICE";
  PK: `BUS#${string}`;
  SK: `SERV#${string}`;
  serviceId: string;
  name: string;
  description: string;
  pricingType: "HOURLY" | "FLAT";
  pricePerHour?: number;
  flatFee?: number;
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Embedded snapshot of a service as part of a booking or proposal.
 */
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

// ========== JOB ==========
/**
 * Represents a job scheduled for a customer.
 */
export interface JobItem extends BaseItem {
  entityType: "JOB";
  PK: `BUS#${string}`;
  SK: `JOB#${string}`;
  jobId: string;
  customerId: string;
  services: ServiceSnapshot[];
  totalEstimatedDuration: number;
  scheduledStartAt: string;
  scheduledEndAt: string;
  totalEstimatedCost: number;
  actualStartAt?: string;
  actualEndAt?: string;
  totalActualDuration?: number;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  GSI2PK: `CUST#${string}`;
  GSI2SK: string;
}

/**
 * Represents a crew assignment for a job
 */
export interface JobCrewAssignmentItem {
  PK: `JOB#${string}`;
  SK: `CREW#${string}`;
  entityType: "JOB_CREW_ASSIGNMENT";
  jobId: string;
  crewId: string;
  assignedAt: string; // ISO timestamp
  GSI1PK: `CREW#${string}`;
  GSI1SK: `JOB#${string}`;
}

// ========== INVOICE ==========
/**
 * A line item associated with an invoice or proposal.
 */
export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  jobRef?: string;
}

/**
 * Represents a financial invoice issued to a customer.
 */
export interface InvoiceItem extends BaseItem {
  entityType: "INVOICE";
  PK: `BUS#${string}`;
  SK: `INV#${string}`;
  invoiceId: string;
  customerId: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
  lineItems: LineItem[];
  subTotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  GSI5PK: string;
  GSI5SK: string;
}

// ========== PAYMENT ==========
/**
 * Payment recorded against an invoice.
 */
export interface PaymentItem extends BaseItem {
  entityType: "PAYMENT";
  PK: `BUS#${string}`;
  SK: `PAY#${string}`;
  paymentId: string;
  invoiceId: string;
  customerId: string;
  amount: number;
  method: string;
  provider?: string;
  externalPaymentId?: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  GSI2PK: string;
  GSI2SK: string;
  GSI5PK: string;
  GSI5SK: string;
}

// ========== PROPOSAL ==========
/**
 * A sales estimate or quote sent to a customer.
 */
export interface ProposalItem extends BaseItem {
  entityType: "PROPOSAL";
  PK: `BUS#${string}`;
  SK: `PROP#${string}`;
  proposalId: string;
  customerId: string;
  status: ProposalStatus;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  lineItems: LineItem[];
  subTotal: number;
  tax: number;
  total: number;
  GSI5PK: string;
  GSI5SK: string;
}

// ========== RECURRING JOB ==========
/**
 * A recurring job template for automatic job creation.
 */
export interface RecurringJobItem extends BaseItem {
  entityType: "RECURRING_JOB";
  PK: `BUS#${string}`;
  SK: `RECUR#${string}`;
  recurringId: string;
  name: string;
  customerId: string;
  services: ServiceSnapshot[];
  recurrenceRule: string;
  leadTimeDays: number;
  nextRunAt: string;
  status: RecurringJobStatus;
  createdAt: string;
  updatedAt: string;
  GSI6PK: string;
  GSI6SK: string;
}

// ========== EQUIPMENT ==========
/**
 * Equipment owned and tracked by a business.
 */
export interface EquipmentItem extends BaseItem {
  entityType: "EQUIPMENT";
  PK: `BUS#${string}`;
  SK: `EQUIP#${string}`;
  equipmentId: string;
  name: string;
  type: string;
  status: EquipmentStatus;
  purchaseDate: string;
  lastServiceAt: string;
  nextServiceDue: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Assignment record linking equipment to jobs and crews.
 */
export interface EquipmentAssignmentItem extends BaseItem {
  entityType: "EQUIPMENT_ASSIGNMENT";
  PK: `EQUIP#${string}`;
  SK: `JOB#${string}`;
  equipmentId: string;
  jobId: string;
  crewId: string;
  scheduledStart: string;
  scheduledEnd: string;
  GSI3PK: string;
  GSI3SK: string;
  GSI4PK: string;
  GSI4SK: string;
}

/**
 * Maintenance record for a piece of equipment.
 */
export interface MaintenanceRecordItem extends BaseItem {
  entityType: "MAINTENANCE_RECORD";
  PK: `EQUIP#${string}`;
  SK: `MAINT#${string}`;
  maintenanceId: string;
  serviceDate: string;
  type: "ROUTINE" | "REPAIR";
  provider: string;
  notes?: string;
  cost?: number;
  nextServiceDue?: string;
  createdAt: string;
  updatedAt: string;
  GSI6PK: string;
  GSI6SK: string;
}

// ========== TIME TRACKING ==========
/**
 * A timesheet entry for labor tracking.
 */
export interface TimeEntryItem extends BaseItem {
  entityType: "TIME_ENTRY";
  PK: `BUS#${string}`;
  SK: `TIME#${string}`;
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

// ========== MATERIALS ==========
/**
 * Inventory item for business materials.
 */
export interface MaterialItem extends BaseItem {
  entityType: "MATERIAL";
  PK: `BUS#${string}`;
  SK: `MATERIAL#${string}`;
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
 * Transaction log for inventory updates.
 */
export interface InventoryTxnItem extends BaseItem {
  entityType: "INVENTORY_TXN";
  PK: `MATERIAL#${string}`;
  SK: `INVENTORY#${string}`;
  txnId: string;
  type: InventoryTxnType;
  quantity: number;
  relatedJob?: string;
  unitCost: number;
  supplierId?: string;
  note?: string;
  createdAt: string;
}
