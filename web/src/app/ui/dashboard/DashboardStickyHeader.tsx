import Link from "next/link";
import React from "react";
import { Button } from "../Button";
import { FaPlus } from "react-icons/fa6";

interface DashboardStickyHeaderProps {
  board?: any;
}

export const DashboardStickyHeader: React.FC<DashboardStickyHeaderProps> = ({
  board,
}) => {
  return (
    <div className="flex flex-row items-center w-full justify-between px-6 fixed bg-primary-900 z-10">
      <div className="py-6">
        {/* Note: might be preferable in the future to stick the route at the top for better navigation, but for now we'll stick the title.*/}
        <div className="text-2xl font-bold py-1">
          {board?.name ?? "No board selected"}
        </div>
        <div className="text-xs subtext">Here are our main charts.</div>
      </div>

      {/* Placeholder bank for little buttons */}
      <div></div>

      {/* New chart button */}
      <Link href="/chart">
        <Button>
          <div className="flex items-center">
            <FaPlus className="mr-2" /> New chart
          </div>
        </Button>
      </Link>
    </div>
  );
};