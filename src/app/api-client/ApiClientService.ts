import { cookies } from "next/headers";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzEyNzA3NDUsImlhdCI6MTczMDkxMDc0NSwianRpIjoiODhjNGEwMzUtZjFmNi00NDljLTlkODQtOTBjZDMyOWQzNjE4Iiwic2NvcGUiOiJBRE1JTiJ9.f8EQHprpoFKLezxrhFd8qhinbkbXzKJMMXXlWtcercE0kRuvEpru2KFlNdGt0_LLld6nAxZzuD8IN6DmPGXa4A";
// const cookieStore = cookies()
// const token = cookieStore.get("token").value;

const apiClientService = {
    get: (endpoint: string) => getData(endpoint),
    post: (endpoint: string, data: any) => postData(endpoint, data),
    put: (endpoint: string, data: any) => putData(endpoint, data),
    delete: (endpoint: string) => deleteData(endpoint)
};

export async function getData(endpoint: string) {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

export async function postData(endpoint: string, data: any) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

export async function putData(endpoint: string, data: any) {
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

export async function deleteData(endpoint: string) {
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}


export default apiClientService;
