import * as React from 'react';

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';

export default function InstructionDialog({
  isOpen,
  id,
  closeInstructionDialog,
  addInstruction,
}: {
  isOpen: boolean;
  id?: string;
  closeInstructionDialog: () => void;
  addInstruction: (_data: any) => void;
}) {
  const [instruction, setInstruction] = React.useState('');
  return (
    <Dialog open={isOpen} onOpenChange={closeInstructionDialog}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>
            {id ? 'Update ' : 'Add '}
            Sets
          </DialogTitle>
        </DialogHeader>
        <Editor
          onChange={(e) => {
            setInstruction(e);
          }}
          value={instruction}
          placeholder="Enter description"
        />
        <Button
          onClick={() => {
            addInstruction(instruction);
            closeInstructionDialog();
            setInstruction('');
          }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

InstructionDialog.defaultProps = {
  id: null,
};
