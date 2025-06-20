'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Meal } from '@/lib/features/meals/mealsSlice';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  meal: Meal | null;
}

export function DeleteModal({ isOpen, onClose, onConfirm, meal }: DeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-orange-500 text-xl font-semibold">
            Delete Meal
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>
          
          <div className="flex space-x-3">
            <Button
              onClick={onConfirm}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Yes
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}