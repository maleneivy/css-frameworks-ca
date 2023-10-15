import { displayMessage } from "./components/displayMessage.mjs";
import { API_BASE_URL } from "./settings/baseUrl.mjs";

/**
 * Logs in a user by sending a POST request with user data to the specified URL.
 *
 * @param {string} url - The URL for the login request.
 * @param {Object} userData - The user data to be sent for login, including email and password.
 */
async function logInUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);

        if (response.ok) {
            const json = await response.json();
            const userEmail = userData.email;
            const accessToken = json.accessToken;
            const userName = json.name;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("email", userEmail);
            localStorage.setItem("userName", userName);

            window.location.href = "/profile/index.html";
        } else {
            displayMessage("error-message", "Username or password is wrong", ".message");
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("log-in-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    const userData = {
        email: userEmail,
        password: userPassword,
    };

    const logInUserURL = `${API_BASE_URL}/social/auth/login`;
    await logInUser(logInUserURL, userData);
});
