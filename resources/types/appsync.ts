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
  expenses: Array<Expense>;
  invoices: Array<Invoice>;
  jobs: Array<Job>;
  materials: Array<Material>;
  name: Scalars['String']['output'];
  proposals: Array<Proposal>;
  recurringJobs: Array<RecurringJob>;
  services: Array<Service>;
  updatedAt: Scalars['AWSDateTime']['output'];
  users: Array<BusinessUser>;
};

export type BusinessCustomerFilterInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<CustomerSortInput>;
  where?: InputMaybe<CustomerWhereInput>;
};

export type BusinessFilterInput = {
  customers?: InputMaybe<BusinessCustomerFilterInput>;
  equipment?: InputMaybe<EquipmentFilterInput>;
  invoices?: InputMaybe<InvoiceFilterInput>;
  jobs?: InputMaybe<JobFilterInput>;
  materials?: InputMaybe<MaterialFilterInput>;
  payments?: InputMaybe<PaymentFilterInput>;
  proposals?: InputMaybe<ProposalFilterInput>;
  recurringJobs?: InputMaybe<RecurringJobFilterInput>;
  services?: InputMaybe<ServiceFilterInput>;
};

export type BusinessMemborship = {
  __typename?: 'BusinessMemborship';
  businessId: Scalars['ID']['output'];
  customerId: Scalars['ID']['output'];
  joinedAt: Scalars['AWSDateTime']['output'];
};

export type BusinessUser = {
  __typename?: 'BusinessUser';
  email: Scalars['String']['output'];
  joinedAt: Scalars['AWSDateTime']['output'];
  name: Scalars['String']['output'];
  role: BusinessUserRole;
  userId: Scalars['ID']['output'];
};

export enum BusinessUserRole {
  Employee = 'EMPLOYEE',
  Manager = 'MANAGER',
  Owner = 'OWNER'
}

export type CreateBusinessInput = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
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
  crewId?: InputMaybe<Scalars['ID']['input']>;
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
  type: NotificationType;
  userId: Scalars['ID']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
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
  pricingType: Scalars['String']['input'];
};

export type CreateTimeEntryInput = {
  businessId: Scalars['ID']['input'];
  crewId?: InputMaybe<Scalars['ID']['input']>;
  duration: Scalars['Int']['input'];
  endAt: Scalars['AWSDateTime']['input'];
  jobId?: InputMaybe<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['AWSDateTime']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Crew = {
  __typename?: 'Crew';
  createdAt: Scalars['AWSDateTime']['output'];
  crewId: Scalars['ID']['output'];
  jobs: Array<Job>;
  members?: Maybe<Array<Scalars['ID']['output']>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
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

export type CustomerFilterInput = {
  invoices?: InputMaybe<InvoiceFilterInput>;
  jobs?: InputMaybe<JobFilterInput>;
  payments?: InputMaybe<PaymentFilterInput>;
  proposals?: InputMaybe<ProposalFilterInput>;
  recurringJobs?: InputMaybe<RecurringJobFilterInput>;
};

export type CustomerMembership = {
  __typename?: 'CustomerMembership';
  businessId: Scalars['ID']['output'];
  customerId: Scalars['ID']['output'];
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
  address?: InputMaybe<StringFilter>;
  customerId?: InputMaybe<IdFilter>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
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

export type Equipment = {
  __typename?: 'Equipment';
  createdAt: Scalars['AWSDateTime']['output'];
  equipmentId: Scalars['ID']['output'];
  lastServiceAt: Scalars['AWSDate']['output'];
  maintenanceRecords: Array<MaintenanceRecord>;
  name: Scalars['String']['output'];
  nextServiceDue: Scalars['AWSDate']['output'];
  purchaseDate: Scalars['AWSDate']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type EquipmentAssignment = {
  __typename?: 'EquipmentAssignment';
  crewId: Scalars['ID']['output'];
  equipmentId: Scalars['ID']['output'];
  jobId: Scalars['ID']['output'];
  scheduledEnd: Scalars['AWSDateTime']['output'];
  scheduledStart: Scalars['AWSDateTime']['output'];
};

export type EquipmentFilterInput = {
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
  equipmentId?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  currency: Scalars['String']['output'];
  date: Scalars['AWSDate']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expenseId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
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

export type InventoryTransaction = {
  __typename?: 'InventoryTransaction';
  createdAt: Scalars['AWSDateTime']['output'];
  materialId: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  relatedJob?: Maybe<Scalars['ID']['output']>;
  supplierId?: Maybe<Scalars['ID']['output']>;
  txnId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
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
  createdAt?: InputMaybe<DateTimeFilter>;
  materialId?: InputMaybe<IdFilter>;
  txnId?: InputMaybe<IdFilter>;
  type?: InputMaybe<StringFilter>;
};

export enum InventoryTxnType {
  Consumption = 'CONSUMPTION',
  Purchase = 'PURCHASE'
}

export type Invoice = {
  __typename?: 'Invoice';
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  dueDate: Scalars['AWSDate']['output'];
  invoiceId: Scalars['ID']['output'];
  issuedAt: Scalars['AWSDateTime']['output'];
  lineItems: Array<LineItem>;
  paidAt?: Maybe<Scalars['AWSDateTime']['output']>;
  status: Scalars['String']['output'];
  subTotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type InvoiceFilterInput = {
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
  customerId?: InputMaybe<IdFilter>;
  dueDate?: InputMaybe<DateFilter>;
  invoiceId?: InputMaybe<IdFilter>;
  issuedAt?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
};

export type Job = {
  __typename?: 'Job';
  actualEndAt?: Maybe<Scalars['AWSDateTime']['output']>;
  actualStartAt?: Maybe<Scalars['AWSDateTime']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  crew: Crew;
  customer: Customer;
  jobId: Scalars['ID']['output'];
  scheduledEndAt: Scalars['AWSDateTime']['output'];
  scheduledStartAt: Scalars['AWSDateTime']['output'];
  services: Array<ServiceSnapshot>;
  status: Scalars['String']['output'];
  totalActualDuration?: Maybe<Scalars['Int']['output']>;
  totalEstimatedCost: Scalars['Float']['output'];
  totalEstimatedDuration: Scalars['Int']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type JobFilterInput = {
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
  customerId?: InputMaybe<IdFilter>;
  jobId?: InputMaybe<IdFilter>;
  scheduledEndAt?: InputMaybe<DateTimeFilter>;
  scheduledStartAt?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringFilter>;
};

export type JoinCustomerToBusinessInput = {
  businessId: Scalars['ID']['input'];
  customerId: Scalars['ID']['input'];
};

export type JoinUserToBusinessInput = {
  businessId: Scalars['ID']['input'];
  role: BusinessUserRole;
  userId: Scalars['ID']['input'];
};

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

export type MaintenanceRecord = {
  __typename?: 'MaintenanceRecord';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  equipmentId: Scalars['ID']['output'];
  maintenanceId: Scalars['ID']['output'];
  nextServiceDue?: Maybe<Scalars['AWSDate']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  serviceDate: Scalars['AWSDate']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type MaintenanceRecordFilterInput = {
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
  serviceDate?: InputMaybe<DateFilter>;
};

export type Material = {
  __typename?: 'Material';
  createdAt: Scalars['AWSDateTime']['output'];
  currentStock: Scalars['Int']['output'];
  inventoryTransactions: Array<InventoryTransaction>;
  materialId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reorderThreshold: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitCost: Scalars['Float']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type MaterialFilterInput = {
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
  materialId?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBusiness: Business;
  createCustomer: Customer;
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
  createTimeEntry: TimeEntry;
  createUser: User;
  deleteBusiness: Scalars['Boolean']['output'];
  deleteCustomer: Scalars['Boolean']['output'];
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
  deleteTimeEntry: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  joinCustomerToBusiness: CustomerMembership;
  joinUserToBusiness: Scalars['Boolean']['output'];
  markNotificationRead: Notification;
  updateBusiness: Business;
  updateCustomer: Customer;
  updateInventoryTransaction: InventoryTransaction;
  updateInvoice: Invoice;
  updateJob: Job;
  updateMaintenanceRecord: MaintenanceRecord;
  updateMaterial: Material;
  updatePayment: Payment;
  updateProposal: Proposal;
  updateRecurringJob: RecurringJob;
  updateService: Service;
  updateTimeEntry: TimeEntry;
  updateUser: User;
};


export type MutationCreateBusinessArgs = {
  input: CreateBusinessInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateInventoryTransactionArgs = {
  input: CreateInventoryTransactionInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationCreateMaintenanceRecordArgs = {
  input: CreateMaintenanceRecordInput;
};


export type MutationCreateMaterialArgs = {
  input: CreateMaterialInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateProposalArgs = {
  input: CreateProposalInput;
};


export type MutationCreateRecurringJobArgs = {
  input: CreateRecurringJobInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateTimeEntryArgs = {
  input: CreateTimeEntryInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


export type MutationDeleteCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


export type MutationDeleteInventoryTransactionArgs = {
  txnId: Scalars['ID']['input'];
};


export type MutationDeleteInvoiceArgs = {
  invoiceId: Scalars['ID']['input'];
};


export type MutationDeleteJobArgs = {
  jobId: Scalars['ID']['input'];
};


export type MutationDeleteMaintenanceRecordArgs = {
  maintenanceId: Scalars['ID']['input'];
};


export type MutationDeleteMaterialArgs = {
  materialId: Scalars['ID']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['ID']['input'];
};


export type MutationDeletePaymentArgs = {
  paymentId: Scalars['ID']['input'];
};


export type MutationDeleteProposalArgs = {
  proposalId: Scalars['ID']['input'];
};


export type MutationDeleteRecurringJobArgs = {
  recurringId: Scalars['ID']['input'];
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['ID']['input'];
};


export type MutationDeleteTimeEntryArgs = {
  timeEntryId: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationJoinCustomerToBusinessArgs = {
  input: JoinCustomerToBusinessInput;
};


export type MutationJoinUserToBusinessArgs = {
  input: JoinUserToBusinessInput;
};


export type MutationMarkNotificationReadArgs = {
  notificationId: Scalars['ID']['input'];
};


export type MutationUpdateBusinessArgs = {
  input: UpdateBusinessInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateInventoryTransactionArgs = {
  input: UpdateInventoryTransactionInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
};


export type MutationUpdateMaintenanceRecordArgs = {
  input: UpdateMaintenanceRecordInput;
};


export type MutationUpdateMaterialArgs = {
  input: UpdateMaterialInput;
};


export type MutationUpdatePaymentArgs = {
  input: UpdatePaymentInput;
};


export type MutationUpdateProposalArgs = {
  input: UpdateProposalInput;
};


export type MutationUpdateRecurringJobArgs = {
  input: UpdateRecurringJobInput;
};


export type MutationUpdateServiceArgs = {
  input: UpdateServiceInput;
};


export type MutationUpdateTimeEntryArgs = {
  input: UpdateTimeEntryInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  channels?: Maybe<Array<NotificationChannel>>;
  createdAt: Scalars['AWSDateTime']['output'];
  level: NotificationLevel;
  message: Scalars['String']['output'];
  notificationId: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  relatedEntityId: Scalars['ID']['output'];
  relatedEntityType: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export enum NotificationChannel {
  Email = 'EMAIL',
  Sms = 'SMS'
}

export type NotificationFilterInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<NotificationSortInput>;
  where?: InputMaybe<NotificationWhereInput>;
};

export enum NotificationLevel {
  Error = 'ERROR',
  Info = 'INFO',
  Warn = 'WARN'
}

export enum NotificationSortField {
  CreatedAt = 'CREATED_AT',
  Level = 'LEVEL',
  NotificationId = 'NOTIFICATION_ID',
  Read = 'READ',
  Type = 'TYPE'
}

export type NotificationSortInput = {
  direction: SortDirection;
  field: NotificationSortField;
};

export enum NotificationType {
  Alert = 'ALERT',
  Reminder = 'REMINDER',
  System = 'SYSTEM'
}

export type NotificationWhereInput = {
  createdAt?: InputMaybe<DateTimeFilter>;
  level?: InputMaybe<NotificationLevel>;
  notificationId?: InputMaybe<IdFilter>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<NotificationType>;
  userId?: InputMaybe<IdFilter>;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  externalPaymentId?: Maybe<Scalars['String']['output']>;
  invoice: Invoice;
  method: Scalars['String']['output'];
  paidAt: Scalars['AWSDateTime']['output'];
  paymentId: Scalars['ID']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type PaymentFilterInput = {
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
  paidAt?: InputMaybe<DateTimeFilter>;
  paymentId?: InputMaybe<IdFilter>;
};

export enum PricingType {
  Flat = 'FLAT',
  Hourly = 'HOURLY'
}

export type Proposal = {
  __typename?: 'Proposal';
  createdAt: Scalars['AWSDateTime']['output'];
  customer: Customer;
  lineItems: Array<LineItem>;
  proposalId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  subTotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  validUntil: Scalars['AWSDate']['output'];
};

export type ProposalFilterInput = {
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
  status?: InputMaybe<StringFilter>;
  validUntil?: InputMaybe<DateFilter>;
};

export type Query = {
  __typename?: 'Query';
  business?: Maybe<Business>;
  customer?: Maybe<Customer>;
  equipment?: Maybe<Equipment>;
  invoice?: Maybe<Invoice>;
  job?: Maybe<Job>;
  material?: Maybe<Material>;
  payment?: Maybe<Payment>;
  proposal?: Maybe<Proposal>;
  recurringJob?: Maybe<RecurringJob>;
  service?: Maybe<Service>;
  user?: Maybe<User>;
};


export type QueryBusinessArgs = {
  businessId: Scalars['ID']['input'];
  filter?: InputMaybe<BusinessFilterInput>;
};


export type QueryCustomerArgs = {
  customerId: Scalars['ID']['input'];
  filter?: InputMaybe<CustomerFilterInput>;
};


export type QueryEquipmentArgs = {
  businessId: Scalars['ID']['input'];
  equipmentId: Scalars['ID']['input'];
};


export type QueryInvoiceArgs = {
  businessId: Scalars['ID']['input'];
  invoiceId: Scalars['ID']['input'];
};


export type QueryJobArgs = {
  businessId: Scalars['ID']['input'];
  jobId: Scalars['ID']['input'];
};


export type QueryMaterialArgs = {
  businessId: Scalars['ID']['input'];
  materialId: Scalars['ID']['input'];
};


export type QueryPaymentArgs = {
  businessId: Scalars['ID']['input'];
  paymentId: Scalars['ID']['input'];
};


export type QueryProposalArgs = {
  businessId: Scalars['ID']['input'];
  proposalId: Scalars['ID']['input'];
};


export type QueryRecurringJobArgs = {
  businessId: Scalars['ID']['input'];
  recurringId: Scalars['ID']['input'];
};


export type QueryServiceArgs = {
  businessId: Scalars['ID']['input'];
  serviceId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  filter?: InputMaybe<UserFilterInput>;
  userId: Scalars['ID']['input'];
};

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
  status: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type RecurringJobFilterInput = {
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
  status?: InputMaybe<StringFilter>;
};

export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['AWSDateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  estimatedDuration: Scalars['Int']['output'];
  flatFee?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  pricePerHour?: Maybe<Scalars['Float']['output']>;
  pricingType: Scalars['String']['output'];
  serviceId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type ServiceFilterInput = {
  pagination?: InputMaybe<PaginationInput>;
  sortBy?: InputMaybe<ServiceSortInput>;
  where?: InputMaybe<ServiceWhereInput>;
};

export type ServiceSnapshot = {
  __typename?: 'ServiceSnapshot';
  estimatedDuration: Scalars['Int']['output'];
  flatFee?: Maybe<Scalars['Float']['output']>;
  pricePerHour?: Maybe<Scalars['Float']['output']>;
  pricingType: Scalars['String']['output'];
  serviceId: Scalars['ID']['output'];
  serviceName: Scalars['String']['output'];
};

export type ServiceSnapshotInput = {
  estimatedDuration: Scalars['Int']['input'];
  flatFee?: InputMaybe<Scalars['Float']['input']>;
  pricePerHour?: InputMaybe<Scalars['Float']['input']>;
  pricingType: Scalars['String']['input'];
  serviceId: Scalars['ID']['input'];
  serviceName: Scalars['String']['input'];
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
  name?: InputMaybe<StringFilter>;
  pricingType?: InputMaybe<StringFilter>;
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

export type TimeEntryFilterInput = {
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
  crewId?: InputMaybe<IdFilter>;
  endAt?: InputMaybe<DateTimeFilter>;
  jobId?: InputMaybe<IdFilter>;
  startAt?: InputMaybe<DateTimeFilter>;
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
  crewId?: InputMaybe<Scalars['ID']['input']>;
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
  method?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  paymentId: Scalars['ID']['input'];
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
  pricingType?: InputMaybe<Scalars['String']['input']>;
  serviceId: Scalars['ID']['input'];
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
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  businesses: Array<UserBusiness>;
  createdAt: Scalars['AWSDateTime']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notifications: Array<Notification>;
  timeEntries: Array<TimeEntry>;
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type UserBusiness = {
  __typename?: 'UserBusiness';
  address: Scalars['String']['output'];
  businessId: Scalars['ID']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  joinedAt: Scalars['AWSDateTime']['output'];
  name: Scalars['String']['output'];
  role: BusinessUserRole;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type UserFilterInput = {
  notifications?: InputMaybe<NotificationFilterInput>;
  timeEntries?: InputMaybe<TimeEntryFilterInput>;
};
