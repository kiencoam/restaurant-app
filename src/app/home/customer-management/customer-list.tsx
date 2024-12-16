import {
  CustomerEntity,
  updateCustomer,
  UpdateCustomerRequest,
} from "@/app/api-client/CustomerService";
import { PageInfo } from "@/app/api-client/PageInfo";
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
};

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
  handlePageNumberChange,
}: Props) {
  // Pagination state
  //Handle rowsPerPage change
  

  const getGender = (s: string): string => {
    if (s === "FEMALE") {
      return "Nữ";
    } else if (s === "MALE") {
      return "Nam";
    }
  };

  const handleSaveCusomter = (id: number) => {
    const selectedCustomer = customers.find((customer) => customer.id === id);

    if (selectedCustomer) {
      const updatedCustomer: UpdateCustomerRequest = {
        name: selectedCustomer.name,
        phoneNumber: selectedCustomer.phoneNumber,
        email: selectedCustomer.email,
        address: selectedCustomer.address,
        dob: selectedCustomer.dob,
        gender: selectedCustomer.gender,
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
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateCustomer = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number,
    field: string
  ) => {
    const newCustomers = customers.map((customer) => {
      if (customer.id === id) {
        return {
          ...customer,
          [field]: e.target.value,
        };
      } else {
        return customer;
      }
    });

    setCustomers(newCustomers);
  };

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
                className={`hover:bg-gray-100 border-b-2 cursor-pointer ${
                  checkedRows[customer.id] ? "bg-gray-100" : ""
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
                <td className="px-4 py-2 border-b">
                  {Number(customer.totalCost).toLocaleString("en-US")}
                </td>
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
                            onChange={(e) =>
                              handleUpdateCustomer(e, customer.id, "email")
                            }
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
                              onChange={(e) =>
                                handleUpdateCustomer(e, customer.id, "name")
                              }
                            />
                          </label>
                          <label className="w-64">
                            Điện thoại
                            <input
                              type="text"
                              value={customer.phoneNumber}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              onChange={(e) =>
                                handleUpdateCustomer(
                                  e,
                                  customer.id,
                                  "phoneNumber"
                                )
                              }
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
                              onChange={(e) =>
                                handleUpdateCustomer(e, customer.id, "dob")
                              }
                            />
                          </label>
                          <label className="w-64">
                            Địa chỉ
                            <input
                              type="text"
                              value={customer.address}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              onChange={(e) =>
                                handleUpdateCustomer(e, customer.id, "address")
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Giới tính
                            <select
                              value={customer.gender}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              onChange={(e) =>
                                handleUpdateCustomer(e, customer.id, "gender")
                              }
                            >
                              <option value="MALE">Nam</option>
                              <option value="FEMALE">Nữ</option>
                            </select>
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
    </div>
  );
}
