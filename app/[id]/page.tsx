import { notFound } from "next/navigation";
import { getTicketIds, getTicket } from "../actions/server";

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const ticketIds = await getTicketIds();

  return ticketIds.map((ticket) => ({
    id: ticket,
  }));
};

export const TicketDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const ticket = await getTicket(id);

  if (!ticket) {
    notFound();
  }

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
