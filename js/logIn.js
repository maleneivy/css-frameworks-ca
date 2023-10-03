import { API_BASE_URL } from "./settings/baseUrl.mjs";


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

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("loggedInUser:", userEmail);

            window.location.href = "/profile/index.html";
        } else {
            // display ErrorMessage with reusable errormessage
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

    const logInUserURL = `${API_BASE_URL}/api/v1/social/auth/login`;
    await logInUser(logInUserURL, userData);
});


// Can I make anything reusable? 


