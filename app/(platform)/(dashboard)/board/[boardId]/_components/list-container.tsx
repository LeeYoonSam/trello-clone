"use client";

import { useEffect, useState } from "react";
import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerPoprs {
  data: ListWithCards[];
  boardId: string;
};

export const ListContainer = ({
  data,
  boardId
}: ListContainerPoprs) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol>
      {orderedData.map((list, index) => {
        return (
          <ListItem
            key={list.id}
            index={index}
            data={list}
          />
        )
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  )
}