const applicationState = {
    plumbers: [],
    requests: [],
    completions: []
}

// funtion to export the request array objects' info to other modules  
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}
const mainContainer = document.querySelector("#container")
//var equal to my local host
const API = "http://localhost:8088"

// function to fetch from the database.json convert to js and store in requests array 
export const fetchRequests = () => {
    //returns fetched parsed data
    return fetch(`${API}/requests`)
        //translates to javascript type
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


// send trans state data to permanent in the database.json
export const sendRequest = (userServiceRequest) => {

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)

    }

    // says take data and store in in database.json with this name?
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}


export const fetchCompletion = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then((data) => {
            applicationState.completions = data
        }
        )
}

export const saveCompletions = (completion) => {

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)

    }

    // says take data and store it in database.json with this name ?
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
