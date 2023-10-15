import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";
import { displayMessage } from "./components/displayMessage.mjs";

/**
 * Deletes a post with the specified ID from the server.
 *
 * @param {string} postId - The ID of the post to be deleted.
 */
export async function deletePost(postId) {

    const postIdUrl = `${API_BASE_URL}/social/posts/${postId}`;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: postId }),
    };

    try {
        const response = await fetch(postIdUrl, fetchOptions);
        const json = await response.json();

        if (response.ok) {
            window.location.href = "/feed/index.html";
            alert("The post was deleted successfully!");
        } else {
            displayMessage("error-message", "Something went wrong", ".message")
        }

        console.log(response);
        console.log(json)

    } catch (error) {
        console.log(error);
    }
}
