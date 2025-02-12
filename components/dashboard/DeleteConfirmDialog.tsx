import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  registrationDetails: {
    name: string;
    event: string;
  } | null;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  registrationDetails,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="pt-4 space-y-2">
            <p>Are you sure you want to delete this registration?</p>
            {registrationDetails && (
              <div className="bg-muted p-3 rounded-lg space-y-1">
                <p>
                  <span className="font-medium">Name/Team:</span>{" "}
                  {registrationDetails.name}
                </p>
                <p>
                  <span className="font-medium">Event:</span>{" "}
                  {registrationDetails.event}
                </p>
              </div>
            )}
            <p className="text-destructive font-medium pt-2">
              This action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1 sm:flex-none"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
