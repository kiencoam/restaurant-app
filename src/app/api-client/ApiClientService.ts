// const token =
//   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiIsImlzcyI6InF1YW50dWFuaHV5IiwiZXhwIjoxNzM0NjQxMzA0LCJpYXQiOjE3MzQyODEzMDQsImp0aSI6IjcyYzQ5MTNlLTFlMzQtNGY1OS1hYzBmLWQ1OWY1NDg4Y2Y1OCJ9.4h1qAAzutn3oGB7e-O4244gE9K9Dbjl8KW0NcUjXEk9FgpFU9ILk5nq_x-rZIrka7EPLV44qzAKMD5UD2F_s7g";

import { getCookie } from "@/utils/cookies-client";
const token = getCookie("token");

const apiClientService = {
  get: (endpoint: string) => getData(endpoint),
  post: (endpoint: string, data: any) => postData(endpoint, data),
  put: (endpoint: string, data: any) => putData(endpoint, data),
  patch: (endpoint: string, data: any) => patchData(endpoint, data),
  delete: (endpoint: string) => deleteData(endpoint),
};

export async function getData(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      console.log(response);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function postData(endpoint: string, data: any) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      alert((await response?.json()).metadata.message);
    }

    return await response.json();
  } catch (err) {
    alert("Đã có lỗi xảy ra");
    console.log(err);
  }
}

export async function putData(endpoint: string, data: any) {
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      alert((await response.json()).metadata.message);
    }

    return await response.json();
  } catch (err) {
    alert("Đã có lỗi xảy ra");
    console.log(err);
  }
}

export async function patchData(endpoint: string, data: any) {
  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      alert((await response.json()).metadata.message);
    }

    return await response.json();
  } catch (err) {
    alert("Đã có lỗi xảy ra");
    console.log(err);
  }
}

export async function deleteData(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      console.log(response);
      alert((await response.json()).metadata.message);
    }

    return await response.json();
  } catch (err) {
    alert("Đã có lỗi xảy ra");
    console.log(err);
  }
}

export default apiClientService;
