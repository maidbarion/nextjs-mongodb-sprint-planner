"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTicket } from "../actions/server";

export const CreateForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);

    const newTicket = {
      title,
      body,
      priority,
      user_email: email,
    };

    const ticket = await createTicket(newTicket);

    if (ticket) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(evt) => setTitle(evt.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(evt) => setBody(evt.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          required
          type="text"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          onChange={(evt) => setPriority(evt.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
};
