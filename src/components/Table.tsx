'use client';

import { useState } from "react";

const rooms = [
  {
    name: "Tầng 1",
  },
  {
    name: "Tầng 2",
  },
  {
    name: "VIP 1"
  },
  {
    name: "VIP 2"
  },
];

const tables: TableEntity[] = [
  {
    id: 1,
    name: "T-1",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 1",
    isActive: true,
  },
  {
    id: 2,
    name: "T-2",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 2",
    isActive: true,
  },
  {
    id: 3,
    name: "T-3",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 3",
    isActive: true,
  },
  {
    id: 4,
    name: "T-4",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 1",
    isActive: true,
  },
  {
    id: 5,
    name: "T-5",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 2",
    isActive: true,
  },
  {
    id: 6,
    name: "T-6",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 3",
    isActive: true,
  },
  {
    id: 7,
    name: "T-7",
    capacity: 4,
    type: "NORMAL",
    location: "VIP 1",
    isActive: true,
  },
  {
    id: 8,
    name: "T-8",
    capacity: 4,
    type: "NORMAL",
    location: "VIP 2",
    isActive: true,
  },
  {
    id: 9,
    name: "T-9",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 1",
    isActive: true,
  },
  {
    id: 10,
    name: "T-10",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 2",
    isActive: true,
  }
]



export function Table({ tableOccupiedIds, selectedTableIds, handleSelectTable }: {
  tableOccupiedIds: number[];
  selectedTableIds: number[];
  handleSelectTable: (tableId: number) => void;
}) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section className="py-2">
      <div className="flex flex-col gap-y-2 py-2 h-full w-full">
        <div className="p-1 flex flex-wrap items-center gap-2 font-bold text-sm">
          <button
            onClick={() => setSelectedRoom(null)}
            className={`outline-none w-28 p-2 rounded-md text-center transition-all duration-500 ${selectedRoom === null
              ? "bg-white text-[#181818] border border-[#181818] shadow-sm"
              : "bg-[#f5f5f5] text-[#d6d6d6]"
              }`}
          >
            Tất cả
          </button>
          {rooms.map((room) => (
            <button
              key={room.name}
              onClick={() => setSelectedRoom(room.name)}
              className={`outline-none w-28 p-2 rounded-md text-center transition-all duration-500 ${selectedRoom === room.name
                ? "bg-white text-[#181818] border border-[#181818] shadow-sm"
                : "bg-[#f5f5f5] text-[#d6d6d6]"
                }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        <div className="p-2 flex flex-wrap gap-2 max-h-[500px] overflow-auto">
          {tables
            .filter((table) =>
              selectedRoom === null ? true : table.location === selectedRoom
            )
            .map((table) => (
              <button
                key={table.id}
                className="bg-[#f5f5f5] h-28 w-28 p-2 font-semibold flex flex-col justify-between active:border-2 active:border-[#f5f5f5f5]"
                onClick={() => handleSelectTable(table.id)}
              >
                <div className="w-full text-[#181818] text-md flex flex-col">
                  {table.name}
                  {selectedTableIds.includes(table.id) &&
                    (<div className="py-2 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                    </svg>
                    </div>)}
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
