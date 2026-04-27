'use client';

import { HelpCircle } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface JargonTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function JargonTooltip({ term, definition, children }: JargonTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-help border-b border-dotted border-gray-400 text-gray-900 hover:border-blue-600 hover:text-blue-600 transition-colors">
            {children}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-xs rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-xl z-50"
            sideOffset={5}
          >
            <div className="mb-1 flex items-center gap-2">
              <HelpCircle className="size-4 text-blue-400" />
              <span className="font-semibold">{term}</span>
            </div>
            <p className="text-gray-200">{definition}</p>
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
