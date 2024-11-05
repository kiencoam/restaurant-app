import { default as ReactSelect, components } from "react-select";
import { Tooltip } from "react-tooltip";
import CreateCustomerForm from "./create-customer-form";

export default function CreateOrderForm({ searchCustomer, setSearchCustomer, filterCustomer, setNewOrder, newOrder, tableOptions, handleSecondSelectChange, secondSelectValue, customStyles, noOptionsMessage, toggleNewReservation, isNewCustomer, setIsNewCustomer, newCustomer, setNewCustomer, toggleNewCustomer }) {
    const DropdownIndicator = null;

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


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
                <div className="text-xl font-bold mb-4">Thêm mới đặt bàn</div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-28">Khách hàng</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm">
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
                            <div className="flex flex-col">
                                <input
                                    className="p-2 bg-transparent outline-none"
                                    type="text"
                                    placeholder="Tìm khách hàng"
                                    value={searchCustomer}
                                    onChange={(e) => setSearchCustomer(e.target.value)}
                                // Can them mot ham de khi dien, neu tim thay thi mot menu hien xuong, khong nhap gi thi khong hien gi
                                //neu co nhap, khong tim thay thi hien khong thay
                                //con lai thi hien het cac ket qua
                                />
                                {filterCustomer.length > 0 && (
                                    <ul>
                                        {filterCustomer.map((customer) => (
                                            <li
                                                onClick={(e) =>
                                                    setNewOrder({
                                                        ...newOrder,
                                                        customerId: customer.id,
                                                    })
                                                }
                                                key={customer.id}
                                            >
                                                {customer.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Tạo khách hàng mới"
                                onClick={() => setIsNewCustomer(!isNewCustomer)}
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
                            {isNewCustomer &&
                                <CreateCustomerForm
                                    newCustomer={newCustomer}
                                    setNewCustomer={setNewCustomer}
                                    toggleNewCustomer={toggleNewCustomer}
                                />}
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div> NV đặt bàn</div>
                        <div className="w-60">
                            <form className=" mx-auto">
                                <select
                                    id="staff"
                                    className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-60 outline-none"
                                >
                                    <option defaultChecked>Chọn nhân viên</option>
                                    <option value="Hoàng - Kinh doanh">
                                        Hoàng - Kinh doanh
                                    </option>
                                    <option value="Hương - Kế toán">
                                        Hương - Kế toán
                                    </option>
                                    <option value="Thế Anh - Chủ tịch">
                                        Thế Anh - Chủ tịch
                                    </option>
                                </select>
                            </form>{" "}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <div className="w-28">Mã đặt bàn</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                placeholder="Mã tự động"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div> Phòng/bàn</div>
                        <div className="w-60">
                            <ReactSelect
                                options={tableOptions}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option,
                                    DropdownIndicator,
                                }}
                                placeholder="Chọn phòng/bàn"
                                onChange={handleSecondSelectChange}
                                value={secondSelectValue}
                                styles={customStyles}
                                noOptionsMessage={noOptionsMessage}
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
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                placeholder="dd/mm/yyyy hh:mm"
                                value={newOrder.checkInTime}
                                onChange={(e) =>
                                    setNewOrder({
                                        ...newOrder,
                                        checkInTime: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-[329.95px] outline-none"
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
                    <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                        <input
                            className="p-2 bg-transparent w-full text-left outline-none"
                            type="text"
                            onChange={(e) =>
                                setNewOrder({ ...newOrder, checkOutTime: null })
                            }
                        />
                    </div>
                </div>
                <div className="flex mt-4 gap-3 items-center">
                    <div className="w-28"> Số khách</div>
                    <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                        <input
                            className="p-2 bg-transparent w-full outline-none"
                            type="text"
                            onChange={(e) => setNewOrder({ ...newOrder, numberOfPeople: Number.parseInt(e.target.value) })}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 items-center mt-4">
                    <button
                        className="flex pl-2 items-center border rounded-md bg-black "
                        onClick={toggleNewReservation}
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
                        onClick={toggleNewReservation}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}