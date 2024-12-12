"use client";

import { sampleLocations } from "@/app/api-client/Locations";
import { getAllTables, TableEntity } from "@/app/api-client/TableService";
import { useEffect, useState } from "react";

export function Table({
  tableOccupiedIds,
  selectedTableIds,
  handleSelectTable,
}: {
  tableOccupiedIds: number[];
  selectedTableIds: number[];
  handleSelectTable: (tableId: number) => void;
}) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [allTables, setAllTables] = useState<TableEntity[]>([]);

  useEffect(() => {
    getAllTables().then((res) => setAllTables(res.second));
  }, []);

  const viewTables = allTables.filter((table) =>
    selectedLocation === null ? true : table.location === selectedLocation
  );

  return (
    <section className="py-2">
      <div className="flex flex-col gap-y-2 py-2 h-full w-full">
        <div className="p-1 flex flex-wrap items-center gap-2 font-bold text-sm">
          <button
            onClick={() => setSelectedLocation(null)}
            className={`outline-none w-28 p-2 rounded-md text-center transition-all duration-500 ${
              selectedLocation === null
                ? "bg-white text-[#181818] border border-[#181818] shadow-sm"
                : "bg-[#f5f5f5] text-[#d6d6d6]"
            }`}
          >
            Tất cả
          </button>
          {sampleLocations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`outline-none w-28 p-2 rounded-md text-center transition-all duration-500 ${
                selectedLocation === location
                  ? "bg-white text-[#181818] border border-[#181818] shadow-sm"
                  : "bg-[#f5f5f5] text-[#d6d6d6]"
              }`}
            >
              {location}
            </button>
          ))}
        </div>

        <div className="p-2 flex flex-wrap gap-2 max-h-[500px] overflow-auto">
          {viewTables.map((table) => (
            <button
              key={table.id}
              className="bg-[#f5f5f5] h-28 w-28 p-2 font-semibold flex flex-col justify-between active:border-2 active:border-[#f5f5f5f5]"
              onClick={() => handleSelectTable(table.id)}
              disabled={tableOccupiedIds.includes(table.id)}
            >
              <div
                className={`w-full text-[#181818] text-md flex flex-col ${
                  selectedTableIds.includes(table.id) ? "outline-green-500" : ""
                } ${
                  tableOccupiedIds.includes(table.id) ? "text-[#d6d6d6]" : ""
                }`}
              >
                {table.name}
              </div>
              {!tableOccupiedIds.includes(table.id) ? (
                <div className="bg-[#68948c] w-full h-5 text-[#f5f5f5] text-sm font-[400]">
                  Free
                </div>
              ) : (
                <div className="bg-[#9a78ad] w-full h-5 text-[#f5f5f5] text-sm font-[400]">
                  Occupied
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
