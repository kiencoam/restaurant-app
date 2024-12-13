import { Tooltip } from "react-tooltip";
import { OrderEntity } from "../order-taking/entity";
import { formatDateToString } from "@/utils/timeUtils";

const mapOrderStatus = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "Đã đặt bàn";
    case "CHECKED_IN":
      return "Đã nhận bàn";
    case "ABANDONED":
      return "Đến muộn";
    case "CANCELLED":
      return "Đã hủy";
    case "COMPLETED":
      return "Đã thanh toán";
    default:
      return "Không xác định";
  }
};

export default function OrderList({
  orders,
  checkedOrders,
  handleCheck,
  handleCheckAll,
  handleUpdateStatus,
}: {
  orders: OrderEntity[];
  checkedOrders: OrderEntity[];
  handleCheck: (order: OrderEntity, check: boolean) => void;
  handleCheckAll: (check: boolean) => void;
  handleUpdateStatus: (order: OrderEntity, status: string) => void;
}) {
  return (
    <table className="min-w-full bg-white border border-gray-200 mt-6">
      <thead>
        <tr className="bg-[#f7fafc]">
          <th className="px-4 py-2 border-b text-left">
            <input
              type="checkbox"
              checked={checkedOrders.length === orders.length}
              onChange={(e) => handleCheckAll(e.target.checked)}
            />
          </th>
          <th className="px-4 py-2 border-b text-left">Mã đặt bàn</th>
          <th className="px-4 py-2 border-b text-left">Giờ đến</th>
          <th className="px-4 py-2 border-b text-left">Khách hàng</th>
          <th className="px-4 py-2 border-b text-left">Điện thoại</th>
          <th className="px-4 py-2 border-b text-left">Số khách</th>
          <th className="px-4 py-2 border-b text-left">Phòng/bàn</th>
          <th className="px-4 py-2 border-b text-left">Trạng thái</th>
          <th className="px-4 py-2 border-b text-left">Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="group hover:bg-gray-50">
            <td className="px-4 py-2 border-b">
              <input
                type="checkbox"
                checked={checkedOrders.map((ord) => ord.id).includes(order.id)}
                onChange={(e) => handleCheck(order, e.target.checked)}
              />
            </td>
            <td className="px-4 py-2 border-b text-blue-600">
              <div>{order.id}</div>
            </td>
            <td className="px-4 py-2 border-b">
              {formatDateToString(new Date(order.checkInTime))}
            </td>
            <td className="px-4 py-2 border-b max-w-[142px] truncate">
              {order.customer.name}
            </td>
            <td className="px-4 py-2 border-b">{order.customer.phoneNumber}</td>
            <td className="px-4 py-2 border-b">{order.numberOfPeople}</td>
            <td className="px-4 py-2 border-b max-w-[120px] truncate">
              {order.orderTables.map((orderTable) => (
                <span key={orderTable.id} className="mr-1">
                  {orderTable.table?.name}
                </span>
              ))}
            </td>
            <td className="px-4 py-2 border-b">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-semibold rounded ${
                  order.orderStatus === "CHECKED_IN"
                    ? "bg-green-100 text-green-600"
                    : order.orderStatus === "CONFIRMED"
                    ? "bg-yellow-100 text-yellow-600"
                    : order.orderStatus === "COMPLETED"
                    ? "bg-blue-100 text-blue-600"
                    : order.orderStatus === "CANCELLED"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    order.orderStatus === "CHECKED_IN"
                      ? "bg-green-600"
                      : order.orderStatus === "CONFIRMED"
                      ? "bg-yellow-600"
                      : order.orderStatus === "COMPLETE"
                      ? "bg-blue-600"
                      : order.orderStatus === "CANCELLED"
                      ? "bg-red-600"
                      : "bg-gray-600"
                  }`}
                ></span>
                {mapOrderStatus(order.orderStatus)}
              </span>
            </td>
            <td className="px-4 py-2 border-b w-[120px]">
              <span className="group-hover:hidden">{order.note}</span>

              <div className="hidden group-hover:flex items-center justify-center gap-4">
                <button
                  type="button"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Nhận bàn"
                  onClick={() => handleUpdateStatus(order, "CHECKED_IN")}
                  disabled={
                    order.orderStatus !== "CONFIRMED" &&
                    order.orderStatus !== "ABANDONED"
                  }
                >
                  <Tooltip id="my-tooltip" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                      order.orderStatus === "CONFIRMED" ||
                      order.orderStatus === "ABANDONED"
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </button>
                {/* <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Nhận gọi món"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
                  </svg>
                </button> */}
                <button
                  type="button"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Hủy đặt"
                  onClick={() => handleUpdateStatus(order, "CANCELLED")}
                  disabled={
                    order.orderStatus !== "CONFIRMED" &&
                    order.orderStatus !== "ABANDONED"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                      order.orderStatus === "CONFIRMED" ||
                      order.orderStatus === "ABANDONED"
                        ? "text-red-500"
                        : "text-gray-300"
                    }
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6.5" />
                    <path d="M16 3v4" />
                    <path d="M8 3v4" />
                    <path d="M4 11h16" />
                    <path d="M22 22l-5 -5" />
                    <path d="M17 22l5 -5" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
