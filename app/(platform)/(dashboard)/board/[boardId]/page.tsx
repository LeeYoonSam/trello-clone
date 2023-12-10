import React from "react";

const BoardIdPage = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  return (
    <div>
      Board ID!
    </div>
  );
};

export default BoardIdPage;