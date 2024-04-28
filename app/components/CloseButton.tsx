"use client";

import React, { FC } from "react";

interface Props {
  ticketId: string;
  callback: (id: string) => void;
}

export const CloseButton: FC<Props> = (props: Props) => {
  return (
    <button
      onClick={() => props.callback(props.ticketId)}
      className="close-button"
    >
      ×
    </button>
  );
};
