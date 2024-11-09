import apiClientService from "./ApiClientService";

const baseUrl: string = "http://localhost:8080/api/v1/payments";

export type CreatePaymentRequest = {
  orderId: number;
  totalPrice: number;
  promotion: number;
  needToPay: number;
  paymentMethod: string;
};

export type PaymentEntity = {
  id: number;
  totalPrice: number;
  promotion: number;
  needToPay: number;
  paymentMethod: string;
};

export const createPayment = async (
  payload: CreatePaymentRequest
): Promise<PaymentEntity> => {
  return await apiClientService.post(baseUrl, payload).then((res) => res.data);
};
