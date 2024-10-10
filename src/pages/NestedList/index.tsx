import { ListItem } from "@shared/components/ListItem";
import { MainLayout } from "@shared/components/MainLayout";
import { ListItemType } from "@shared/types";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialList: ListItemType[] = [
  { id: "parent", title: "Parent item", path: [1] },
];

export const NestedList = () => {
  const [listItems, setListItems] = useState<ListItemType[]>(initialList);

  const handleAddChild = useCallback((parentId: string) => {
    setListItems((prevListItems) => {
      const parentItem = prevListItems.find((item) => item.id === parentId);

      if (parentItem) {
        const siblings = prevListItems.filter((item) => {
          const isSamePath =
            item.path.slice(0, parentItem.path.length).toString() ===
            parentItem.path.toString();
          return isSamePath && item.path.length === parentItem.path.length + 1;
        });

        const parentIndex = prevListItems.indexOf(parentItem);
        let insertIndex = parentIndex + 1;
        while (
          insertIndex < prevListItems.length &&
          prevListItems[insertIndex].path.length > parentItem.path.length
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
      }

      return prevListItems;
    });
  }, []);

  const handleDelete = useCallback((id: string) => console.log(id), []);

  return (
    <MainLayout>
      <h1>Nested List Kinescope</h1>
      {listItems.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          add={handleAddChild}
          del={handleDelete}
        />
      ))}
    </MainLayout>
  );
};
