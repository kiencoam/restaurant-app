import apiClientService from "./ApiClientService";

import { MenuSectionEntity } from "../home/order-taking/entity";

const baseUrl: string = "http://localhost:8080/api/v1/menu_sections";

// interface Meta {
//     code: number;
//     message: string;
// }

// interface Resoure<T> {
//     meta: Meta;
//     data: T;
// }


export type CreateMenuSectionRequest = {
  title: string;
  description: string;
};


export type UpdateMenuSectionRequest = {
  title?: string;
  description?: string;
};


export const getDetailMenuSection = async (id: number): Promise<MenuSectionEntity> => {
    return await apiClientService.get(`${baseUrl}/${id}`).then(res => res.data); 
}

export const getAllMenuSections = async () => {
    return await apiClientService.get(baseUrl).then(res => res.data);
}

export const createMenuSection = async (payload: CreateMenuSectionRequest) => {
    return await apiClientService.post(baseUrl, payload).then(res => res.data);
}

export const updateMenuSection = async (id: number, payload: UpdateMenuSectionRequest): Promise<MenuSectionEntity> => {
    return await apiClientService.put(`${baseUrl}/${id}`, payload).then(res => res.data);
}

export const deleteMenuSection = async (id: number) => {
    return await apiClientService.delete(`${baseUrl}/${id}`).then(res => res.data);
}