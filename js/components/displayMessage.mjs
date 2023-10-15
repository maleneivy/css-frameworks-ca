/**
 * Displays a message with the specified type and content in a target element.
 *
 * @param {string} messageType - The type of the message, e.g., "success-message" or "error-message".
 * @param {string} message - The content of the message to be displayed.
 * @param {string} targetElement - The selector for the HTML element where the message should be displayed.
 * @param {boolean} shouldAppendMessage - Optional. If true, the message will be appended to the target element; otherwise, it replaces the content.
 */
export function displayMessage(messageType, message, targetElement, shouldAppendMessage) {
    const element = document.querySelector(targetElement);

    if (shouldAppendMessage === true) {
        element.innerHTML += `<div class="message ${messageType}">${message}</div>`
    } else {
        element.innerHTML = `<div class="message ${messageType}">${message}</div>`
    }
}

/**
 * Clears all displayed messages from a target element.
 *
 * @param {string} targetElement - The selector for the HTML element from which to remove messages.
 */
export function clearMessages(targetElement) {
    const element = document.querySelector(targetElement);
    element.innerHTML = "";
}