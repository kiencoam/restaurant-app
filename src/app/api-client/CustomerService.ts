import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/customers";

export type CustomerEntity = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  dob: string;
  gender: string;
  totalCost: number;
};

export type CreateCustomerRequest = {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  dob: string;
  gender: string;
};

export type UpdateCustomerRequest = {
  name?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  dob?: string;
  gender?: string;
};



export const getDetailCustomer = async (id: number): Promise<CustomerEntity> => {
  return await apiClientService.get(`${baseUrl}/${id}`).then(res => res.data);
}

export const getAllCustomers = async (query: string) => {
  return await apiClientService.get(`${baseUrl}?${query}`).then(res => res.data);
}

export const createCustomer= async (payload: CreateCustomerRequest ): Promise<CustomerEntity> => {
  return await apiClientService.post(baseUrl, payload).then(res => res.data);
}

export const updateCustomer= async (id: number, payload: UpdateCustomerRequest ): Promise<CustomerEntity> => {
  return await apiClientService.put(`${baseUrl}/${id}`, payload).then(res => res.data);
}

export const deleteCustomer = async (id: number) => {
  return await apiClientService.delete(`${baseUrl}/${id}`).then(res => res.data);
}
