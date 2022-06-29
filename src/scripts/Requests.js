import { getRequests, deleteRequest, getPlumbers, saveCompletions } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    let html = `
        <ul>
            ${
        // add to map argument given request
        requests.map(convertRequestToListItems).join("")
        }
        </ul>
    `
    return html
}

const convertRequestToListItems = (request) => {
    const plumbers = getPlumbers()
    let html = ''
    html += `<li>
                ${request.description}
                <button class="request__delete"
                id="request--${request.id}">
                 Delete
                 </button>
                 </li>
                 <select class="plumbers" id="plumbers">
                 <option value="">Choose</option>
                 ${plumbers.map( plumber => { return`<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }).join("")
                 }
                </select>`

    return html
}
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId, requestJob] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                                requestId: parseInt(requestId), 
                                plumberId: parseInt(plumberId),
                                requestJob: requestJob,
                                date_created: Date.now()
                                 }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                saveCompletions(completion)
        }
    }
)
