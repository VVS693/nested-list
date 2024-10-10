import AddItemIcon from "@shared/assets/add-square-svgrepo-com.svg";
import DeleteIcon from "@shared/assets/trash-bin-2-svgrepo-com.svg";
import { ListItemType } from "@shared/types";
import { memo } from "react";
import styled from "styled-components";

const Container = styled.div<{ $level?: number }>`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  padding: 4px;
  user-select: none;
  white-space: nowrap;
  margin-left: ${({ $level }) => ($level ? $level * 20 : 0)}px;
`;

const IconButton = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #656565;
  flex-shrink: 0;

  &:hover {
    color: #0056b3;
  }
`;
const AddItemButton = styled(IconButton).attrs({ as: AddItemIcon })``;
const DeleteButton = styled(IconButton).attrs({ as: DeleteIcon })`
  color: #d32f2f;
  &:hover {
    color: #ef5350;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

interface ListItemProps {
  item: ListItemType;
  add?: (id: string) => void;
  del?: (id: string) => void;
}

export const ListItem = memo(({ item, add, del }: ListItemProps) => {
  const { title, id, path } = item;

  return (
    <Container $level={path.length - 1}>
      {title}
      <ButtonWrapper>
        {add && <AddItemButton onClick={() => add(id)} />}
        {del && id !== "parent" && <DeleteButton onClick={() => del(id)} />}
      </ButtonWrapper>
    </Container>
  );
});
