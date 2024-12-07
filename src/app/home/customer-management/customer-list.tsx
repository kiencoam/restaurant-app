import { CustomerEntity, updateCustomer, UpdateCustomerRequest } from "@/app/api-client/CustomerService";
import { PageInfo } from "@/app/api-client/PageInfo";
import { formatDateTime } from "@/utils/timeUtils";
import React, { useState } from "react";

type Props = {
  customers: CustomerEntity[];
  pageInfo: PageInfo;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerEntity[]>>;
  masterChecked: boolean;
  checkedRows: Record<number, boolean>;
  handleMasterCheckboxChange: () => void;
  handleRowCheckboxChange: (id: number) => void;
  handleRowClick: (id: number) => void;
  expandedRow: number | null;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageNumberChange: (page: number) => void;
}

export default function CustomerList({
  customers,
  pageInfo,
  setCustomers,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
  handlePageSizeChange,
  handlePageNumberChange
}: Props) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;

  // Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pageInfo.totalPage) {
      setCurrentPage(newPage);
      handlePageNumberChange(newPage - 1);
    }
  };

  //Handle rowsPerPage change
  const changeRowsPerPage = (pageSize) => {
    setRowsPerPage(pageSize);
    handlePageSizeChange(pageSize);
  };

  const getGender = (s: string): string => {
    if (s === 'FEMALE') {
      return 'Nữ';
    } else if (s === 'MALE') {
      return 'Nam';
    }
  }

  const handleSaveCusomter = (id: number) => {
    const selectedCustomer = customers.find((customer) => customer.id === id);

    if (selectedCustomer) {
      const updatedCustomer: UpdateCustomerRequest = {
        name: selectedCustomer.name,
        phoneNumber: selectedCustomer.phoneNumber,
        email: selectedCustomer.email,
        address: selectedCustomer.address,
        dob: selectedCustomer.dob,
        gender: selectedCustomer.gender
      };

      try {
        updateCustomer(id, updatedCustomer).then((res) => {
          const newCustomers = customers.map((customer) => {
            if (customer.id === id) {
              return res;
            } else {
              return customer;
            }
          });

          setCustomers(newCustomers);
        })
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateCustomer = (e, id: number, field: string) => {
    const newCustomers = customers.map((customer) => {
      if (customer.id === id) {
        return {
          ...customer,
          [field]: e.target.value,
        }
      } else {
        return customer;
      }
    })

    setCustomers(newCustomers);
  }

    return (
      <div>
        <table className="min-w-full bg-white border border-gray-200 mt-6">
          <thead>
            <tr className="bg-[#f7fafc] border-b-2">
              <th className="px-4 py-2 border-b text-left">
                <input
                  type="checkbox"
                  checked={masterChecked}
                  onChange={handleMasterCheckboxChange}
                />
              </th>
              <th className="px-4 py-2 border-b text-left">Mã khách hàng</th>
              <th className="px-4 py-2 border-b text-left">Tên khách hàng</th>
              <th className="px-4 py-2 border-b text-left">Điện thoại</th>
              <th className="px-4 py-2 border-b text-left">Tổng bán</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <React.Fragment key={customer.id}>
                <tr
                  key={customer.id}
                  className={`hover:bg-gray-100 border-b-2 cursor-pointer ${checkedRows[customer.id] ? "bg-gray-100" : ""
                    }`}
                  onClick={(e) => {
                    const target = e.target as HTMLElement; // Cast to HTMLElement

                    // Ignore click on checkboxes and action buttons
                    if (
                      (target instanceof HTMLInputElement &&
                        target.type === "checkbox") ||
                      target.tagName.toLowerCase() === "button" ||
                      target.closest("button")
                    ) {
                      return;
                    }
                    handleRowClick(customer.id); // Expand or collapse row
                  }}
                >
                  <td className="px-4 py-2 border-b">
                    <input
                      type="checkbox"
                      checked={!!checkedRows[customer.id]}
                      onChange={() => handleRowCheckboxChange(customer.id)}
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-blue-600">
                    <button>{customer.id}</button>
                  </td>
                  <td className="px-4 py-2 border-b">{customer.name}</td>
                  <td className="px-4 py-2 border-b">{customer.phoneNumber}</td>
                  <td className="px-4 py-2 border-b">{customer.totalCost}</td>
                </tr>
                {expandedRow === customer.id && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 p-4">
                      {/* Detailed information and editable fields */}
                      <div className="space-y-4">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Mã khách hàng:
                            <input
                              type="text"
                              value={customer.id}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              disabled
                            />
                          </label>
                          <label className="w-64">
                            Email:
                            <input
                              type="text"
                              value={customer.email}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              onChange={(e) => handleUpdateCustomer(e, customer.id, 'email')}
                            />
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Tên khách hàng
                              <input
                                type="text"
                                value={customer.name}
                                className="w-full border-b-2 bg-gray-50 mt-2"
                                onChange={(e) => handleUpdateCustomer(e, customer.id, 'name')}
                              />
                            </label>
                            <label className="w-64">
                              Điện thoại
                              <input
                                type="text"
                                value={customer.phoneNumber}
                                className="w-full border-b-2 bg-gray-50 mt-2"
                                onChange={(e) => handleUpdateCustomer(e, customer.id, 'phoneNumber')}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Ngày sinh
                              <input
                                type="text"
                                value={customer.dob}
                                className="w-full border-b-2 bg-gray-50 mt-2"
                                onChange={(e) => handleUpdateCustomer(e, customer.id, 'dob')}
                              />
                            </label>
                            <label className="w-64">
                              Địa chỉ
                              <input
                                type="text"
                                value={customer.address}
                                className="w-full border-b-2 bg-gray-50 mt-2"
                                onChange={(e) => handleUpdateCustomer(e, customer.id, 'address')}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Giới tính
                              <input
                                type="text"
                                value={getGender(customer.gender)}
                                className="w-full border-b-2 bg-gray-50 mt-2"
                                onChange={(e) => handleUpdateCustomer(e, customer.id, 'note')}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveCusomter(customer.id)}
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => handleRowClick(customer.id)}
                              className="border rounded-md px-2 shadow-sm"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                        {/* Add other editable fields as needed */}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex">
            <div>Số bản ghi: </div>
            <select
              className="bg-[#f7f7f7] outline-none"
              value={rowsPerPage}
              onChange={(e) => changeRowsPerPage(Number(e.target.value))}
            >
              <option defaultValue={rowsPerPage}>{rowsPerPage}</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
            <span>
              Page {currentPage} of {pageInfo.totalPage}
            </span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === pageInfo.totalPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
}
