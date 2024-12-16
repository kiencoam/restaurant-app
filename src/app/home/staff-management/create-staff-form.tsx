//Phải comment một số tsx input vì backend chưa có !
//Fix roleId, uncomment toggleNewStaff
import {
  createUser,
  CreateUserRequest,
  UserEntity,
} from "@/app/api-client/UserService";
import { useContext, useState } from "react";
import { GetStaffRequest } from "./page";
import { loginUserContext } from "@/components/LoginUserProvider";

type Props = {
  setStaffs: React.Dispatch<React.SetStateAction<UserEntity[]>>;
  toggleNewStaff: () => void;
  pageSize: number;
  setFilter: React.Dispatch<React.SetStateAction<GetStaffRequest>>;
};

const RoleEnum = {
  Admin: "ADMIN",
  Manager: "MANAGER",
  Waiter: "WAITER",
  Chef: "CHEF",
  Cashier: "CASHIER",
};

// Đối tượng ánh xạ bản dịch (hiển thị cho người dùng)
const RoleDisplay = {
  ADMIN: "Quản trị viên",
  MANAGER: "Quản lý",
  WAITER: "Phục vụ",
  CHEF: "Đầu bếp",
  CASHIER: "Thu ngân",
};

const RoleIdDisplay = {
  ADMIN: 1,
  MANAGER: 3,
  WAITER: 4,
  CHEF: 2,
  CASHIER: 5,
};

export default function CreateStaffForm({
  toggleNewStaff,
  setStaffs,
  pageSize,
  setFilter,
}: Props) {
  const [isCharsVisible, changeCharsVisibility] = useState(false);

  let role = useContext(loginUserContext).role;
  // //tạm thời
  // role = "ADMIN";

  const toggleCharsVisibility = () => {
    changeCharsVisibility(!isCharsVisible);
  };

  const [newStaff, setNewStaff] = useState<CreateUserRequest>({
    id: 0,
    email: "",
    password: undefined,
    name: undefined,
    phoneNumber: "",
    gender: "MALE",
    dateOfBirth: "",
    roleId: 4,
    cccd: "",
    cvImg: "",
    position: "WAITER",
    salaryType: "DAILY",
    salaryPerHour: 0,
    salaryPerMonth: 0,
  });

  function convertDateToISOFormat(input: string): string {
    const [day, month, year] = input.split("/");

    // Đảm bảo rằng tháng và ngày đều có 2 chữ số
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const handleNewStaffChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    let newValue = e.target.value;
    setNewStaff({
      ...newStaff,
      [field]: newValue,
    });
  };

  //lỗi khi lưu bị refresh lại và có lỗi
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    const finalNewStaff = {
      ...newStaff,
      dateOfBirth: convertDateToISOFormat(newStaff.dateOfBirth),
      roleId: RoleIdDisplay[newStaff.position],
    };
    console.log("Payload sent to API:", finalNewStaff);
    console.log("Staff create");
    try {
      createUser(finalNewStaff).then((res) => {
        // res.status = StaffStatusEnum.Active;
        console.log("Staff created:", res);
        setFilter((prev) => ({ ...prev })); // Kích hoạt useEffect
        toggleNewStaff();
      });
    } catch (error) {
      console.log("Error creating staff:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-4">Thêm nhân viên</div>
        <form className="space-y-4" onSubmit={(e) => handleCreateStaff(e)}>
          {/* Hàng 1: Mã nhân viên và Tên nhân viên */}
          <div className="flex space-x-4">
            <label className="w-1/2">
              Mã nhân viên
              <input
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                disabled
                placeholder="Mã nhân viên tự động"
              />
            </label>
            <label className="w-1/2">
              Tên nhân viên
              <input
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.name}
                onChange={(e) => handleNewStaffChange(e, "name")}
                placeholder="Nguyễn Văn A"
                required
              />
            </label>
          </div>

          {/* Hàng 2: Mật khẩu và Email */}
          <div className="flex space-x-4">
            <label className="w-1/2">
              Email
              <input
                type="email"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.email}
                onChange={(e) => handleNewStaffChange(e, "email")}
                placeholder="abc@gmail.com"
                required
              />
            </label>
            <label className="w-1/2">
              Mật khẩu
              <div className="flex">
                <input
                  type={isCharsVisible ? "text" : "password"}
                  className="w-full border-b-2 bg-[#f7fafc] mt-2 outline-none"
                  value={newStaff.password}
                  onChange={(e) => handleNewStaffChange(e, "password")}
                  required
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  className="border-b-2"
                  onClick={toggleCharsVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                </button>
              </div>
            </label>
          </div>

          {/* Hàng 3: Điện thoại và Ngày sinh */}
          <div className="flex space-x-4">
            <label className="w-1/2">
              Điện thoại
              <input
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.phoneNumber}
                onChange={(e) => handleNewStaffChange(e, "phoneNumber")}
                placeholder="0987654321"
                pattern="[0-9]{10}"
              />
            </label>
            <label className="w-1/2">
              Ngày sinh
              <input
                placeholder="dd/mm/yyyy"
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.dateOfBirth}
                onChange={(e) => handleNewStaffChange(e, "dateOfBirth")}
                pattern="(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}"
              />
            </label>
          </div>

          {/* Hàng 4: CCCD và Giới tính */}
          <div className="flex space-x-4">
            <label className="w-1/2">
              CCCD
              <input
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.cccd}
                onChange={(e) => handleNewStaffChange(e, "cccd")}
                placeholder="001xxxxxxxxx"
                pattern="001[0-9]{9}"
                required
              />
            </label>
            <label className="w-1/2">
              Giới tính
              <select
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.gender}
                onChange={(e) => handleNewStaffChange(e, "gender")}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
              </select>
            </label>
          </div>

          {/* Hàng 5: Vị trí và Địa chỉ */}
          <div className="flex space-x-4">
            <label className="w-1/2">
              Vị trí
              <select
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.position}
                onChange={(e) => handleNewStaffChange(e, "position")}
              >
                {Object.entries(RoleEnum).map(
                  ([key, value]) =>
                    ((role === "MANAGER" &&
                      value !== "ADMIN" &&
                      value !== "MANAGER") ||
                      role === "ADMIN") && (
                      <option key={value} value={value}>
                        {RoleDisplay[value]}
                      </option>
                    )
                )}
              </select>
            </label>
            <label className="w-1/2">
              Địa chỉ
              <input
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                // value={newStaff.address}
                onChange={(e) => handleNewStaffChange(e, "address")}
                placeholder="Địa chỉ"
              />
            </label>
          </div>

          {/* Hàng 6: Trạng thái và Loại lương */}
          <div className="flex space-x-4">
            <label className="w-1/2">
              Trạng thái
              <select
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                onChange={(e) => handleNewStaffChange(e, "status")}
                // value={newStaff.status || "IN"}
              >
                <option value="IN">Đang làm việc</option>
                <option value="OUT">Đã nghỉ</option>
              </select>
            </label>
            <label className="w-1/2">
              Loại lương
              <select
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                value={newStaff.salaryType}
                onChange={(e) => handleNewStaffChange(e, "salaryType")}
                required
              >
                <option value="HOURLY">Theo giờ</option>
                <option value="DAILY">Theo tháng</option>
              </select>
            </label>
          </div>

          {/* Hàng 7: Lương theo giờ và Lương theo tháng */}
          <div className="flex space-x-4">
            {newStaff.salaryType === "HOURLY" ? (
              <label className="w-1/2">
                Lương theo giờ
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                  value={newStaff.salaryPerHour}
                  onChange={(e) => handleNewStaffChange(e, "salaryPerHour")}
                  required
                />
              </label>
            ) : (
              <label className="w-1/2">
                Lương theo tháng
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                  value={newStaff.salaryPerMonth}
                  onChange={(e) => handleNewStaffChange(e, "salaryPerMonth")}
                  required
                />
              </label>
            )}
            <label className="w-1/2">
              Ghi chú
              <input
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black resize-none"
                onChange={(e) => handleNewStaffChange(e, "note")}
                placeholder="Nhập ghi chú"
              />
            </label>
          </div>
          {/* Nút Lưu và Hủy */}
          <div className="flex justify-end gap-4 items-center mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
              </svg>
              Lưu
            </button>

            {/* Hủy */}
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
              onClick={toggleNewStaff}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
