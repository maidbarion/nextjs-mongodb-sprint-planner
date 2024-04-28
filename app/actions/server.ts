"use server";

import { connectToDatabase } from "../database/mongodb";
import { ObjectId } from "mongodb";
import { Ticket } from "../types/types";
import { revalidatePath } from "next/cache";

export const getTicketIds = async () => {
  const db = await connectToDatabase();
  try {
    const tickets = await db
      .collection("tickets")
      .aggregate<{ _id: string }>([
        {
          $project: {
            _id: {
              $toString: "$_id",
            },
          },
        },
      ])
      .toArray();

    return tickets.map((ticket) => ticket._id);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getTickets = async () => {
  const db = await connectToDatabase();
  try {
    return await db.collection("tickets").find().toArray();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getTicket = async (ticketId: string) => {
  const db = await connectToDatabase();
  try {
    const ticket = await db.collection("tickets").findOne(
      {
        _id: new ObjectId(ticketId),
      },
      {
        projection: {
          _id: {
            $toString: "$_id",
          },
          title: 1,
          body: 1,
          priority: 1,
          user_email: 1,
        },
      }
    );
    if (ticket === null) throw new Error("not found");
    return ticket;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createTicket = async (ticketData: Ticket) => {
  const { title, body, priority, user_email } = ticketData;

  const db = await connectToDatabase();
  try {
    const post = await db
      .collection("tickets")
      .insertOne({ title, body, priority, user_email });
    return post ? true : false;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteTicket = async (ticketId: string) => {
  const db = await connectToDatabase();
  try {
    await db.collection("tickets").deleteOne({ _id: new ObjectId(ticketId) });
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error("An error has occured");
  }
};
