import React from "react";
import Modal from "react-modal";
import { trpc } from "../../utils/trpc";
import { Button } from "../../ui/Button";
import { FullScreenModalOverlay } from "../../ui/FullScreenModalOverlay";
import { useLastSelectedProjectBoardStore } from "../../../../stores/useLastSelectedProjectBoardStore";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

interface DeleteBoardConfirmationModalProps {
  isOpen: boolean;
  onDismissModal: () => void;
  boardTitle: string;
  boardId: string;
}

export const DeleteBoardConfirmationModal: React.FC<
  DeleteBoardConfirmationModalProps
> = ({ isOpen, onDismissModal, boardTitle, boardId }) => {
  //Keep track of last project so we stay on the same project after deleting a board.
  const { lastProjectId } = useLastSelectedProjectBoardStore();
  const utils = trpc.useUtils();
  const { mutateAsync, isPending } = trpc.deleteBoard.useMutation({
    //After successful db deletion, remove the board from the local list of boards.
    onSuccess: () => {
      utils.getProjects.setData({ currProjectId: lastProjectId }, (old) => {
        if (!old) {
          return old;
        }
        return {
          boards: old.boards.filter((b) => b.id !== boardId),
          projects: old.projects,
        };
      });
    },
  });

  return (
    <FullScreenModalOverlay isOpen={isOpen}>
      <div className="relative standard card p-4">
        <h1 className="text-2xl font-bold py-2">Delete Board</h1>
        <div style={{ maxWidth: 400 }}>
          Are you sure you want to delete the {boardTitle} board? This cannot be
          undone.
        </div>
        <div className="flex flex-row space-x-2 justify-end mt-4">
          <Button buttonType="neutral" onClick={onDismissModal}>
            Cancel
          </Button>
          <Button
            buttonType="negative"
            onClick={() => {
              mutateAsync({
                id: boardId,
              });
              onDismissModal;
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </FullScreenModalOverlay>
  );
};
