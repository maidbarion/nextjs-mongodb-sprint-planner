import { Suspense } from "react";
import TicketList from "./components/TicketList";
import Loading from "./loading";
import Link from "next/link";

export const Tickets = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
        </div>
        <Link href="/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
};

export default Tickets;
