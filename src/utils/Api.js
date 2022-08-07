// API Server URL
//const API_URL = 'http://10.186.4.231/api/'
const API_URL = 'http://localhost:8000/api/'

// Second of Time out Limit
const API_FETCH_TIMEOUT = 5000

// Simple GET Method
export const apiGet = async (path) => {

    try {

        // Send request to API
        const request = await apiCreateFetch(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'GET',
            headers: apiCreateHeaders()
        });

        // Create response values
        const response = request ? await request.json() : []
        const status_code = request.status
        const ok = request.ok

        // Return object
        return { response, status_code, ok }

    } catch (error) {

        // Create response values
        const response = []
        const status_code = 400
        const ok = false

        // Return object
        return { response, status_code, ok, error }
    }
}

// Simple POST Method
export const apiPost = async (path, body, file = false) => {

    try {

        // Send request to API
        const request = await apiCreateFetch(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'POST',
            headers: apiCreateHeaders(file),
            body: apiCreateBody(body, file)
        });

        // Create response values
        const response = request ? await request.json() : []
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
}

// Simple PUT Method
export const apiPut = async (path, body, file = false) => {

    try {

        // Send request to API
        const request = await apiCreateFetch(API_URL + path, {
            timeout: API_FETCH_TIMEOUT,
            method: 'PUT',
            headers: apiCreateHeaders(file),
            body: apiCreateBody(body, file)
        });

        // Create response values
        const response = request ? await request.json() : []
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
}

// Simple DELETE Method
export const apiDelete = async (path) => {

    try {

        // Send request to API
        const request = await apiCreateFetch(API_URL + path, {
            method: 'DELETE',
            headers: apiCreateHeaders()
        });

        // Create response values
        const response = request ? await request.json() : []
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
}

// Create Fetch
const apiCreateFetch = async (resource, options = {}) => {

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

            // Add row to Data list
            data.append(key, body[key])
        })

        // Add Fields
        formData = data
    }
    else {

        // Encode Body
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
        'Access-Control-Allow-Origin': '*',
        'X-CSRFToken': apiGetCsrfToken(),
    }
    // Validate if send File Data
    if (!file)
        headers['Content-Type'] = 'application/json'

    // Token Header
    if (token) headers.Authorization = token

    // Return Headers
    return headers
}

// Get Cookie Value
const apiGetCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Get CSRF Token
const apiGetCsrfToken = () => {
    return apiGetCookie('csrftoken');
}