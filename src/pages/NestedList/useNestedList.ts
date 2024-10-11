import { ListItemType } from "@shared/types";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useNestedList = (initialList: ListItemType[]) => {
  const [listItems, setListItems] = useState<ListItemType[]>(initialList);

  const handleAddChild = useCallback((parentId: string) => {
    setListItems((prevListItems) => {
      const parentIndex = prevListItems.findIndex(
        (item) => item.id === parentId,
      );
      if (parentIndex === -1) return prevListItems;

      const parentItem = prevListItems[parentIndex];
      const parentPathLength = parentItem.path.length;

      const siblings = prevListItems.filter(
        (item) =>
          item.path.length === parentPathLength + 1 &&
          item.path.slice(0, parentPathLength).toString() ===
            parentItem.path.toString(),
      );

      let insertIndex = parentIndex + 1;
      while (
        insertIndex < prevListItems.length &&
        prevListItems[insertIndex].path.length > parentPathLength
      ) {
        insertIndex++;
      }

      const newItem: ListItemType = {
        id: uuidv4(),
        title: `${[...parentItem.path, siblings.length + 1].join(".")}. Child of ${parentItem.title}`,
        path: [...parentItem.path, siblings.length + 1],
      };

      return [
        ...prevListItems.slice(0, insertIndex),
        newItem,
        ...prevListItems.slice(insertIndex),
      ];
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setListItems((prevListItems) => {
      const itemToDelete = prevListItems.find((item) => item.id === id);

      if (!itemToDelete) {
        return prevListItems;
      }

      return prevListItems.filter(
        (item) =>
          item.path.slice(0, itemToDelete.path.length).toString() !==
          itemToDelete.path.toString(),
      );
    });
  }, []);

  return { listItems, handleAddChild, handleDelete };
};
