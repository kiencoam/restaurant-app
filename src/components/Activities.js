import { useRef } from "react";

const activities = [
  {
    id: 1,
    event: "Quoc Co vừa bán đơn hàng với giá trị 305,000₫",
    time: "16:29",
  },
  {
    id: 2,
    event: "Quoc Nghiep vừa bán đơn hàng với giá trị 30,000₫",
    time: "16:50",
  },
  {
    id: 3,
    event: "Gordon Ramsey vừa làm vỡ 3 cái bát trị giá 3,000,000₫",
    time: "17:29",
  },
];

export function Activities() {
  const activitiesRef = useRef(null);

  return (
    <div
      ref={activitiesRef}
      className="absolute rounded-lg shadow-md p-3 w-80 min-h-[200px] max-h-[400px] overflow-auto top-12 -left-40 bg-white"
    >
      {activities.map((activity) => (
        <div key={activity.id} className="border-b m-2">
          <div className="font-semibold">{activity.event}</div>
          <div className="text-[#999999] text-md font-flux">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
}
