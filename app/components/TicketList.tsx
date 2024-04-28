import Link from "next/link";
import { getTickets, deleteTicket } from "../actions/server";
import { CloseButton } from "./CloseButton";

const TicketList = async () => {
  const tickets = await getTickets();

  const handleDelete = async (ticketId: string) => {
    "use server";
    await deleteTicket(ticketId);
  };

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <CloseButton
            callback={handleDelete}
            ticketId={ticket._id.toString()}
          />
          <Link href={`/${ticket._id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">Currently no open tickets</p>
      )}
    </>
  );
};

export default TicketList;
