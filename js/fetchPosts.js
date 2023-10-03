import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

// all-posts-container
const postsURL = `${API_BASE_URL}/api/v1/social/posts`;

async function fetchAllPosts(url, options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
}) {
    try {
        const fetchOptions = options;
        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        console.log(response);
        console.log(json);
    } catch (error) {
        console.log(error)
    }
}

fetchAllPosts(postsURL);