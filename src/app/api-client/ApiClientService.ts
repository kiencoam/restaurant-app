const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzQyOTI3MzQsImlhdCI6MTczMzkzMjczNCwianRpIjoiOGNkMGUyZmYtNTQ1NS00ZTM3LTgyNzQtZjQ1YTFiMTIwZjM5Iiwic2NvcGUiOiJBRE1JTiJ9.4sV3Nc7VjbJvmxg3rRe8XzhLMqPhg3zoQMcHOh_cc9DKekv0vEtR37inF1k75z_JkSsYsF7UoZWHk55Xk9WPWg";

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
