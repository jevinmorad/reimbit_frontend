import { EntityId } from "@/hooks/userListView";

export type DataModalSlotProps = {
  selectedRow?: EntityId | null;
  showModal: boolean;
  onClose?: () => void;
};