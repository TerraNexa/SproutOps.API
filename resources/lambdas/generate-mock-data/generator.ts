import { v4 as uuidv4 } from "uuid";

/**
 * Generate a set of mock DynamoDB items covering all SproutOps entities.
 */
export function generateMockData(): Record<string, any>[] {
  const items: Record<string, any>[] = [];
  const now = new Date();
  const isoNow = now.toISOString();
  const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  function randomDate(start: Date, end: Date): string {
    const diff = end.getTime() - start.getTime();
    const offset = Math.floor(Math.random() * diff);
    return new Date(start.getTime() + offset).toISOString();
  }

  // Configuration: counts per entity
  const numBusiness = 2;
  const numUsers = 2;
  const numCustomers = 3;
  const numServices = 2;
  const numCrews = 2;
  const numEquipment = 2;
  const numJobs = 3;
  const numInvoices = 2;
  const numPayments = 1;
  const numProposals = 2;
  const numRecurring = 1;
  const numTimeEntries = 2;
  const numMaterials = 2;
  const numInventoryTx = 1;
  const numMaintenance = 1;
  const numSuppliers = 2;
  const numNotif = 2;
  const numExpenses = 2;

  for (let b = 0; b < numBusiness; b++) {
    const bizId = uuidv4();
    const created = isoNow;

    // Business profile
    items.push({
      PK: `BUS#${bizId}`,
      SK: "PROFILE",
      entityType: "BUSINESS",
      businessId: bizId,
      name: `Business ${b + 1}`,
      address: `${100 + b} Elm St`,
      createdAt: created,
      updatedAt: created,
    });

    // Users & Memberships
    const userIds: string[] = [];
    for (let u = 0; u < numUsers; u++) {
      const userId = uuidv4();
      userIds.push(userId);
      items.push({
        PK: `BUS#${bizId}`,
        SK: `USER#${userId}`,
        entityType: "USER",
        userId,
        name: `User ${b + 1}-${u + 1}`,
        email: `user${b + 1}${u + 1}@example.com`,
        role: ["ADMIN", "EMPLOYEE"][Math.floor(Math.random() * 2)],
        createdAt: created,
        updatedAt: created,
      });
      items.push({
        PK: `USER#${userId}`,
        SK: `BUS#${bizId}`,
        entityType: "MEMBERSHIP",
        role: ["OWNER", "STAFF"][Math.floor(Math.random() * 2)],
        joinedAt: created,
        GSI1PK: `BUS#${bizId}`,
        GSI1SK: `USER#${userId}`,
      });
    }

    // Customers & Memberships
    const custIds: string[] = [];
    for (let c = 0; c < numCustomers; c++) {
      const custId = uuidv4();
      custIds.push(custId);
      items.push({
        PK: `CUST#${custId}`,
        SK: "PROFILE",
        entityType: "CUSTOMER",
        customerId: custId,
        name: `Customer ${b + 1}-${c + 1}`,
        email: `cust${b + 1}${c + 1}@example.com`,
        phone: `555-0${100 + Math.floor(Math.random() * 900)}`,
        address: `${200 + b + c} Oak Ave`,
        createdAt: created,
        updatedAt: created,
      });
      items.push({
        PK: `CUST#${custId}`,
        SK: `BUS#${bizId}`,
        entityType: "CUSTOMER_MEMBERSHIP",
        joinedAt: created,
        GSI1PK: `BUS#${bizId}`,
        GSI1SK: `CUST#${custId}`,
      });
    }

    // Services
    for (let s = 0; s < numServices; s++) {
      const servId = uuidv4();
      const pricing = ["HOURLY", "FLAT"][Math.floor(Math.random() * 2)];
      items.push({
        PK: `BUS#${bizId}`,
        SK: `SERV#${servId}`,
        entityType: "SERVICE",
        serviceId: servId,
        name: `Service ${b + 1}-${s + 1}`,
        description: "Generic service",
        pricingType: pricing,
        pricePerHour:
          pricing === "HOURLY"
            ? +(50 + Math.random() * 50).toFixed(2)
            : undefined,
        flatFee:
          pricing === "FLAT"
            ? +(200 + Math.random() * 300).toFixed(2)
            : undefined,
        estimatedDuration: Math.floor(30 + Math.random() * 90),
        createdAt: created,
        updatedAt: created,
      });
    }

    // Crews
    const crewIds: string[] = [];
    for (let cr = 0; cr < numCrews; cr++) {
      const crId = uuidv4();
      crewIds.push(crId);
      items.push({
        PK: `BUS#${bizId}`,
        SK: `CREW#${crId}`,
        entityType: "CREW",
        crewId: crId,
        name: `Crew ${b + 1}-${cr + 1}`,
        members: [userIds[Math.floor(Math.random() * userIds.length)]],
        createdAt: created,
        updatedAt: created,
      });
    }

    // Equipment + Maintenance + Assignment
    for (let eq = 0; eq < numEquipment; eq++) {
      const eqId = uuidv4();
      items.push({
        PK: `BUS#${bizId}`,
        SK: `EQUIP#${eqId}`,
        entityType: "EQUIPMENT",
        equipmentId: eqId,
        name: `Equipment ${b + 1}-${eq + 1}`,
        type: "TOOL",
        status: ["AVAILABLE", "IN_USE"][Math.floor(Math.random() * 2)],
        purchaseDate: now.toISOString().slice(0, 10),
        lastServiceAt: now.toISOString().slice(0, 10),
        nextServiceDue: now.toISOString().slice(0, 10),
        createdAt: created,
        updatedAt: created,
      });
      // Maintenance
      const mId = uuidv4();
      items.push({
        PK: `EQUIP#${eqId}`,
        SK: `MAINT#${now.toISOString().slice(0, 10)}#${mId}`,
        entityType: "MAINTENANCE_RECORD",
        maintenanceId: mId,
        serviceDate: now.toISOString().slice(0, 10),
        type: "ROUTINE",
        provider: "ACME",
        notes: "All good",
        cost: 100,
        nextServiceDue: now.toISOString().slice(0, 10),
        createdAt: created,
        updatedAt: created,
        GSI6PK: `BUS#${bizId}`,
        GSI6SK: mId,
      });
      // Equipment assignment (placeholder)
      items.push({
        PK: `EQUIP#${eqId}`,
        SK: `JOB#`,
        entityType: "EQUIPMENT_ASSIGNMENT",
        equipmentId: eqId,
        jobId: "",
        crewId: crewIds[0],
        scheduledStart: isoNow,
        scheduledEnd: isoNow,
        GSI3PK: `BUS#${bizId}`,
        GSI3SK: eqId,
        GSI4PK: `CREW#${crewIds[0]}`,
        GSI4SK: eqId,
      });
    }

    // Jobs
    for (let j = 0; j < numJobs; j++) {
      const jId = uuidv4();
      const cust = custIds[Math.floor(Math.random() * custIds.length)];
      const start = randomDate(past30, now);
      const end = new Date(
        new Date(start).getTime() + 2 * 60 * 60 * 1000
      ).toISOString();
      items.push({
        PK: `BUS#${bizId}`,
        SK: `JOB#${jId}`,
        entityType: "JOB",
        jobId: jId,
        customerId: cust,
        services: [],
        totalEstimatedDuration: 120,
        scheduledStartAt: start,
        scheduledEndAt: end,
        totalEstimatedCost: +(100 + Math.random() * 400).toFixed(2),
        status: ["SCHEDULED", "COMPLETED"][Math.floor(Math.random() * 2)],
        createdAt: created,
        updatedAt: created,
        GSI2PK: `CUST#${cust}`,
        GSI2SK: start,
      });
    }

    // Invoices & Payments
    for (let inv = 0; inv < numInvoices; inv++) {
      const invId = uuidv4();
      const cust = custIds[Math.floor(Math.random() * custIds.length)];
      const issued = isoNow;
      const due = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      items.push({
        PK: `BUS#${bizId}`,
        SK: `INV#${invId}`,
        entityType: "INVOICE",
        invoiceId: invId,
        customerId: cust,
        status: "ISSUED",
        issuedAt: issued,
        dueDate: due,
        lineItems: [
          { description: "Item", quantity: 1, unitPrice: 100, totalPrice: 100 },
        ],
        subTotal: 100,
        tax: 10,
        total: 110,
        createdAt: created,
        updatedAt: created,
        GSI5PK: `CUST#${cust}`,
        GSI5SK: issued,
      });
      for (let pay = 0; pay < numPayments; pay++) {
        const payId = uuidv4();
        const paidAt = isoNow;
        items.push({
          PK: `BUS#${bizId}`,
          SK: `PAY#${paidAt}#${payId}`,
          entityType: "PAYMENT",
          paymentId: payId,
          invoiceId: invId,
          customerId: cust,
          amount: 110,
          method: "CREDIT_CARD",
          paidAt,
          createdAt: created,
          updatedAt: created,
          GSI2PK: `CUST#${cust}`,
          GSI2SK: paidAt,
          GSI5PK: `INV#${invId}`,
          GSI5SK: paidAt,
        });
      }
    }

    // Proposals
    for (let pr = 0; pr < numProposals; pr++) {
      const prId = uuidv4();
      const cust = custIds[Math.floor(Math.random() * custIds.length)];
      const validUntil = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      items.push({
        PK: `BUS#${bizId}`,
        SK: `PROP#${prId}`,
        entityType: "PROPOSAL",
        proposalId: prId,
        customerId: cust,
        status: "SENT",
        createdAt: created,
        validUntil,
        updatedAt: created,
        lineItems: [
          {
            description: "Proposal Item",
            quantity: 1,
            unitPrice: 150,
            totalPrice: 150,
          },
        ],
        subTotal: 150,
        tax: 15,
        total: 165,
        GSI5PK: `CUST#${cust}`,
        GSI5SK: created,
      });
    }

    // Recurring jobs
    for (let r = 0; r < numRecurring; r++) {
      const rId = uuidv4();
      const cust = custIds[Math.floor(Math.random() * custIds.length)];
      const nextRun = isoNow;
      items.push({
        PK: `BUS#${bizId}`,
        SK: `RECUR#${rId}`,
        entityType: "RECURRING_JOB",
        recurringId: rId,
        name: "Monthly Cleanup",
        customerId: cust,
        services: [],
        recurrenceRule: "FREQ=MONTHLY",
        leadTimeDays: 7,
        nextRunAt: nextRun,
        status: "ACTIVE",
        createdAt: created,
        updatedAt: created,
        GSI6PK: `CUST#${cust}`,
        GSI6SK: nextRun,
      });
    }

    // Time entries
    for (let t = 0; t < numTimeEntries; t++) {
      const tId = uuidv4();
      const uid = userIds[Math.floor(Math.random() * userIds.length)];
      const start = isoNow;
      const end = new Date(
        new Date(start).getTime() + 60 * 60 * 1000
      ).toISOString();
      items.push({
        PK: `BUS#${bizId}`,
        SK: `TIME#USER#${uid}#${start}#${tId}`,
        entityType: "TIME_ENTRY",
        timeEntryId: tId,
        userId: uid,
        startAt: start,
        endAt: end,
        duration: 60,
        notes: "",
        createdAt: created,
        updatedAt: created,
      });
    }

    // Materials & inventory
    const matIds: string[] = [];
    for (let m = 0; m < numMaterials; m++) {
      const mId = uuidv4();
      matIds.push(mId);
      items.push({
        PK: `BUS#${bizId}`,
        SK: `MATERIAL#${mId}`,
        entityType: "MATERIAL",
        materialId: mId,
        name: "Mulch",
        unit: "BAG",
        unitCost: 5,
        currentStock: 20,
        reorderThreshold: 5,
        createdAt: created,
        updatedAt: created,
      });
      for (let tx = 0; tx < numInventoryTx; tx++) {
        const txId = uuidv4();
        const txTime = randomDate(past30, now);
        items.push({
          PK: `MATERIAL#${mId}`,
          SK: `INVENTORY#${txTime}#${txId}`,
          entityType: "INVENTORY_TXN",
          txnId: txId,
          type: "PURCHASE",
          quantity: 10,
          unitCost: 5,
          createdAt: txTime,
        });
      }
    }

    // Suppliers
    for (let sp = 0; sp < numSuppliers; sp++) {
      const spId = uuidv4();
      items.push({
        PK: `BUS#${bizId}`,
        SK: `SUP#${spId}`,
        entityType: "SUPPLIER",
        supplierId: spId,
        name: `Supplier ${sp + 1}`,
        contactName: "Jane Doe",
        email: "jane@sup.com",
        phone: "555-0200",
        address: "500 Pine Rd",
        paymentTerms: "Net30",
        leadTimeDays: 7,
        materials: matIds,
        createdAt: created,
        updatedAt: created,
      });
    }

    // Notifications
    for (const uid of userIds) {
      for (let n = 0; n < numNotif; n++) {
        const nId = uuidv4();
        const ts = isoNow;
        items.push({
          PK: `USER#${uid}`,
          SK: `NOTIF#${ts}#${nId}`,
          entityType: "NOTIFICATION",
          notificationId: nId,
          type: "ALERT",
          level: "INFO",
          message: "Test notification",
          relatedEntityType: "JOB",
          relatedEntityId: "",
          channels: ["EMAIL"],
          read: false,
          createdAt: ts,
          updatedAt: ts,
        });
      }
    }

    // Expenses
    for (let e = 0; e < numExpenses; e++) {
      const eId = uuidv4();
      items.push({
        PK: `BUS#${bizId}`,
        SK: `EXP#${eId}`,
        entityType: "EXPENSE",
        expenseId: eId,
        date: now.toISOString().slice(0, 10),
        amount: +(50 + Math.random() * 250).toFixed(2),
        currency: "USD",
        category: "Fuel",
        description: "Gas expense",
        createdAt: created,
        updatedAt: created,
      });
    }
  } // end business loop

  return items;
}
