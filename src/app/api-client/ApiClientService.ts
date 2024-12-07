const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzM5MjMzOTksImlhdCI6MTczMzU2MzM5OSwianRpIjoiMWZiZWZiNjAtMjM1Yy00MGUzLWE5NjAtMjE5ZTk2N2M5NmFiIiwic2NvcGUiOiJBRE1JTiJ9.1MiljbSqPAXmir3PlgDVYRa10O8Fl6_yonNztph2SIHOsYVdJQm2QEWCJNAw2BUE9-xXO7-4ixLsRopUSqG4Qg";

const apiClientService = {
    get: (endpoint: string) => getData(endpoint),
    post: (endpoint: string, data: any) => postData(endpoint, data),
    put: (endpoint: string, data: any) => putData(endpoint, data),
    patch: (endpoint: string, data: any) => patchData(endpoint, data),
    delete: (endpoint: string) => deleteData(endpoint)
};

export async function getData(endpoint: string) {
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
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
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
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
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

export async function patchData(endpoint: string, data: any) {
    const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
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
            "Authorization": "Bearer " + token
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

export default apiClientService;