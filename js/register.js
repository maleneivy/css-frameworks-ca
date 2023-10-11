import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { displayMessage } from "./components/displayMessage.mjs";

async function registerUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(response)
        console.log(json)

        const jsonErrors = json.errors;

        if (jsonErrors) {
            jsonErrors.forEach((errorMessage) => {
                displayMessage("error-message", errorMessage.message, ".message");
            });
        }

    } catch (error) {
        console.log(error);
    }
}

document.getElementById("register-user-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    const userData = {
        name: userName,
        email: userEmail,
        password: userPassword,
    };

    const registerUserURL = `${API_BASE_URL}/social/auth/register`;
    await registerUser(registerUserURL, userData);
});

// What to do next here:
// Need to fix error messages, redirecting when registration was successful.