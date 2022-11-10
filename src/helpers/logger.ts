const logger = (parent: HTMLDivElement, message: string, success : boolean) => {
    // search for the logger element
    const logger = parent.querySelector('#logger') as HTMLDivElement
    // if it doesn't exist, create it
    if (!logger) {
        const newLogger = document.createElement('div')
        newLogger.id = 'logger'
        newLogger.className = 'logger'
        parent.appendChild(newLogger)
    }
    // create a new message
    const newMessage = document.createElement('div')
    newMessage.className = 'logger__message'
    newMessage.innerHTML = message
    if (success) {
        newMessage.classList.add('logger__message--success')
    } else {
        newMessage.classList.add('logger__message--error')
    }
    // append the new message to the logger
    parent.querySelector('#logger')!.appendChild(newMessage)
}
export default logger