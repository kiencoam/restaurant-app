export default function CreateCustomerForm({ setNewCustomer, newCustomer, toggleNewCustomer }) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
                <div className="text-xl font-bold mb-4">
                    Thêm khách hàng
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-28">Mã khách hàng</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                placeholder="Mã mặc định"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>Điện thoại</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                placeholder="Ví dụ: 0912345678"
                                onChange={(e) =>
                                    setNewCustomer({
                                        ...newCustomer,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <div className="w-28">Tên khách hàng</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                onChange={(e) =>
                                    setNewCustomer({
                                        ...newCustomer,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>Email</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                placeholder="qwe@gmail.com"
                                onChange={(e) =>
                                    setNewCustomer({
                                        ...newCustomer,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <div className="w-28">Ngày sinh</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                                placeholder="dd/mm/yyyy"
                                onChange={(e) =>
                                    setNewCustomer({
                                        ...newCustomer,
                                        dob: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>Ghi chú</div>
                        <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                            <input
                                className="p-2 bg-transparent w-full outline-none"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 items-center mt-4">
                    <button
                        className="flex pl-2 items-center border rounded-md bg-black "
                        onClick={toggleNewCustomer}
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
                        <div className="p-2 text-white  rounded right-0">
                            Lưu
                        </div>
                    </button>
                    <button
                        className="p-2 rounded right-0"
                        onClick={toggleNewCustomer}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}