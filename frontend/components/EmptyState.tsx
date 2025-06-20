'use client';

import { ShoppingBag } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="empty-state-message">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No meals found</h3>
        <p className="text-gray-500">Try searching for something else or add a new meal.</p>
      </div>
    </div>
  );
}