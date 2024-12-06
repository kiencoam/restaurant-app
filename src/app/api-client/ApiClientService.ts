const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJxdWFudHVhbmh1eSIsInN1YiI6IjEiLCJleHAiOjE3MzM0MTMzOTYsImlhdCI6MTczMzA1MzM5NiwianRpIjoiZGVlZWNhMDktNWE5Mi00NGQzLWFhMjQtYTgzMWYwOWE0YjNlIiwic2NvcGUiOiJBRE1JTiJ9.OspkfVYNAQSFKyQbjIuEh1roHY4OPRqW83CP3PHV8FHXaXehn803F4jnuMs6R1GIyCGluzAJse0NeY5Tj1hl9A";

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