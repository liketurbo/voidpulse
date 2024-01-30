import React from "react";
import { LineChart } from "../ui/charts/LineChart";
import { placeholderLineData } from "../ui/charts/PlaceholderChartData";
import Link from "next/link";
import { MetricSelector } from "./MetricSelector";
interface ChartEditorProps {}

export const ChartEditor: React.FC<ChartEditorProps> = ({}) => {
  const [eventName, setEventName] = React.useState("");

  return (
    <div>
      {/* Navigation that shows hierarchy of dashboards */}
      <div className="h-14 border-b border-primary-700 items-center flex">
        <Link href="/">
          <div className="mx-4 text-sm text-primary-500">Back to dashboard</div>
        </Link>
      </div>
      {/* View that houses editor and chart side by side */}
      <div className="flex grow w-full h-full">
        {/* Toolbar */}
        <div className="border-r p-4 border-primary-700" style={{ width: 400 }}>
          <div className="hoverable area text p-2 rounded-md">Metrics</div>
          <MetricSelector
            eventName={eventName}
            onEventNameChange={setEventName}
          />
          <div className="hoverable area text p-2 rounded-md">Filter</div>
          <div className="hoverable area text p-2 rounded-md">Breakdown</div>
        </div>
        {/* Chart view panel */}
        <div className="w-full">
          {/* Just the chart */}
          <div className="p-12" style={{ minWidth: 800, minHeight: 500 }}>
            <h1 className="font-bold text-lg text-primary-100 px-2">
              Chart title
            </h1>
            {eventName ? <LineChart data={placeholderLineData} /> : null}
          </div>
          {/* Additional data at the bottom */}
          <div className="bg-primary-600">Data at the bottom</div>
        </div>
      </div>
    </div>
  );
};