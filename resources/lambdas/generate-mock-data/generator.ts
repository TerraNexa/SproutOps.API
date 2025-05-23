import { v4 as uuidv4 } from "uuid";

export function generateMockData(): Record<string, any>[] {
  const items: Record<string, any>[] = [];
  const now = new Date();
  const isoNow = new Date(now.getTime() + 7 * 86400000).toISOString();

  const businessId = uuidv4();

  // Business
  items.push({
    PK: `BUS#${businessId}`,
    SK: "PROFILE",
    entityType: "BUSINESS",
    businessId,
    name: "Sample Landscaping Co",
    address: "123 Main St",
    createdAt: isoNow,
    updatedAt: isoNow,
  });

  const NUM = 3;

  for (let i = 0; i < NUM; i++) {
    const userId = uuidv4();
    const customerId = uuidv4();
    const equipmentId = uuidv4();
    const jobId = uuidv4();
    const crewId = uuidv4();
    const materialId = uuidv4();
    const maintenanceId = uuidv4();
    const txnId = uuidv4();
    const invoiceId = uuidv4();
    const proposalId = uuidv4();
    const recurringId = uuidv4();
    const timeEntryId = uuidv4();
    const paymentId = uuidv4();
    const serviceId = uuidv4();

    // User
    items.push({
      PK: `USER#${userId}`,
      SK: "PROFILE",
      entityType: "USER",
      userId,
      name: ["Alice Johnson", "Bob Smith", "Carlos Rivera"][i],
      email: `user${i + 1}@example.com`,
      createdAt: isoNow,
      updatedAt: isoNow,
    });

    // Membership
    items.push({
      PK: `USER#${userId}`,
      SK: `BUS#${businessId}`,
      entityType: "MEMBERSHIP",
      role: ["OWNER", "MANAGER", "EMPLOYEE"][i],
      joinedAt: isoNow,
      GSI1PK: `BUS#${businessId}`,
      GSI1SK: `USER#${userId}`,
    });

    // Notifications
    for (let i = 0; i < NUM; i++) {
      const notificationId = uuidv4();
      items.push({
        PK: `USER#${userId}`,
        SK: `NOTIF#${notificationId}`,
        entityType: "NOTIFICATION",
        notificationId,
        type: ["ALERT", "REMINDER", "SYSTEM"][i],
        level: ["INFO", "WARN", "ERROR"][i],
        message: `Notification for user ${i + 1}`,
        relatedEntityType: "JOB",
        relatedEntityId: jobId,
        channels: ["EMAIL", "SMS"],
        read: false,
        createdAt: isoNow,
        updatedAt: isoNow,
      });
    }

    // Customer
    items.push({
      PK: `CUST#${customerId}`,
      SK: "PROFILE",
      entityType: "CUSTOMER",
      customerId,
      name: ["Diana White", "Evan Brown", "Fiona Davis"][i],
      email: `cust${i + 1}@example.com`,
      phone: `555-12${i + 1}${i + 1}`,
      address: [
        "742 Evergreen Terrace",
        "221B Baker Street",
        "1600 Pennsylvania Ave",
      ][i],
      createdAt: isoNow,
      updatedAt: isoNow,
    });

    // CustomerMembership
    items.push({
      PK: `CUST#${customerId}`,
      SK: `BUS#${businessId}`,
      entityType: "CUSTOMER_MEMBERSHIP",
      joinedAt: isoNow,
      GSI1PK: `BUS#${businessId}`,
      GSI1SK: `CUST#${customerId}`,
    });

    // Service
    const service = {
      PK: `BUS#${businessId}`,
      SK: `SERV#${serviceId}`,
      entityType: "SERVICE",
      serviceId,
      name: ["Lawn Mowing", "Hedge Trimming", "Leaf Blowing"][i],
      description: "Mocked service",
      pricingType: "FLAT",
      flatFee: [95, 120, 85][i],
      estimatedDuration: [30, 60, 45][i],
      createdAt: isoNow,
      updatedAt: isoNow,
    };

    items.push(service);

    // Crew
    items.push({
      PK: `BUS#${businessId}`,
      SK: `CREW#${crewId}`,
      entityType: "CREW",
      crewId,
      name: `Crew ${i + 1}`,
      members: [userId],
      createdAt: isoNow,
      updatedAt: isoNow,
    });

    // Equipment
    items.push({
      PK: `BUS#${businessId}`,
      SK: `EQUIP#${equipmentId}`,
      entityType: "EQUIPMENT",
      equipmentId,
      name: `Equipment ${i + 1}`,
      type: "MOWER",
      status: "AVAILABLE",
      purchaseDate: isoNow.slice(0, 10),
      lastServiceAt: isoNow.slice(0, 10),
      nextServiceDue: isoNow.slice(0, 10),
      createdAt: isoNow,
      updatedAt: isoNow,
    });

    // EquipmentAssignment
    items.push({
      PK: `EQUIP#${equipmentId}`,
      SK: `JOB#${isoNow}#${jobId}`,
      entityType: "EQUIPMENT_ASSIGNMENT",
      equipmentId,
      jobId,
      crewId,
      scheduledStart: isoNow,
      scheduledEnd: isoNow,
      GSI3PK: `BUS#${businessId}`,
      GSI3SK: `EQUIP#${equipmentId}`,
      GSI4PK: `CREW#${crewId}`,
      GSI4SK: `JOB#${jobId}`,
    });

    // MaintenanceRecord
    items.push({
      PK: `EQUIP#${equipmentId}`,
      SK: `MAINT#${isoNow.slice(0, 10)}#${maintenanceId}`,
      entityType: "MAINTENANCE_RECORD",
      maintenanceId,
      serviceDate: isoNow.slice(0, 10),
      type: "REPAIR",
      provider: "Machinery Co",
      notes: "Fixed belt",
      cost: 150,
      nextServiceDue: new Date(now.getTime() + 30 * 86400000)
        .toISOString()
        .slice(0, 10),
      createdAt: isoNow,
      updatedAt: isoNow,
      GSI6PK: `BUS#${businessId}`,
      GSI6SK: maintenanceId,
    });

    // Job
    items.push({
      PK: `BUS#${businessId}`,
      SK: `JOB#${jobId}`,
      entityType: "JOB",
      jobId,
      customerId,
      services: [
        {
          serviceId: service.serviceId,
          serviceName: service.name,
          pricingType: service.pricingType,
          flatFee: service.flatFee,
          estimatedDuration: service.estimatedDuration,
        },
      ],
      totalEstimatedDuration: 60,
      scheduledStartAt: new Date(
        now.getTime() + (7 + i) * 86400000
      ).toISOString(),
      scheduledEndAt: new Date(
        now.getTime() + (7 + i) * 86400000 + 3600000
      ).toISOString(),
      totalEstimatedCost: 100,
      status: ["SCHEDULED", "IN_PROGRESS", "COMPLETED"][i],
      createdAt: isoNow,
      updatedAt: isoNow,
      GSI2PK: `CUST#${customerId}`,
      GSI2SK: isoNow,
    });

    // Job Crew Assignment
    items.push({
      PK: `JOB#${jobId}`,
      SK: `CREW#${crewId}`,
      entityType: "JOB_CREW_ASSIGNMENT",
      jobId,
      crewId,
      businessId,
      assignedAt: isoNow,
      GSI1PK: `CREW#${crewId}`,
      GSI1SK: `JOB#${jobId}`,
    });

    // Invoice
    items.push({
      PK: `BUS#${businessId}`,
      SK: `INV#${invoiceId}`,
      entityType: "INVOICE",
      invoiceId,
      customerId,
      status: "ISSUED",
      issuedAt: isoNow,
      dueDate: isoNow.slice(0, 10),
      lineItems: [
        {
          description: "Service",
          quantity: 1,
          unitPrice: [90, 115, 105][i],
          totalPrice: [90, 115, 105][i],
        },
      ],
      subTotal: [90, 115, 105][i],
      tax: [9, 11.5, 10.5][i],
      total: [99, 126.5, 115.5][i],
      createdAt: isoNow,
      updatedAt: isoNow,
      GSI2PK: `CUST#${customerId}`,
      GSI2SK: `INV#${invoiceId}`,
    });

    // Payment
    items.push({
      PK: `BUS#${businessId}`,
      SK: `PAY#${paymentId}`,
      entityType: "PAYMENT",
      paymentId,
      invoiceId,
      customerId,
      amount: [99, 126.5, 115.5][i],
      method: "CREDIT_CARD",
      paidAt: isoNow,
      createdAt: isoNow,
      updatedAt: isoNow,
      GSI2PK: `CUST#${customerId}`,
      GSI2SK: `PAY#${paymentId}`,
      GSI5PK: `INV#${invoiceId}`,
      GSI5SK: `PAY#${paymentId}`,
    });

    // Proposal
    items.push({
      PK: `BUS#${businessId}`,
      SK: `PROP#${proposalId}`,
      entityType: "PROPOSAL",
      proposalId,
      customerId,
      status: "SENT",
      validUntil: isoNow.slice(0, 10),
      createdAt: isoNow,
      updatedAt: isoNow,
      lineItems: [
        {
          description: "Cleanup",
          quantity: 1,
          unitPrice: 200,
          totalPrice: 200,
        },
      ],
      subTotal: 200,
      tax: 20,
      total: 220,
      GSI2PK: `CUST#${customerId}`,
      GSI2SK: `PROP#${proposalId}`,
    });

    // Recurring Job
    items.push({
      PK: `BUS#${businessId}`,
      SK: `RECUR#${recurringId}`,
      entityType: "RECURRING_JOB",
      recurringId,
      name: "Weekly Service",
      customerId,
      services: [
        {
          serviceId: service.serviceId,
          serviceName: service.name,
          pricingType: service.pricingType,
          flatFee: service.flatFee,
          estimatedDuration: service.estimatedDuration,
        },
      ],
      recurrenceRule: "FREQ=WEEKLY",
      leadTimeDays: 2,
      nextRunAt: isoNow,
      status: "ACTIVE",
      createdAt: isoNow,
      updatedAt: isoNow,
      GSI2PK: `CUST#${customerId}`,
      GSI2SK: `RECUR#${recurringId}`,
    });

    // Time Entry
    items.push({
      PK: `BUS#${businessId}`,
      SK: `TIME#${isoNow}#${timeEntryId}`,
      entityType: "TIME_ENTRY",
      timeEntryId,
      userId,
      crewId,
      jobId,
      startAt: isoNow,
      endAt: isoNow,
      duration: 60,
      notes: "Maintenance",
      createdAt: isoNow,
      updatedAt: isoNow,

      GSI1PK: `USER#${userId}`,
      GSI1SK: `TIME#${isoNow}#${timeEntryId}`,
      GSI2PK: `CREW#${crewId}`,
      GSI2SK: `TIME#${isoNow}#${timeEntryId}`,
    });

    // Material
    items.push({
      PK: `BUS#${businessId}`,
      SK: `MATERIAL#${materialId}`,
      entityType: "MATERIAL",
      materialId,
      name: `Material ${i + 1}`,
      unit: "BAG",
      unitCost: 25,
      currentStock: 100,
      reorderThreshold: 10,
      createdAt: isoNow,
      updatedAt: isoNow,
    });

    // InventoryTransaction
    items.push({
      PK: `MATERIAL#${materialId}`,
      SK: `INVENTORY#${isoNow}#${txnId}`,
      entityType: "INVENTORY_TXN",
      txnId,
      type: "PURCHASE",
      quantity: 20,
      unitCost: 25,
      relatedJob: jobId,
      supplierId: uuidv4(),
      note: "Refill",
      createdAt: isoNow,
    });
  }

  // Expenses
  for (let i = 0; i < NUM; i++) {
    const expenseId = uuidv4();
    items.push({
      PK: `BUS#${businessId}`,
      SK: `EXP#${expenseId}`,
      entityType: "EXPENSE",
      expenseId,
      date: isoNow.slice(0, 10),
      amount: 50 + i * 10,
      currency: "USD",
      category: "Fuel",
      description: `Gasoline for mower ${i + 1}`,
      createdAt: isoNow,
      updatedAt: isoNow,
    });
  }

  return items;
}
