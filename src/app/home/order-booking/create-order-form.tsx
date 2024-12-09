/*
  Gọi API lấy thông tin user đang đăng nhập ở dòng 271
  Gọi API lấy danh sách bàn trống ở dòng 277
  Gọi API tạo order ở dòng 300
*/

import { default as ReactSelect, components } from "react-select";
import { Tooltip } from "react-tooltip";
import CreateCustomerForm from "./create-customer-form";
import { TableEntity } from "../order-taking/entity";
import { OrderEntity } from "./data";
import { useContext, useEffect, useState } from "react";
import { CustomerEntity } from "./data";
import { formatTimeToYYYYMMDDTHHMM } from "@/utils/timeUtils";
import { UserEntity } from "@/app/api-client/UserService";
import { loginUserContext } from "@/components/LoginUserProvider";

const DropdownIndicator = null;

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    padding: "0rem", // equivalent to Tailwind's p-2
    width: "15rem", // equivalent to Tailwind's w-60
    outline: "none",
    fontSize: "0.875rem", // equivalent to Tailwind's text-sm
    boxShadow: "none",
    "&:hover": {
      borderColor: "transparent", // Keeps the border color on hover as none
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#7ab5e6" : isFocused ? "#ebf8ff" : "white",
    color: isSelected ? "white" : "#2d3748",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ebf8ff",
      color: "#2d3748",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#b7b7b7",
    borderRadius: "12px",
    padding: "0.25rem", // Adds padding for multi-value items
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#2d3748",
    fontSize: "0.875rem", // Tailwind text-sm equivalent
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#2d3748",
    ":hover": {
      backgroundColor: "#e53e3e",
      color: "white",
    },
  }),
  menu: (styles) => ({
    ...styles,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  }),
  input: (styles) => ({
    ...styles,
    width: "15rem", // Tailwind w-60 equivalent
    margin: "0px",
    fontSize: "0.875rem", // Tailwind text-sm equivalent
  }),
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

// CheckinTime và CheckoutTime có thể sử dụng kiểu Date thay vì string
// tableIds có thể sử dụng kiểu number[] thay vì Set<number>
type CreateOrderRequest = {
  customerId: number;
  userId: number;
  checkInTime: Date;
  checkOutTime: Date;
  numberOfPeople: number;
  tableIds: number[];
  note?: string;
};

const sampleUsers: UserEntity = {
  id: 4,
  name: "Alexander Kiên Phạm",
  email: "alexander.kien.pham@example.com",
  phoneNumber: "321321321",
  gender: "Male",
  dateOfBirth: new Date("1993-03-03"),
  roleId: 4,
  cccd: "321321321",
  cvImg: "path/to/cvImg.jpg",
  position: "Bartender",
  salaryType: "Hourly",
  salaryPerHour: 18,
  salaryPerMonth: 0,
  role: {
    id: 5,
    name: "Receptionist",
    description: "Lễ tân",
  },
};

const sampleTables: TableEntity[] = [
  {
    id: 1,
    name: "Bàn 1",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 1",
    isActive: true,
  },
  {
    id: 2,
    name: "Bàn 2",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 2",
    isActive: true,
  },
  {
    id: 3,
    name: "Bàn 3",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 3",
    isActive: true,
  },
  {
    id: 4,
    name: "Bàn 4",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 1",
    isActive: true,
  },
  {
    id: 5,
    name: "Bàn 5",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 2",
    isActive: true,
  },
  {
    id: 6,
    name: "Bàn 6",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 3",
    isActive: true,
  },
  {
    id: 7,
    name: "Phòng VIP 1",
    capacity: 4,
    type: "NORMAL",
    location: "VIP 1",
    isActive: true,
  },
  {
    id: 8,
    name: "Phòng VIP 2",
    capacity: 4,
    type: "NORMAL",
    location: "VIP 2",
    isActive: true,
  },
  {
    id: 9,
    name: "Bàn 9",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 1",
    isActive: true,
  },
  {
    id: 10,
    name: "Bàn 10",
    capacity: 4,
    type: "NORMAL",
    location: "Tầng 2",
    isActive: true,
  },
];

export default function CreateOrderForm({
  setOrders,
  customers,
  setCustomers,
  setIsNewOrder,
}: {
  setOrders: React.Dispatch<React.SetStateAction<OrderEntity[]>>;
  customers: CustomerEntity[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerEntity[]>>;
  setIsNewOrder: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const loginUserId = useContext(loginUserContext).id;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );

  const [newOrder, setNewOrder] = useState<CreateOrderRequest>({
    customerId: loginUserId,
    userId: 1,
    checkInTime: startDate,
    checkOutTime: endDate,
    numberOfPeople: 1,
    tableIds: [],
    note: "",
  });

  const [selectedTables, setSelectedTables] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const [isNewCustomer, setIsNewCustomer] = useState(false);

  // customers search @.@ **********************************
  const [searchCustomer, setSearchCustomer] = useState("");

  const filterCustomer: CustomerEntity[] =
    searchCustomer.trim() === ""
      ? []
      : customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchCustomer.toLowerCase())
        );

  const customerOptions = filterCustomer.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const handleCustomerChange = (selectedOption) => {
    setNewOrder({
      ...newOrder,
      customerId: selectedOption ? selectedOption.value : null,
    });
  };
  //********************************************************

  const [loginUser, setLoginUser] = useState<UserEntity>(null);

  const [tables, setTables] = useState<TableEntity[]>([]);

  useEffect(() => {
    /* Gọi API lay thong tin user dang nhap */
    // getDetailUser(loginUserId)
    setLoginUser(sampleUsers);
  }, []);

  useEffect(() => {
    /* Gọi API lay danh sach ban trong */
    // getAllTablesAvailable(startDate.toISOString(), endDate.toISOString())
    setTables(sampleTables);
  }, [startDate, endDate]);

  const handleSelectedTablesChange = (selectedOptions) => {
    setSelectedTables(selectedOptions);

    setNewOrder((prev) => ({
      ...prev,
      tableIds: selectedOptions.map((option) => option.value),
    }));
  };

  useEffect(() => {
    setSelectedTables([]);
    setNewOrder((prev) => ({
      ...prev,
      tableIds: [],
    }));
  }, [startDate, endDate]);

  const handleCreateOrder = async () => {
    /* Gọi API tao order */
    // const newOrderEntity = await createOrder(newOrder)
    const newOrderEntity: OrderEntity = {
      id: 1000,
      customerId: newOrder.customerId,
      userId: newOrder.userId,
      orderStatus: "CONFIRMED",
      checkInTime: newOrder.checkInTime,
      checkOutTime: newOrder.checkOutTime,
      totalCost: 0,
      numberOfPeople: newOrder.numberOfPeople,
      note: newOrder.note,
      orderItems: [],
      orderTables: selectedTables.map((table) => ({
        id: 1,
        orderId: 1000,
        tableId: table.value,
        status: "CONFIRMED",
        table: tables.find((t) => t.id === table.value),
      })),
    };
    setOrders((prev) => [...prev, newOrderEntity]);
    setIsNewOrder(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form
          onSubmit={() => handleCreateOrder()}
          className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10"
        >
          <div className="text-xl font-bold mb-4">Thêm mới đặt bàn</div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <div className="w-28">Khách hàng</div>
              <div className="flex items-center border-b-2 text-sm  bg-none px-2">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1011 17a6 6 0 006-6z"
                  />
                </svg>
                <div className="w-[181.5px]">
                  <ReactSelect
                    options={customerOptions}
                    onChange={handleCustomerChange}
                    onInputChange={(inputValue) =>
                      setSearchCustomer(inputValue)
                    }
                    value={customerOptions.find(
                      (option) => option.value === newOrder.customerId
                    )}
                    isMulti={false}
                    placeholder="Tìm khách hàng"
                    noOptionsMessage={() =>
                      searchCustomer
                        ? "Không tìm thấy khách hàng"
                        : "Nhập để tìm kiếm"
                    }
                    components={{ DropdownIndicator }}
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "transparent", // No background color
                        borderColor: "transparent", // No border color
                        outline: "none", // No outline on focus
                        boxShadow: "none", // Remove default box shadow
                        width: "100%", // Adjust this width as needed
                        "&:hover": {
                          borderColor: "transparent", // Prevent border on hover
                        },
                      }),
                      menu: (base) => ({
                        ...base,
                        width: "100%", // Match the menu width
                      }),
                      option: (base) => ({
                        ...base,
                        width: "100%", // Match options to component width
                      }),
                    }}
                    required
                  />
                </div>

                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Tạo khách hàng mới"
                  onClick={() => setIsNewCustomer((prev) => !prev)}
                >
                  <Tooltip id="my-tooltip" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div> NV đặt bàn</div>
              <div className="w-60">
                <div className="bg-none border-b-2 text-sm  p-2 w-60">
                  {loginUser?.name}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-28">Mã đặt bàn</div>
              <div className="flex items-center  text-sm  bg-none   w-[243.5px] ">
                <input
                  className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black"
                  type="text"
                  placeholder="Mã tự động"
                  disabled
                />
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div> Phòng/bàn</div>
              <div className="w-60 border-b-2">
                <ReactSelect
                  options={tables.map((table) => ({
                    value: table.id,
                    label: table.name,
                  }))}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option,
                    DropdownIndicator,
                  }}
                  placeholder="Chọn phòng/bàn"
                  onChange={handleSelectedTablesChange}
                  value={selectedTables}
                  styles={customStyles}
                  noOptionsMessage={() => "Bàn/Phòng không có sẵn"}
                  required
                  // Hide dropdown list  when select any item
                  // closeMenuOnSelect={true}

                  //Selected Item Remove in dropdown list
                  // hideSelectedOptions={true}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-28">Giờ đến</div>
              <div className="flex items-center text-sm  bg-none  w-[243.5px]">
                <input
                  className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black"
                  type="datetime-local"
                  value={formatTimeToYYYYMMDDTHHMM(startDate)}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    setStartDate(selectedDate);
                    setNewOrder({
                      ...newOrder,
                      checkInTime: selectedDate,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <input
                className="bg-none border-b-2 focus:border-b-black text-sm   p-2  w-[329.95px] outline-none"
                placeholder="Ghi chú"
                value={newOrder.note}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, note: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="flex mt-4 gap-3 items-center">
            <div className="w-28"> Thời lượng (h)</div>
            <div className="flex items-center text-sm  bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full text-left outline-none border-b-2 focus:border-b-black"
                type="number"
                value={
                  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
                }
                onChange={(e) => {
                  const selectedDate = new Date(
                    startDate.getTime() +
                      Number(e.target.value) * 60 * 60 * 1000
                  );
                  setEndDate(selectedDate);
                  setNewOrder((prev) => ({
                    ...prev,
                    checkOutTime: selectedDate,
                  }));
                }}
                min={0.5}
                max={24}
                step={0.5}
                required
              />
            </div>
          </div>
          <div className="flex mt-4 gap-3 items-center">
            <div className="w-28"> Số khách</div>
            <div className="flex items-center text-sm  bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black"
                type="number"
                value={newOrder.numberOfPeople}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    numberOfPeople: Number(e.target.value),
                  })
                }
                min={1}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 items-center mt-4">
            <button
              type="submit"
              className="flex pl-2 items-center border rounded-md bg-black "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
              </svg>
              <div className="p-2 text-white  rounded right-0">Lưu</div>
            </button>
            <button
              className="p-2 rounded right-0"
              onClick={() => setIsNewOrder(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      {isNewCustomer && (
        <CreateCustomerForm
          customers={customers}
          setCustomers={setCustomers}
          setIsNewCustomer={setIsNewCustomer}
        />
      )}
    </>
  );
}
