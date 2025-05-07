export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type Business = {
  __typename?: 'Business';
  address: Scalars['String']['output'];
  businessId: Scalars['ID']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  crews: Array<Crew>;
  customers: Array<Customer>;
  equipment: Array<Equipment>;
  invoices: Array<Invoice>;
  jobs: Array<Job>;
  materials: Array<Material>;
  name: Scalars['String']['output'];
  proposals: Array<Proposal>;
  recurringJobs: Array<RecurringJob>;
  services: Array<Service>;
  suppliers: Array<Supplier>;
  updatedAt: Scalars['AWSDateTime']['output'];
  users: Array<User>;
};

export type BusinessListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<BusinessSortInput>;
  where?: InputMaybe<BusinessWhereInput>;
};

export enum BusinessSortField {
  Address = 'ADDRESS',
  BusinessId = 'BUSINESS_ID',
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type BusinessSortInput = {
  direction: SortDirection;
  field: BusinessSortField;
};

export type BusinessWhereInput = {
  address?: InputMaybe<StringFilter>;
  businessId?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type CreateBusinessInput = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  date: Scalars['AWSDate']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['ID']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInventoryTransactionInput = {
  materialId: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  relatedJob?: InputMaybe<Scalars['ID']['input']>;
  supplierId?: InputMaybe<Scalars['ID']['input']>;
  type: InventoryTxnType;
  unitCost: Scalars['Float']['input'];
};

export type CreateInvoiceInput = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
  dueDate: Scalars['AWSDate']['input'];
  issuedAt: Scalars['AWSDateTime']['input'];
  lineItems: Array<LineItemInput>;
  status: InvoiceStatus;
  subTotal: Scalars['Float']['input'];
  tax: Scalars['Float']['input'];
  total: Scalars['Float']['input'];
};

export type CreateJobInput = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
  scheduledEndAt: Scalars['AWSDateTime']['input'];
  scheduledStartAt: Scalars['AWSDateTime']['input'];
  services: Array<ServiceSnapshotInput>;
  status: JobStatus;
  totalEstimatedCost: Scalars['Float']['input'];
};

export type CreateMaintenanceRecordInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  equipmentId: Scalars['ID']['input'];
  nextServiceDue?: InputMaybe<Scalars['AWSDate']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  serviceDate: Scalars['AWSDate']['input'];
  type: Scalars['String']['input'];
};

export type CreateMaterialInput = {
  businessId: Scalars['ID']['input'];
  currentStock: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  reorderThreshold: Scalars['Int']['input'];
  unit: Scalars['String']['input'];
  unitCost: Scalars['Float']['input'];
};

export type CreateNotificationInput = {
  channels?: InputMaybe<Array<NotificationChannel>>;
  level: NotificationLevel;
  message: Scalars['String']['input'];
  relatedEntityId: Scalars['ID']['input'];
  relatedEntityType: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  customerId: Scalars['ID']['input'];
  dispatchChannels?: InputMaybe<Array<NotificationChannel>>;
  externalChargeId?: InputMaybe<Scalars['String']['input']>;
  externalPaymentId?: InputMaybe<Scalars['String']['input']>;
  invoiceId: Scalars['ID']['input'];
  method: Scalars['String']['input'];
  paidAt: Scalars['AWSDateTime']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProposalInput = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
  lineItems: Array<LineItemInput>;
  status: ProposalStatus;
  subTotal: Scalars['Float']['input'];
  tax: Scalars['Float']['input'];
  total: Scalars['Float']['input'];
  validUntil: Scalars['AWSDate']['input'];
};

export type CreateRecurringJobInput = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
  leadTimeDays: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  nextRunAt: Scalars['AWSDateTime']['input'];
  recurrenceRule: Scalars['String']['input'];
  services: Array<ServiceSnapshotInput>;
  status: RecurringJobStatus;
};

export type CreateServiceInput = {
  businessId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  flatFee?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  pricePerHour?: InputMaybe<Scalars['Float']['input']>;
  pricingType: PricingType;
};

export type CreateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  leadTimeDays?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTimeEntryInput = {
  crewId?: InputMaybe<Scalars['ID']['input']>;
  duration: Scalars['Int']['input'];
  endAt: Scalars['AWSDateTime']['input'];
  jobId?: InputMaybe<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['AWSDateTime']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  businessId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

/** A crew or team within a business. */
export type Crew = {
  __typename?: 'Crew';
  createdAt: Scalars['AWSDateTime']['output'];
  crewId: Scalars['ID']['output'];
  members?: Maybe<Array<User>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type CrewListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<CrewSortInput>;
  where?: InputMaybe<CrewWhereInput>;
};

export enum CrewSortField {
  CreatedAt = 'CREATED_AT',
  CrewId = 'CREW_ID',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type CrewSortInput = {
  direction: SortDirection;
  field: CrewSortField;
};

export type CrewWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  crewId?: InputMaybe<IdFilter>;
};

/** Customer account, may join businesses. */
export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
  businesses: Array<Business>;
  createdAt: Scalars['AWSDateTime']['output'];
  customerId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  invoices: Array<Invoice>;
  jobs: Array<Job>;
  name: Scalars['String']['output'];
  payments: Array<Payment>;
  phone?: Maybe<Scalars['String']['output']>;
  proposals: Array<Proposal>;
  recurringJobs: Array<RecurringJob>;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type CustomerListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<CustomerSortInput>;
  where?: InputMaybe<CustomerWhereInput>;
};

/** Link customer to business membership. */
export type CustomerMembership = {
  __typename?: 'CustomerMembership';
  business: Business;
  customer: Customer;
  joinedAt: Scalars['AWSDateTime']['output'];
};

export enum CustomerSortField {
  CreatedAt = 'CREATED_AT',
  CustomerId = 'CUSTOMER_ID',
  Email = 'EMAIL',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type CustomerSortInput = {
  direction: SortDirection;
  field: CustomerSortField;
};

export type CustomerWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  customerId?: InputMaybe<IdFilter>;
};

export type DateFilter = {
  eq?: InputMaybe<Scalars['AWSDate']['input']>;
  gt?: InputMaybe<Scalars['AWSDate']['input']>;
  gte?: InputMaybe<Scalars['AWSDate']['input']>;
  lt?: InputMaybe<Scalars['AWSDate']['input']>;
  lte?: InputMaybe<Scalars['AWSDate']['input']>;
  ne?: InputMaybe<Scalars['AWSDate']['input']>;
};

export type DateTimeFilter = {
  eq?: InputMaybe<Scalars['AWSDateTime']['input']>;
  gt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  gte?: InputMaybe<Scalars['AWSDateTime']['input']>;
  lt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  lte?: InputMaybe<Scalars['AWSDateTime']['input']>;
  ne?: InputMaybe<Scalars['AWSDateTime']['input']>;
};

/** Equipment owned by a business. */
export type Equipment = {
  __typename?: 'Equipment';
  createdAt: Scalars['AWSDateTime']['output'];
  equipmentId: Scalars['ID']['output'];
  lastServiceAt?: Maybe<Scalars['AWSDate']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nextServiceDue?: Maybe<Scalars['AWSDate']['output']>;
  purchaseDate?: Maybe<Scalars['AWSDate']['output']>;
  status: EquipmentStatus;
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

/** Assignment of equipment to a job and crew. */
export type EquipmentAssignment = {
  __typename?: 'EquipmentAssignment';
  crew: Crew;
  equipment: Equipment;
  job: Job;
  scheduledEnd: Scalars['AWSDateTime']['output'];
  scheduledStart: Scalars['AWSDateTime']['output'];
};

export type EquipmentListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<EquipmentSortInput>;
  where?: InputMaybe<EquipmentWhereInput>;
};

export enum EquipmentSortField {
  CreatedAt = 'CREATED_AT',
  EquipmentId = 'EQUIPMENT_ID',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT'
}

export type EquipmentSortInput = {
  direction: SortDirection;
  field: EquipmentSortField;
};

export enum EquipmentStatus {
  Available = 'AVAILABLE',
  InUse = 'IN_USE',
  Maintenance = 'MAINTENANCE'
}

export type EquipmentWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  equipmentId?: InputMaybe<IdFilter>;
  status?: InputMaybe<EquipmentStatus>;
};

/** Expense record for a business. */
export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  currency: Scalars['String']['output'];
  date: Scalars['AWSDate']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expenseId: Scalars['ID']['output'];
  job?: Maybe<Job>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['AWSDateTime']['output'];
  vendor?: Maybe<Supplier>;
};

export type ExpenseListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<ExpenseSortInput>;
  where?: InputMaybe<ExpenseWhereInput>;
};

export enum ExpenseSortField {
  Amount = 'AMOUNT',
  Date = 'DATE',
  ExpenseId = 'EXPENSE_ID'
}

export type ExpenseSortInput = {
  direction: SortDirection;
  field: ExpenseSortField;
};

export type ExpenseWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  category?: InputMaybe<StringFilter>;
  expenseId?: InputMaybe<IdFilter>;
};

export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Inventory transaction for material. */
export type InventoryTransaction = {
  __typename?: 'InventoryTransaction';
  createdAt: Scalars['AWSDateTime']['output'];
  material: Material;
  note?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  relatedJob?: Maybe<Job>;
  supplier?: Maybe<Supplier>;
  txnId: Scalars['ID']['output'];
  type: InventoryTxnType;
  unitCost: Scalars['Float']['output'];
};

export type InventoryTransactionListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<InventoryTransactionSortInput>;
  where?: InputMaybe<InventoryTransactionWhereInput>;
};

export enum InventoryTransactionSortField {
  CreatedAt = 'CREATED_AT',
  MaterialId = 'MATERIAL_ID',
  TxnId = 'TXN_ID'
}

export type InventoryTransactionSortInput = {
  direction: SortDirection;
  field: InventoryTransactionSortField;
};

export type InventoryTransactionWhereInput = {
  materialId?: InputMaybe<IdFilter>;
  txnId?: InputMaybe<IdFilter>;
  type?: InputMaybe<InventoryTxnType>;
};

export enum InventoryTxnType {
  Consumption = 'CONSUMPTION',
  Purchase = 'PURCHASE'
}

/** An invoice issued to a customer. */
export type Invoice = {
  __typename?: 'Invoice';
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  dueDate: Scalars['AWSDate']['output'];
  invoiceId: Scalars['ID']['output'];
  issuedAt: Scalars['AWSDateTime']['output'];
  lineItems: Array<LineItem>;
  paidAt?: Maybe<Scalars['AWSDateTime']['output']>;
  status: InvoiceStatus;
  subTotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type InvoiceListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<InvoiceSortInput>;
  where?: InputMaybe<InvoiceWhereInput>;
};

export enum InvoiceSortField {
  CreatedAt = 'CREATED_AT',
  CustomerId = 'CUSTOMER_ID',
  DueDate = 'DUE_DATE',
  InvoiceId = 'INVOICE_ID',
  IssuedAt = 'ISSUED_AT',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT'
}

export type InvoiceSortInput = {
  direction: SortDirection;
  field: InvoiceSortField;
};

export enum InvoiceStatus {
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Overdue = 'OVERDUE',
  Paid = 'PAID'
}

export type InvoiceWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  customerId?: InputMaybe<IdFilter>;
  invoiceId?: InputMaybe<IdFilter>;
  status?: InputMaybe<InvoiceStatus>;
};

/** A scheduled job for a customer. */
export type Job = {
  __typename?: 'Job';
  actualEndAt?: Maybe<Scalars['AWSDateTime']['output']>;
  actualStartAt?: Maybe<Scalars['AWSDateTime']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  jobId: Scalars['ID']['output'];
  scheduledEndAt: Scalars['AWSDateTime']['output'];
  scheduledStartAt: Scalars['AWSDateTime']['output'];
  services: Array<ServiceSnapshot>;
  status: JobStatus;
  totalActualDuration?: Maybe<Scalars['Int']['output']>;
  totalEstimatedCost: Scalars['Float']['output'];
  totalEstimatedDuration: Scalars['Int']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type JobListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<JobSortInput>;
  where?: InputMaybe<JobWhereInput>;
};

export enum JobSortField {
  CreatedAt = 'CREATED_AT',
  CustomerId = 'CUSTOMER_ID',
  JobId = 'JOB_ID',
  ScheduledEndAt = 'SCHEDULED_END_AT',
  ScheduledStartAt = 'SCHEDULED_START_AT',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT'
}

export type JobSortInput = {
  direction: SortDirection;
  field: JobSortField;
};

export enum JobStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Scheduled = 'SCHEDULED'
}

export type JobWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  customerId?: InputMaybe<IdFilter>;
  jobId?: InputMaybe<IdFilter>;
  status?: InputMaybe<JobStatus>;
};

export type JoinCustomerToBusinessInput = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
};

/** Line item for invoices/proposals. */
export type LineItem = {
  __typename?: 'LineItem';
  description: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type LineItemInput = {
  description: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  unitPrice: Scalars['Float']['input'];
};

/** Record of maintenance or repairs. */
export type MaintenanceRecord = {
  __typename?: 'MaintenanceRecord';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  equipment: Equipment;
  maintenanceId: Scalars['ID']['output'];
  nextServiceDue?: Maybe<Scalars['AWSDate']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  serviceDate: Scalars['AWSDate']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type MaintenanceRecordListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<MaintenanceRecordSortInput>;
  where?: InputMaybe<MaintenanceRecordWhereInput>;
};

export enum MaintenanceRecordSortField {
  EquipmentId = 'EQUIPMENT_ID',
  MaintenanceId = 'MAINTENANCE_ID',
  ServiceDate = 'SERVICE_DATE'
}

export type MaintenanceRecordSortInput = {
  direction: SortDirection;
  field: MaintenanceRecordSortField;
};

export type MaintenanceRecordWhereInput = {
  equipmentId?: InputMaybe<IdFilter>;
  maintenanceId?: InputMaybe<IdFilter>;
};

/** Material definition with stock info. */
export type Material = {
  __typename?: 'Material';
  createdAt: Scalars['AWSDateTime']['output'];
  currentStock: Scalars['Int']['output'];
  materialId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reorderThreshold: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitCost: Scalars['Float']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type MaterialListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<MaterialSortInput>;
  where?: InputMaybe<MaterialWhereInput>;
};

export enum MaterialSortField {
  CreatedAt = 'CREATED_AT',
  CurrentStock = 'CURRENT_STOCK',
  MaterialId = 'MATERIAL_ID',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type MaterialSortInput = {
  direction: SortDirection;
  field: MaterialSortField;
};

export type MaterialWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  materialId?: InputMaybe<IdFilter>;
};

/** Represents membership of a user in a business. */
export type Membership = {
  __typename?: 'Membership';
  business: Business;
  joinedAt: Scalars['AWSDateTime']['output'];
  role: Scalars['String']['output'];
  user: User;
};

/** All create, update, and delete operations. */
export type Mutation = {
  __typename?: 'Mutation';
  createBusiness: Business;
  createCustomer: Customer;
  createExpense: Expense;
  createInventoryTransaction: InventoryTransaction;
  createInvoice: Invoice;
  createJob: Job;
  createMaintenanceRecord: MaintenanceRecord;
  createMaterial: Material;
  createNotification: Notification;
  createPayment: Payment;
  createProposal: Proposal;
  createRecurringJob: RecurringJob;
  createService: Service;
  createSupplier: Supplier;
  createTimeEntry: TimeEntry;
  createUser: User;
  deleteBusiness: Scalars['Boolean']['output'];
  deleteCustomer: Scalars['Boolean']['output'];
  deleteExpense: Scalars['Boolean']['output'];
  deleteInventoryTransaction: Scalars['Boolean']['output'];
  deleteInvoice: Scalars['Boolean']['output'];
  deleteJob: Scalars['Boolean']['output'];
  deleteMaintenanceRecord: Scalars['Boolean']['output'];
  deleteMaterial: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deletePayment: Scalars['Boolean']['output'];
  deleteProposal: Scalars['Boolean']['output'];
  deleteRecurringJob: Scalars['Boolean']['output'];
  deleteService: Scalars['Boolean']['output'];
  deleteSupplier: Scalars['Boolean']['output'];
  deleteTimeEntry: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  joinCustomerToBusiness: CustomerMembership;
  markNotificationRead: Notification;
  updateBusiness: Business;
  updateCustomer: Customer;
  updateExpense: Expense;
  updateInventoryTransaction: InventoryTransaction;
  updateInvoice: Invoice;
  updateJob: Job;
  updateMaintenanceRecord: MaintenanceRecord;
  updateMaterial: Material;
  updatePayment: Payment;
  updateProposal: Proposal;
  updateRecurringJob: RecurringJob;
  updateService: Service;
  updateSupplier: Supplier;
  updateTimeEntry: TimeEntry;
  updateUser: User;
};


/** All create, update, and delete operations. */
export type MutationCreateBusinessArgs = {
  input: CreateBusinessInput;
};


/** All create, update, and delete operations. */
export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


/** All create, update, and delete operations. */
export type MutationCreateExpenseArgs = {
  input: CreateExpenseInput;
};


/** All create, update, and delete operations. */
export type MutationCreateInventoryTransactionArgs = {
  input: CreateInventoryTransactionInput;
};


/** All create, update, and delete operations. */
export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


/** All create, update, and delete operations. */
export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


/** All create, update, and delete operations. */
export type MutationCreateMaintenanceRecordArgs = {
  input: CreateMaintenanceRecordInput;
};


/** All create, update, and delete operations. */
export type MutationCreateMaterialArgs = {
  input: CreateMaterialInput;
};


/** All create, update, and delete operations. */
export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


/** All create, update, and delete operations. */
export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


/** All create, update, and delete operations. */
export type MutationCreateProposalArgs = {
  input: CreateProposalInput;
};


/** All create, update, and delete operations. */
export type MutationCreateRecurringJobArgs = {
  input: CreateRecurringJobInput;
};


/** All create, update, and delete operations. */
export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


/** All create, update, and delete operations. */
export type MutationCreateSupplierArgs = {
  input: CreateSupplierInput;
};


/** All create, update, and delete operations. */
export type MutationCreateTimeEntryArgs = {
  input: CreateTimeEntryInput;
};


/** All create, update, and delete operations. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** All create, update, and delete operations. */
export type MutationDeleteBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteExpenseArgs = {
  expenseId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteInventoryTransactionArgs = {
  txnId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteInvoiceArgs = {
  invoiceId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteJobArgs = {
  jobId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteMaintenanceRecordArgs = {
  maintenanceId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteMaterialArgs = {
  materialId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeletePaymentArgs = {
  paymentId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteProposalArgs = {
  proposalId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteRecurringJobArgs = {
  recurringId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteServiceArgs = {
  serviceId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteSupplierArgs = {
  supplierId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteTimeEntryArgs = {
  timeEntryId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationDeleteUserArgs = {
  userId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationJoinCustomerToBusinessArgs = {
  input: JoinCustomerToBusinessInput;
};


/** All create, update, and delete operations. */
export type MutationMarkNotificationReadArgs = {
  notificationId: Scalars['ID']['input'];
};


/** All create, update, and delete operations. */
export type MutationUpdateBusinessArgs = {
  input: UpdateBusinessInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateExpenseArgs = {
  input: UpdateExpenseInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateInventoryTransactionArgs = {
  input: UpdateInventoryTransactionInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateMaintenanceRecordArgs = {
  input: UpdateMaintenanceRecordInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateMaterialArgs = {
  input: UpdateMaterialInput;
};


/** All create, update, and delete operations. */
export type MutationUpdatePaymentArgs = {
  input: UpdatePaymentInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateProposalArgs = {
  input: UpdateProposalInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateRecurringJobArgs = {
  input: UpdateRecurringJobInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateServiceArgs = {
  input: UpdateServiceInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateSupplierArgs = {
  input: UpdateSupplierInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateTimeEntryArgs = {
  input: UpdateTimeEntryInput;
};


/** All create, update, and delete operations. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** In-app or outbound notification. */
export type Notification = {
  __typename?: 'Notification';
  channels?: Maybe<Array<NotificationChannel>>;
  createdAt: Scalars['AWSDateTime']['output'];
  dispatchedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  level: NotificationLevel;
  message: Scalars['String']['output'];
  notificationId: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['AWSDateTime']['output']>;
  relatedEntityId: Scalars['ID']['output'];
  relatedEntityType: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export enum NotificationChannel {
  Email = 'EMAIL',
  Sms = 'SMS'
}

export enum NotificationLevel {
  Error = 'ERROR',
  Info = 'INFO',
  Warn = 'WARN'
}

export type NotificationListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<NotificationSortInput>;
  where?: InputMaybe<NotificationWhereInput>;
};

export enum NotificationSortField {
  CreatedAt = 'CREATED_AT',
  NotificationId = 'NOTIFICATION_ID',
  Read = 'READ'
}

export type NotificationSortInput = {
  direction: SortDirection;
  field: NotificationSortField;
};

export type NotificationWhereInput = {
  level?: InputMaybe<NotificationLevel>;
  notificationId?: InputMaybe<IdFilter>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<IdFilter>;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

/** A payment made against an invoice. */
export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  customer: Customer;
  dispatchChannels?: Maybe<Array<NotificationChannel>>;
  dispatchedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  externalChargeId?: Maybe<Scalars['String']['output']>;
  externalPaymentId?: Maybe<Scalars['String']['output']>;
  invoice: Invoice;
  method: Scalars['String']['output'];
  paidAt: Scalars['AWSDateTime']['output'];
  paymentId: Scalars['ID']['output'];
  provider?: Maybe<Scalars['String']['output']>;
};

export type PaymentListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<PaymentSortInput>;
  where?: InputMaybe<PaymentWhereInput>;
};

export enum PaymentSortField {
  CreatedAt = 'CREATED_AT',
  CustomerId = 'CUSTOMER_ID',
  PaidAt = 'PAID_AT',
  PaymentId = 'PAYMENT_ID',
  UpdatedAt = 'UPDATED_AT'
}

export type PaymentSortInput = {
  direction: SortDirection;
  field: PaymentSortField;
};

export type PaymentWhereInput = {
  customerId?: InputMaybe<IdFilter>;
  invoiceId?: InputMaybe<IdFilter>;
  paymentId?: InputMaybe<IdFilter>;
};

export enum PricingType {
  /** Flat fee pricing */
  Flat = 'FLAT',
  /** Hourly pricing */
  Hourly = 'HOURLY'
}

/** A sales proposal or estimate sent to a customer. */
export type Proposal = {
  __typename?: 'Proposal';
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  lineItems: Array<LineItem>;
  proposalId: Scalars['ID']['output'];
  status: ProposalStatus;
  subTotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  validUntil: Scalars['AWSDate']['output'];
};

export type ProposalListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<ProposalSortInput>;
  where?: InputMaybe<ProposalWhereInput>;
};

export enum ProposalSortField {
  CreatedAt = 'CREATED_AT',
  CustomerId = 'CUSTOMER_ID',
  ProposalId = 'PROPOSAL_ID',
  Status = 'STATUS',
  ValidUntil = 'VALID_UNTIL'
}

export type ProposalSortInput = {
  direction: SortDirection;
  field: ProposalSortField;
};

export enum ProposalStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Draft = 'DRAFT',
  Sent = 'SENT'
}

export type ProposalWhereInput = {
  customerId?: InputMaybe<IdFilter>;
  proposalId?: InputMaybe<IdFilter>;
  status?: InputMaybe<ProposalStatus>;
};

/** All read operations. */
export type Query = {
  __typename?: 'Query';
  business?: Maybe<Business>;
  businesses: Array<Business>;
  crews: Array<Crew>;
  customer?: Maybe<Customer>;
  customers: Array<Customer>;
  equipment: Array<Equipment>;
  expenses: Array<Expense>;
  inventoryTransactions: Array<InventoryTransaction>;
  invoice?: Maybe<Invoice>;
  invoices: Array<Invoice>;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  maintenanceRecords: Array<MaintenanceRecord>;
  material?: Maybe<Material>;
  materials: Array<Material>;
  notifications: Array<Notification>;
  payments: Array<Payment>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  recurringJob?: Maybe<RecurringJob>;
  recurringJobs: Array<RecurringJob>;
  service?: Maybe<Service>;
  services: Array<Service>;
  suppliers: Array<Supplier>;
  timeEntries: Array<TimeEntry>;
  user?: Maybe<User>;
  users: Array<User>;
};


/** All read operations. */
export type QueryBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryBusinessesArgs = {
  input?: InputMaybe<BusinessListInput>;
};


/** All read operations. */
export type QueryCrewsArgs = {
  input?: InputMaybe<CrewListInput>;
};


/** All read operations. */
export type QueryCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryCustomersArgs = {
  input?: InputMaybe<CustomerListInput>;
};


/** All read operations. */
export type QueryEquipmentArgs = {
  input?: InputMaybe<EquipmentListInput>;
};


/** All read operations. */
export type QueryExpensesArgs = {
  input?: InputMaybe<ExpenseListInput>;
};


/** All read operations. */
export type QueryInventoryTransactionsArgs = {
  input?: InputMaybe<InventoryTransactionListInput>;
};


/** All read operations. */
export type QueryInvoiceArgs = {
  businessId: Scalars['ID']['input'];
  invoiceId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryInvoicesArgs = {
  input?: InputMaybe<InvoiceListInput>;
};


/** All read operations. */
export type QueryJobArgs = {
  businessId: Scalars['ID']['input'];
  jobId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryJobsArgs = {
  input?: InputMaybe<JobListInput>;
};


/** All read operations. */
export type QueryMaintenanceRecordsArgs = {
  input?: InputMaybe<MaintenanceRecordListInput>;
};


/** All read operations. */
export type QueryMaterialArgs = {
  materialId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryMaterialsArgs = {
  input?: InputMaybe<MaterialListInput>;
};


/** All read operations. */
export type QueryNotificationsArgs = {
  input?: InputMaybe<NotificationListInput>;
};


/** All read operations. */
export type QueryPaymentsArgs = {
  input?: InputMaybe<PaymentListInput>;
};


/** All read operations. */
export type QueryProposalArgs = {
  businessId: Scalars['ID']['input'];
  proposalId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryProposalsArgs = {
  input?: InputMaybe<ProposalListInput>;
};


/** All read operations. */
export type QueryRecurringJobArgs = {
  businessId: Scalars['ID']['input'];
  recurringId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryRecurringJobsArgs = {
  input?: InputMaybe<RecurringJobListInput>;
};


/** All read operations. */
export type QueryServiceArgs = {
  businessId: Scalars['ID']['input'];
  serviceId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryServicesArgs = {
  input?: InputMaybe<ServiceListInput>;
};


/** All read operations. */
export type QuerySuppliersArgs = {
  input?: InputMaybe<SupplierListInput>;
};


/** All read operations. */
export type QueryTimeEntriesArgs = {
  input?: InputMaybe<TimeEntryListInput>;
};


/** All read operations. */
export type QueryUserArgs = {
  userId: Scalars['ID']['input'];
};


/** All read operations. */
export type QueryUsersArgs = {
  input?: InputMaybe<UserListInput>;
};

/** Template for recurring jobs. */
export type RecurringJob = {
  __typename?: 'RecurringJob';
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  leadTimeDays: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nextRunAt: Scalars['AWSDateTime']['output'];
  recurrenceRule: Scalars['String']['output'];
  recurringId: Scalars['ID']['output'];
  services: Array<ServiceSnapshot>;
  status: RecurringJobStatus;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type RecurringJobListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<RecurringJobSortInput>;
  where?: InputMaybe<RecurringJobWhereInput>;
};

export enum RecurringJobSortField {
  CreatedAt = 'CREATED_AT',
  CustomerId = 'CUSTOMER_ID',
  NextRunAt = 'NEXT_RUN_AT',
  RecurringId = 'RECURRING_ID',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT'
}

export type RecurringJobSortInput = {
  direction: SortDirection;
  field: RecurringJobSortField;
};

export enum RecurringJobStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Paused = 'PAUSED'
}

export type RecurringJobWhereInput = {
  customerId?: InputMaybe<IdFilter>;
  recurringId?: InputMaybe<IdFilter>;
  status?: InputMaybe<RecurringJobStatus>;
};

/** A service offered by a business. */
export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['AWSDateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  flatFee?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  pricePerHour?: Maybe<Scalars['Float']['output']>;
  pricingType: PricingType;
  serviceId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type ServiceListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<ServiceSortInput>;
  where?: InputMaybe<ServiceWhereInput>;
};

/** Snapshot of a service at booking time. */
export type ServiceSnapshot = {
  __typename?: 'ServiceSnapshot';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  actualEndAt?: Maybe<Scalars['AWSDateTime']['output']>;
  actualStartAt?: Maybe<Scalars['AWSDateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  flatFee?: Maybe<Scalars['Float']['output']>;
  pricePerHour?: Maybe<Scalars['Float']['output']>;
  pricingType: PricingType;
  serviceId: Scalars['ID']['output'];
  serviceName: Scalars['String']['output'];
};

export type ServiceSnapshotInput = {
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  flatFee?: InputMaybe<Scalars['Float']['input']>;
  pricePerHour?: InputMaybe<Scalars['Float']['input']>;
  serviceId: Scalars['ID']['input'];
};

export enum ServiceSortField {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  ServiceId = 'SERVICE_ID',
  UpdatedAt = 'UPDATED_AT'
}

export type ServiceSortInput = {
  direction: SortDirection;
  field: ServiceSortField;
};

export type ServiceWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  serviceId?: InputMaybe<IdFilter>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Real-time subscription for app events. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Invoice paid within a business */
  invoicePaid: Invoice;
  /** Job updated within a business */
  jobUpdated: Job;
  /** New notification for a user */
  notificationCreated: Notification;
};


/** Real-time subscription for app events. */
export type SubscriptionInvoicePaidArgs = {
  businessId: Scalars['ID']['input'];
};


/** Real-time subscription for app events. */
export type SubscriptionJobUpdatedArgs = {
  businessId: Scalars['ID']['input'];
};


/** Real-time subscription for app events. */
export type SubscriptionNotificationCreatedArgs = {
  userId: Scalars['ID']['input'];
};

/** Supplier or vendor profile. */
export type Supplier = {
  __typename?: 'Supplier';
  address?: Maybe<Scalars['String']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  leadTimeDays?: Maybe<Scalars['Int']['output']>;
  materials?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  paymentTerms?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  supplierId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type SupplierListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<SupplierSortInput>;
  where?: InputMaybe<SupplierWhereInput>;
};

export enum SupplierSortField {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  SupplierId = 'SUPPLIER_ID',
  UpdatedAt = 'UPDATED_AT'
}

export type SupplierSortInput = {
  direction: SortDirection;
  field: SupplierSortField;
};

export type SupplierWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  supplierId?: InputMaybe<IdFilter>;
};

/** A time entry logged by a user or crew. */
export type TimeEntry = {
  __typename?: 'TimeEntry';
  createdAt: Scalars['AWSDateTime']['output'];
  crew?: Maybe<Crew>;
  duration: Scalars['Int']['output'];
  endAt: Scalars['AWSDateTime']['output'];
  job?: Maybe<Job>;
  notes?: Maybe<Scalars['String']['output']>;
  startAt: Scalars['AWSDateTime']['output'];
  timeEntryId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  user: User;
};

export type TimeEntryListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<TimeEntrySortInput>;
  where?: InputMaybe<TimeEntryWhereInput>;
};

export enum TimeEntrySortField {
  CreatedAt = 'CREATED_AT',
  JobId = 'JOB_ID',
  StartAt = 'START_AT',
  TimeEntryId = 'TIME_ENTRY_ID',
  UserId = 'USER_ID'
}

export type TimeEntrySortInput = {
  direction: SortDirection;
  field: TimeEntrySortField;
};

export type TimeEntryWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  crewId?: InputMaybe<IdFilter>;
  jobId?: InputMaybe<IdFilter>;
  timeEntryId?: InputMaybe<IdFilter>;
  userId?: InputMaybe<IdFilter>;
};

export type UpdateBusinessInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  customerId: Scalars['ID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expenseId: Scalars['ID']['input'];
};

export type UpdateInventoryTransactionInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  txnId: Scalars['ID']['input'];
};

export type UpdateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['AWSDate']['input']>;
  invoiceId: Scalars['ID']['input'];
  lineItems?: InputMaybe<Array<LineItemInput>>;
  paidAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
};

export type UpdateJobInput = {
  jobId: Scalars['ID']['input'];
  scheduledEndAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  scheduledStartAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  services?: InputMaybe<Array<ServiceSnapshotInput>>;
  status?: InputMaybe<JobStatus>;
  totalEstimatedCost?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMaintenanceRecordInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  maintenanceId: Scalars['ID']['input'];
  nextServiceDue?: InputMaybe<Scalars['AWSDate']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMaterialInput = {
  currentStock?: InputMaybe<Scalars['Int']['input']>;
  materialId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  reorderThreshold?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unitCost?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  paymentId: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProposalInput = {
  proposalId: Scalars['ID']['input'];
  status?: InputMaybe<ProposalStatus>;
  validUntil?: InputMaybe<Scalars['AWSDate']['input']>;
};

export type UpdateRecurringJobInput = {
  nextRunAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  recurringId: Scalars['ID']['input'];
  status?: InputMaybe<RecurringJobStatus>;
};

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  flatFee?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pricePerHour?: InputMaybe<Scalars['Float']['input']>;
  pricingType?: InputMaybe<PricingType>;
  serviceId: Scalars['ID']['input'];
};

export type UpdateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  leadTimeDays?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  supplierId: Scalars['ID']['input'];
};

export type UpdateTimeEntryInput = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  endAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  timeEntryId: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  businesses: Array<Business>;
  createdAt: Scalars['AWSDateTime']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  timeEntries: Array<TimeEntry>;
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type UserListInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<UserSortInput>;
  where?: InputMaybe<UserWhereInput>;
};

export enum UserSortField {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Name = 'NAME',
  Role = 'ROLE',
  UpdatedAt = 'UPDATED_AT',
  UserId = 'USER_ID'
}

export type UserSortInput = {
  direction: SortDirection;
  field: UserSortField;
};

export type UserWhereInput = {
  businessId?: InputMaybe<IdFilter>;
  role?: InputMaybe<StringFilter>;
  userId?: InputMaybe<IdFilter>;
};
