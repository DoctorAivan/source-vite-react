// Api settings

export const apiServer = 'http://localhost:8000'

const API_URL = process.env.NODE_ENV === 'development' ?
    `${apiServer}/api/` :  // Development
    `${location.protocol}//${location.host}/api/`  // Production

// Wait time to API Response
const API_FETCH_TIMEOUT = 10000

// Simple Get Method
export const apiGet = async (path) => {

    try {

        // Send request to API
        const request = await apiFetchController(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'GET',
            headers: apiCreateHeaders()
        });

        // Create response values
        const response = await request.json()
        const status_code = request.status
        const ok = request.ok

        // Return object
        return { response, status_code, ok }

    } catch (error) {
    
        //  Create response values
        const response = []
        const status_code = 400
        const ok = false

        //  Return object
        return { response, status_code, ok, error }
    }
};

// Simple Post Method
export const apiPost = async (path, body, file = false) => {

    try {

        // Send request to API
        const request = await apiFetchController(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'POST',
            headers: apiCreateHeaders(file),
            body: apiCreateBody(body, file)
        });

        // Create response values
        const response = await request.json()
        const status_code = request.status
        const ok = request.ok

        // Return object
        return { response, status_code, ok }

    } catch (error) {

        //  Create response values
        const response = []
        const status_code = 400
        const ok = false

        //  Return object
        return { response, status_code, ok, error }
    }
};

// Simple Put Method
export const apiPut = async (path, body, file = false) => {

    try {

        // Send request to API
        const request = await apiFetchController(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'PUT',
            headers: apiCreateHeaders(file),
            body: apiCreateBody(body, file)
        });

        // Create response values
        // const response = await request.json()
        const response = []
        const status_code = request.status
        const ok = request.ok

        // Return object
        return { response, status_code, ok }

    } catch (error) {

        //  Create response values
        const response = []
        const status_code = 400
        const ok = false

        //  Return object
        return { response, status_code, ok, error }
    }
};

// Simple Get Method
export const apiDelete = async (path, body = '', file = false) => {

    try {

        // Send request to API
        const request = await apiFetchController(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'DELETE',
            headers: apiCreateHeaders(),
            body: apiCreateBody(body, file)
        });

        // Create response values
        // const response = await request.json()
        const response = []
        const status_code = request.status
        const ok = request.ok

        // Return object
        return { response, status_code, ok }

    } catch (error) {

        //  Create response values
        const response = []
        const status_code = 400
        const ok = false

        //  Return object
        return { response, status_code, ok, error }
    }
};

// Controller Fetch Errors
const apiFetchController = async (resource, options = {}) => {

    // Create Abort Controller
    const controller = new AbortController();

    // Create ID Timeout
    const id = setTimeout(() => controller.abort(), options.timeout);

    // Send request to API
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });

    // Clear Timeout Intance
    clearTimeout(id);

    return response;
}

// Create Body for Fetch
const apiCreateBody = (body, file) => {

    // Create Form Data Intance
    let formData

    // Validate if send File Data
    if (file) {

        // Create Form Data Intance
        const data = new FormData()

        // Get Fields
        Object.keys(body).map((key) => {

            // Clear Key
            //if (String(body[key]).includes('http://') || body[key] == null || body[key] == '') {
            if (String(body[key]).includes('http://')) {
                data.append(key, '')
            }
            else {
                data.append(key, body[key])
            }
        })

        // Add Fields
        formData = data
    }
    else {
        formData = JSON.stringify(body)
    }

    // Return Form Data
    return formData
}

// Create Headers for Requests
const apiCreateHeaders = (file) => {

    // Get Token
    const token = window.localStorage.getItem('token')

    // Create Header Instance
    let headers = {
        'Access-Control-Allow-Origin': '*'
    }
    // Validate if send File Data
    if (!file)
        headers['Content-Type'] = 'application/json'

    // Token Header
    if (token) headers.Authorization = token

    // Return Headers
    return headers
}