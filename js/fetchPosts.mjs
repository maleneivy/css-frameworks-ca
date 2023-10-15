import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const postsURL = `${API_BASE_URL}/social/posts`;

/**
 * Fetches a list of posts from the server, optionally filtered by a specific tag.
 *
 * @param {string|null} tag - The tag to filter posts by, or null to fetch all posts.
 *
 * @returns {Promise} A promise that resolves to the fetched posts data.
 */
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