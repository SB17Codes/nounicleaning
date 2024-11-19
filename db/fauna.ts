

import { Client, fql, FaunaError } from "fauna";
import { UserJSON } from "@clerk/nextjs/server";




const faunaClient = new Client({
  secret: "fnAFwWQSn8AAzkTXtPrFOUGdmpPLxqqAdpYTufrT",
});

/**
 * Creates a new customer in the Fauna database
 * @param data UserJSON - The data from Clerk's user object
 */
export async function createCustomer(data: UserJSON) {
  const { id, email_addresses, first_name, last_name, image_url } = data;

  try {
    const email = email_addresses[0]?.email_address;

    if (!email) throw new Error("Email address is required.");

    await faunaClient.query(fql`
      Customers.create({
        customerId: ${id},
        imageUrl:${image_url},
        email: ${email},
        firstName: ${first_name},
        lastName: ${last_name},
        createdAt: Time.now()
      })
    `);
    console.log("Customer created successfully.");
  } catch (error) {
    handleFaunaError(error);
  }
}

/**
 * Fetches a customer by ID
 * @param id string - The customer ID
 */
export async function getCustomer(id: string) {
  try {
    const customer = await faunaClient.query(fql`
      Customers.byCustomerId(${id}).first()
    `);

    if (!customer) throw new Error("Customer not found.");

    return customer;
  } catch (error) {
    handleFaunaError(error);
    return null;
  }
}

/**
 * Creates a property for a customer
 * @param data any - Property data
 * @param customer string - Customer ref
 */
export async function createProperty(data, customerId) {
  const propertyId = "prop_" + Math.random().toString(36).substring(2, 15);
  const address = data.address;
  const propertyType = data.propertyType;
  const notes = data.notes;

  console.log("Property data:", {
    propertyId,
    customerId,
    address,
    propertyType,
    notes,
  });

  console.log("Creating property with data:", {
    propertyId,
    customerId,
    address,
    propertyType,
    notes,
  });

  if (!customerId) {
    throw new Error("Invalid customer reference");
  }

  await faunaClient.query(fql`
    let customer = Customers.byCustomerId(${customerId}).first()
    Properties.create({
      propertyId: ${propertyId},
      customer: customer, // Ensure customer is a valid Ref
      address: ${address},
      propertyType: ${propertyType},
      notes: ${notes}
    })
  `);

  console.log("Property created successfully.");
}

/**
 * Updates a customer's phone number
 * @param phone string - The new phone number
 * @param id string - The customer ID
 */
export async function updateCustomer(data, customerId) {
  try {
    // Fetch the customer reference using the ID
    const customerRef = await faunaClient.query(fql`
      Customers.byCustomerId(${customerId}).first()
    `);

    if (!customerRef) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    console.log("Updating customer:", customerId);
    console.log("Data to update:", data);

    // Update the customer record
    const updatedCustomer = await faunaClient.query(fql`
      Customers.byCustomerId(${customerId}).first()!.update({
        phoneNumber: ${data},
      })
    `);

    console.log("Customer updated successfully:", updatedCustomer);
    return updatedCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
}

/**
 * Handles FaunaDB-specific errors
 * @param error any - The error object
 */
function handleFaunaError(error: any) {
  if (error instanceof FaunaError) {
    console.error("FaunaDB Error:", error.message, error.cause);
    if (error.errors) {
      error.errors.forEach((err) => {
        console.error("Error detail:", err);
      });
    }
  } else {
    console.error("General Error:", error.message || error);
  }
  throw new Error("Operation failed. See logs for details.");
}

export async function createCleaningSchedule(data) {
  const propertyId = data.propertyId;
  const scheduledTime = data.scheduledTime;
  const notes = data.notes;

  console.log("Creating cleaning schedule with data:", {
    propertyId,
    scheduledTime,
  });

  if (!propertyId) {
    throw new Error("Property is required");
  }

  if (!scheduledTime) {
    throw new Error("Scheduled date is required");
  }

  const scheduleId = "clean_" + Math.random().toString(36).substring(2, 15);

  console.log("Creating cleaning schedule with data:", {
    scheduleId,
    status: "Confirmé",
    propertyId,
    scheduledTime,
    notes,
  });

  const response = await faunaClient.query(fql`
    let property = Properties.byPropertyId(${propertyId}).first()
    CleaningSchedules.create({
      scheduleId: ${scheduleId},
      status: "Confirmé",
      property: property, // Ensure property is a valid Ref
      scheduledTime: ${scheduledTime},
      notes: ${notes}
    })
  `);

  console.log("Cleaning schedule created successfully:", response);
  return response;
}

export async function getCleaningSchedules(id: String) {
  const schedules = await faunaClient.query(fql`
    let property = Properties.byId(${id})
    CleaningSchedules.byProperty(property){
      scheduleId,
  status,
  property,
  scheduledTime,
  notes,
  createdAt
    }
     `);

  if (!schedules) {
    throw new Error("Cleaning schedules not found");
  }

  return schedules;
}

export async function getProperty(customerId: String) {
  const property = await faunaClient.query(fql`
    let customer = Customers.byCustomerId(${customerId}).first()
    Properties.byCustomer(customer)
     `);

  if (!property) {
    throw new Error("Property not found");
  }

  return property.data.data;
}
