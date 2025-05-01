import { v4 as uuidv4 } from "uuid";

/**
 * Generate a set of mock DynamoDB items covering all SproutOps entities.
 */
export function generateMockData(): Record<string, any>[] {
  const items: Record<string, any>[] = [];
  const now = new Date();
  const isoNow = now.toISOString();
  const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Utility to pick a random date between two dates
  function randomDate(start: Date, end: Date): string {
    const diff = end.getTime() - start.getTime();
    const offset = Math.floor(Math.random() * diff);
    return new Date(start.getTime() + offset).toISOString();
  }

  // Pools of realistic names
  const firstNames = [
    "Alice",
    "Bob",
    "Carol",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Wilson",
    "Taylor",
    "Clark",
  ];
  function randomName(): string {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${fn} ${ln}`;
  }

  // Counts per entity
  const numBusinesses = 2;
  const numUsersPerBiz = 2;
  const numCustomersPerBiz = 3;
  const numServicesPerBiz = 2;
  const numCrewsPerBiz = 2;
  const numEquipmentPerBiz = 2;
  const numJobsPerBiz = 3;
  const numInvoicesPerBiz = 2;
  const numPaymentsPerInvoice = 1;
  const numProposalsPerBiz = 2;
  const numRecurringPerBiz = 1;
  const numTimeEntriesPerBiz = 2;
  const numMaterialsPerBiz = 2;
  const numInventoryTxPerMaterial = 1;
  const numMaintenancePerEquipment = 1;
  const numSuppliersPerBiz = 2;
  const numNotificationsPerUser = 2;
  const numExpensesPerBiz = 2;

  for (let b = 0; b < numBusinesses; b++) {
    const businessId = uuidv4();
    const createdAt = isoNow;

    // Business profile
    items.push({
      PK: `BUS#${businessId}`,
      SK: "PROFILE",
      entityType: "BUSINESS",
      businessId,
      name: `Business ${b + 1}`,
      address: `${100 + b} Elm Street`,
      createdAt,
      updatedAt: createdAt,
    });

    // Users
    const userIds: string[] = [];
    for (let u = 0; u < numUsersPerBiz; u++) {
      const userId = uuidv4();
      userIds.push(userId);
      const name = randomName();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `USER#${userId}`,
        entityType: "USER",
        userId,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        role: ["ADMIN", "EMPLOYEE"][Math.floor(Math.random() * 2)],
        createdAt,
        updatedAt: createdAt,
      });
    }

    // Customers
    const customerIds: string[] = [];
    for (let c = 0; c < numCustomersPerBiz; c++) {
      const customerId = uuidv4();
      customerIds.push(customerId);
      const name = randomName();
      items.push({
        PK: `CUST#${customerId}`,
        SK: "PROFILE",
        entityType: "CUSTOMER",
        customerId,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: `555-${100 + Math.floor(Math.random() * 900)}`,
        address: `${200 + b + c} Oak Avenue`,
        createdAt,
        updatedAt: createdAt,
      });

      // Customer membership
      items.push({
        PK: `CUST#${customerId}`,
        SK: `BUS#${businessId}`,
        entityType: "CUSTOMER_MEMBERSHIP",
        joinedAt: createdAt,
        GSI1PK: `BUS#${businessId}`,
        GSI1SK: `CUST#${customerId}`,
      });
    }

    // Services
    for (let s = 0; s < numServicesPerBiz; s++) {
      const serviceId = uuidv4();
      const pricingType = ["HOURLY", "FLAT"][Math.floor(Math.random() * 2)];
      items.push({
        PK: `BUS#${businessId}`,
        SK: `SERV#${serviceId}`,
        entityType: "SERVICE",
        serviceId,
        name: `Service ${b + 1}-${s + 1}`,
        description: "Standard service",
        pricingType,
        pricePerHour:
          pricingType === "HOURLY"
            ? Math.floor(50 + Math.random() * 50)
            : undefined,
        flatFee:
          pricingType === "FLAT"
            ? Math.floor(200 + Math.random() * 300)
            : undefined,
        estimatedDuration: Math.floor(30 + Math.random() * 90),
        createdAt,
        updatedAt: createdAt,
      });
    }

    // Crews
    const crewIds: string[] = [];
    for (let cr = 0; cr < numCrewsPerBiz; cr++) {
      const crewId = uuidv4();
      crewIds.push(crewId);
      items.push({
        PK: `BUS#${businessId}`,
        SK: `CREW#${crewId}`,
        entityType: "CREW",
        crewId,
        name: `Crew ${b + 1}-${cr + 1}`,
        members: [userIds[Math.floor(Math.random() * userIds.length)]],
        createdAt,
        updatedAt: createdAt,
      });
    }

    // Equipment + Maintenance + Assignment
    for (let eq = 0; eq < numEquipmentPerBiz; eq++) {
      const equipmentId = uuidv4();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `EQUIP#${equipmentId}`,
        entityType: "EQUIPMENT",
        equipmentId,
        name: `Equipment ${b + 1}-${eq + 1}`,
        type: "TOOL",
        status: ["AVAILABLE", "IN_USE"][Math.floor(Math.random() * 2)],
        purchaseDate: now.toISOString().slice(0, 10),
        lastServiceAt: now.toISOString().slice(0, 10),
        nextServiceDue: now.toISOString().slice(0, 10),
        createdAt,
        updatedAt: createdAt,
      });
      // Maintenance record
      for (let m = 0; m < numMaintenancePerEquipment; m++) {
        const maintenanceId = uuidv4();
        items.push({
          PK: `EQUIP#${equipmentId}`,
          SK: `MAINT#${now.toISOString().slice(0, 10)}#${maintenanceId}`,
          entityType: "MAINTENANCE_RECORD",
          maintenanceId,
          serviceDate: now.toISOString().slice(0, 10),
          type: "ROUTINE",
          provider: "ACME Services",
          notes: "All good",
          cost: 100,
          nextServiceDue: now.toISOString().slice(0, 10),
          createdAt,
          updatedAt: createdAt,
          GSI6PK: `BUS#${businessId}`,
          GSI6SK: maintenanceId,
        });
      }
      // Equipment assignment placeholder
      items.push({
        PK: `BUS#${businessId}`,
        SK: `EQUIP#${equipmentId}#ASSIGN`,
        entityType: "EQUIPMENT_ASSIGNMENT",
        equipmentId,
        jobId: "",
        crewId: crewIds[0] || "",
        scheduledStart: isoNow,
        scheduledEnd: isoNow,
        GSI3PK: `BUS#${businessId}`,
        GSI3SK: equipmentId,
      });
    }

    // Jobs
    for (let jn = 0; jn < numJobsPerBiz; jn++) {
      const jobId = uuidv4();
      const customerId =
        customerIds[Math.floor(Math.random() * customerIds.length)];
      const startAt = randomDate(past30, now);
      const endAt = new Date(
        new Date(startAt).getTime() + 2 * 3600 * 1000
      ).toISOString();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `JOB#${jobId}`,
        entityType: "JOB",
        jobId,
        customerId,
        services: [],
        totalEstimatedDuration: 120,
        scheduledStartAt: startAt,
        scheduledEndAt: endAt,
        totalEstimatedCost: Math.floor(100 + Math.random() * 400),
        status: ["SCHEDULED", "COMPLETED"][Math.floor(Math.random() * 2)],
        createdAt,
        updatedAt: createdAt,
        GSI2PK: `CUST#${customerId}`,
        GSI2SK: startAt,
      });
    }

    // Invoices & Payments
    for (let inv = 0; inv < numInvoicesPerBiz; inv++) {
      const invoiceId = uuidv4();
      const customerId =
        customerIds[Math.floor(Math.random() * customerIds.length)];
      const issuedAt = isoNow;
      const dueDate = new Date(now.getTime() + 30 * 86400 * 1000)
        .toISOString()
        .slice(0, 10);
      items.push({
        PK: `BUS#${businessId}`,
        SK: `INV#${invoiceId}`,
        entityType: "INVOICE",
        invoiceId,
        customerId,
        status: "ISSUED",
        issuedAt,
        dueDate,
        lineItems: [
          {
            description: "Service charge",
            quantity: 1,
            unitPrice: 100,
            totalPrice: 100,
          },
        ],
        subTotal: 100,
        tax: 10,
        total: 110,
        createdAt,
        updatedAt: createdAt,
        GSI5PK: `CUST#${customerId}`,
        GSI5SK: issuedAt,
      });
      for (let p = 0; p < numPaymentsPerInvoice; p++) {
        const paymentId = uuidv4();
        const paidAt = isoNow;
        items.push({
          PK: `BUS#${businessId}`,
          SK: `PAY#${paidAt}#${paymentId}`,
          entityType: "PAYMENT",
          paymentId,
          invoiceId,
          customerId,
          amount: 110,
          method: "CREDIT_CARD",
          paidAt,
          createdAt,
          updatedAt: createdAt,
          GSI2PK: `CUST#${customerId}`,
          GSI2SK: paidAt,
          GSI5PK: `INV#${invoiceId}`,
          GSI5SK: paidAt,
        });
      }
    }

    // Proposals
    for (let pr = 0; pr < numProposalsPerBiz; pr++) {
      const proposalId = uuidv4();
      const customerId =
        customerIds[Math.floor(Math.random() * customerIds.length)];
      const validUntil = new Date(now.getTime() + 15 * 86400 * 1000)
        .toISOString()
        .slice(0, 10);
      items.push({
        PK: `BUS#${businessId}`,
        SK: `PROP#${proposalId}`,
        entityType: "PROPOSAL",
        proposalId,
        customerId,
        status: "SENT",
        createdAt,
        validUntil,
        updatedAt: createdAt,
        lineItems: [
          {
            description: "Proposal service",
            quantity: 1,
            unitPrice: 150,
            totalPrice: 150,
          },
        ],
        subTotal: 150,
        tax: 15,
        total: 165,
        GSI5PK: `CUST#${customerId}`,
        GSI5SK: createdAt,
      });
    }

    // Recurring Jobs
    for (let r = 0; r < numRecurringPerBiz; r++) {
      const recurringId = uuidv4();
      const customerId =
        customerIds[Math.floor(Math.random() * customerIds.length)];
      const nextRunAt = isoNow;
      items.push({
        PK: `BUS#${businessId}`,
        SK: `RECUR#${recurringId}`,
        entityType: "RECURRING_JOB",
        recurringId,
        name: "Monthly Maintenance",
        customerId,
        services: [],
        recurrenceRule: "FREQ=MONTHLY",
        leadTimeDays: 7,
        nextRunAt,
        status: "ACTIVE",
        createdAt,
        updatedAt: createdAt,
        GSI6PK: `CUST#${customerId}`,
        GSI6SK: nextRunAt,
      });
    }

    // Time Entries
    for (let te = 0; te < numTimeEntriesPerBiz; te++) {
      const timeEntryId = uuidv4();
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const startAt = isoNow;
      const endAt = new Date(
        new Date(startAt).getTime() + 3600 * 1000
      ).toISOString();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `TIME#${userId}#${startAt}#${timeEntryId}`,
        entityType: "TIME_ENTRY",
        timeEntryId,
        userId,
        startAt,
        endAt,
        duration: 60,
        notes: "",
        createdAt,
        updatedAt: createdAt,
      });
    }

    // Materials & Inventory Transactions
    for (let m = 0; m < numMaterialsPerBiz; m++) {
      const materialId = uuidv4();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `MATERIAL#${materialId}`,
        entityType: "MATERIAL",
        materialId,
        name: "Mulch",
        unit: "BAG",
        unitCost: 5,
        currentStock: 20,
        reorderThreshold: 5,
        createdAt,
        updatedAt: createdAt,
      });
      for (let tx = 0; tx < numInventoryTxPerMaterial; tx++) {
        const txnId = uuidv4();
        const createdAtTxn = randomDate(past30, now);
        items.push({
          PK: `MATERIAL#${materialId}`,
          SK: `INVENTORY#${createdAtTxn}#${txnId}`,
          entityType: "INVENTORY_TXN",
          txnId,
          type: "PURCHASE",
          quantity: 10,
          unitCost: 5,
          createdAt: createdAtTxn,
        });
      }
    }

    // Suppliers
    for (let sp = 0; sp < numSuppliersPerBiz; sp++) {
      const supplierId = uuidv4();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `SUP#${supplierId}`,
        entityType: "SUPPLIER",
        supplierId,
        name: `Supplier ${sp + 1}`,
        contactName: randomName(),
        email: "supplier@example.com",
        phone: "555-0200",
        address: "500 Pine Road",
        paymentTerms: "Net30",
        leadTimeDays: 7,
        materials: [],
        createdAt,
        updatedAt: createdAt,
      });
    }

    // Notifications
    userIds.forEach((userId) => {
      for (let n = 0; n < numNotificationsPerUser; n++) {
        const notificationId = uuidv4();
        const createdAtNotif = isoNow;
        items.push({
          PK: `BUS#${businessId}`,
          SK: `NOTIF#${notificationId}#${createdAtNotif}`,
          entityType: "NOTIFICATION",
          notificationId,
          type: "ALERT",
          level: "INFO",
          message: "Test notification",
          relatedEntityType: "JOB",
          relatedEntityId: "",
          channels: ["EMAIL"],
          read: false,
          createdAt: createdAtNotif,
          updatedAt: createdAtNotif,
        });
      }
    });

    // Expenses
    for (let e = 0; e < numExpensesPerBiz; e++) {
      const expenseId = uuidv4();
      items.push({
        PK: `BUS#${businessId}`,
        SK: `EXP#${expenseId}`,
        entityType: "EXPENSE",
        expenseId,
        date: now.toISOString().slice(0, 10),
        amount: Math.floor(50 + Math.random() * 250),
        currency: "USD",
        category: "Fuel",
        description: "Gas expense",
        createdAt,
        updatedAt: createdAt,
      });
    }
  } // end businesses loop

  return items;
}
