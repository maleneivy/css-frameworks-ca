import { clearStorage } from "../utils/storage.mjs";

/**
 * Sets up a logout button that clears local storage and redirects the user to the home page upon clicking.
 */
export default function logOutButton() {
    const button = document.querySelector("#logOutButton");

    if (button) {
        button.onclick = function () {

            clearStorage();
            location.href = "/index.html";
        }
    }
}

logOutButton();