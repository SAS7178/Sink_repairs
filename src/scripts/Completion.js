import { getCompletions, deleteCompletion } from "./dataAccess.js";


mainContainer.addEventListener("click", click => {
    if (click.target.id.startswith("completion--")) {
        const [, completionId] = click.target.id.split("--") => {
            deleteCompletion(parseInt(completionId))
        }
    }
})

export const completions = () => {
    const completions = getCompletions()

    const completionString = (completion) => {
        let listHTML = `
            <li>
            ${completion.description}
            <button class ="completion__delete" id = "completion--${completion.id}>
                delete
                </button>
                </li>`
                return listHTML
     } 
    
        let HTML =
            `
            <ul>
            ${completions.map(completionString).join("")}
            </ul>
            `

            return HTML
    }
