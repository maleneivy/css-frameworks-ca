import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const postsURL = `${API_BASE_URL}/social/posts`;

export async function fetchPosts(tag) {
    try {
        let url = postsURL;

        // Filter by tag, if tag is given.
        if (tag !== null) {
            url += `?_tag=${tag}`
        }

        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        const response = await fetch(url, fetchOptions);
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}