import { formatDateTime } from "@/utils/timeUtils";

const mapOrderStatus = (status: string) => {
    switch (status) {
        case "CONFIRMED":
            return "Đã xếp bàn";
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
    initOrders,
    customers,
    tables,
    masterChecked,
    checkedRows,
    handleMasterCheckboxChange,
    handleRowCheckboxChange,
    setHoveredRow,
    hoveredRow
}) {
    return (
        <table className="min-w-full bg-white border border-gray-200 mt-6">
            <thead>
                <tr className="bg-blue-100">
                    <th className="px-4 py-2 border-b text-left">
                        <input
                            type="checkbox"
                            checked={masterChecked}
                            onChange={handleMasterCheckboxChange}
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
                {initOrders.map((order, index) => (
                    <tr
                        key={order.id}
                        className="hover:bg-gray-50"
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}

                    >
                        <td className="px-4 py-2 border-b">
                            <input
                                type="checkbox"
                                checked={!!checkedRows[index]}
                                onChange={() => handleRowCheckboxChange(index)}
                            />
                        </td>
                        <td className="px-4 py-2 border-b text-blue-600">
                            <button>{order.id}</button>
                        </td>
                        <td className="px-4 py-2 border-b">
                            {formatDateTime(order.checkInTime)}
                        </td>
                        <td className="px-4 py-2 border-b">
                            {customers.find((c) => c.id === order.customerId).name}
                        </td>
                        <td className="px-4 py-2 border-b">
                            {customers.find((c) => c.id === order.customerId).phoneNumber}
                        </td>
                        <td className="px-4 py-2 border-b">{order.numberOfPeople}</td>
                        <td className="px-4 py-2 border-b">
                            {tables.find((t) => t.id === order.orderTables[0].id).name}
                        </td>
                        <td className="px-4 py-2 border-b">
                            <span
                                className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-semibold rounded ${order.orderStatus === "CONFIRMED"
                                    ? "bg-green-100 text-green-600"
                                    : order.orderStatus === "CHECKED_IN"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : order.orderStatus === "COMPLETED"
                                            ? "bg-blue-100 text-blue-600"
                                            : order.orderStatus === "CANCELLED"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${order.orderStatus === "CONFIRMED"
                                        ? "bg-green-600"
                                        : order.orderStatus === "CHECKED_IN"
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
                        <td className="px-4 py-2 border-b ">
                            {/* Show note only if not hovered */}
                            {hoveredRow === null ? (
                                <span>{order.note}</span>
                            ) : null}
                            {/* Buttons shown only on hover */}
                            {hoveredRow === index && (
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Nhận bàn"
                                    >
                                        {/* Tooltip Component */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#000000"
                                        >
                                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                                        </svg>
                                    </button>
                                    <button
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Nhận gọi món"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#000000"
                                        >
                                            <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
                                        </svg>
                                    </button>
                                    <button
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Hủy đặt"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#000000"
                                        >
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}