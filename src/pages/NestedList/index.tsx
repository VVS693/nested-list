import { ListItem } from "@shared/components/ListItem";
import { MainLayout } from "@shared/components/MainLayout";
import { ListItemType } from "@shared/types";

import { useNestedList } from "./useNestedList.ts";

const initialList: ListItemType[] = [
  { id: "parent", title: "Parent item", path: [1] },
];

export const NestedList = () => {
  const { listItems, handleAddChild, handleDelete } =
    useNestedList(initialList);

  return (
    <MainLayout>
      <h1>Nested List</h1>
      {listItems.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onAdd={handleAddChild}
          onDel={handleDelete}
        />
      ))}
    </MainLayout>
  );
};
