import React from "react";

type CardProps = {
  title: string;
  value: number;
};

function CardSM({ ...props }: CardProps) {
  return (
    <div className="border p-5 rounded-md">
      <p>{props.title}</p>
      <p>{props.value}</p>
    </div>
  );
}

export default CardSM;
