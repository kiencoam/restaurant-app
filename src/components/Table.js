import { useState } from "react";

const rooms = [
  {
    id: 1,
    name: "Tầng 1",
  },
  {
    id: 2,
    name: "Tầng 2",
  },
  { id: 3, name: "VIP 01" },
  { id: 4, name: "VIP 02" },
];

const tables = [
  {
    id: 1,
    name: "T-1",
    room_id: 1,
    status: "Free",
  },
  {
    id: 2,
    name: "T-2",
    room_id: 1,
    status: "Free",
  },
  {
    id: 3,
    name: "T-3",
    room_id: 2,
    status: "Free",
  },
  {
    id: 4,
    name: "WT-1",
    room_id: 3,
    status: "Occupied",
  },
  {
    id: 5,
    name: "WT-2",
    room_id: 3,
    status: "Free",
  },
  {
    id: 6,
    name: "VT-1",
    room_id: 4,
    status: "Free",
  },
];

export function Table() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section className="py-2">
      <div className="flex flex-col gap-y-2 py-2 h-full w-full">
        <div className="p-1 flex flex-wrap items-center gap-2 font-bold text-sm">
          <button
            onClick={() => setSelectedRoom(null)}
            className={`outline-none w-28 p-2 rounded-md text-center transition-all duration-500 ${
              selectedRoom === null
                ? "bg-white text-[#181818] border border-[#181818] shadow-sm"
                : "bg-[#f5f5f5] text-[#d6d6d6]"
            }`}
          >
            Tất cả
          </button>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`outline-none w-28 p-2 rounded-md text-center transition-all duration-500 ${
                selectedRoom === room.id
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
              selectedRoom === null ? true : table.room_id === selectedRoom
            )
            .map((table) => (
              <button
                key={table.id}
                className="bg-[#f5f5f5] h-28 w-28 p-2 font-semibold flex flex-col justify-between active:border-2 active:border-[#f5f5f5f5]"
              >
                <div className="w-full text-[#181818] text-md">
                  {table.name}
                </div>
                {table.status === "Free" ? (
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
