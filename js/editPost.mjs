import { displayMessage } from "./components/displayMessage.mjs";
import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

const postIdUrl = `${API_BASE_URL}/social/posts/${postId}`;
const editFormContainer = document.querySelector("#edit-post-form");
const goToPostContainer = document.querySelector("#go-to-post-by-id");
const saveButton = document.querySelector("#save-post-button");

/**
 * Fetches data from the server and populates input fields with retrieved values.
 *
 * @param {string} postIdUrl - The URL to fetch data from.
 * @param {Object} [options] - Optional options for the fetch request.
 * @param {string} [options.method="GET"] - The HTTP method for the fetch request.
 * @param {Object} [options.headers] - Additional headers for the request.
 */
async function getValues(postIdUrl, options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
}) {
    try {
        const fetchOptions = options;
        const response = await fetch(postIdUrl, fetchOptions);
        const json = await response.json();

        const media = document.querySelector("#editImage");
        const title = document.querySelector("#editTitle");
        const body = document.querySelector("#editBody");
        const tags = document.querySelector("#editTags");

        title.value = json.title;
        body.value = json.body;
        media.value = json.media;
        tags.value = json.tags;

    } catch (error) {
        console.log(error);
    }
}

getValues(postIdUrl);

// EditForm

editFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const newMedia = editImage.value;
    const newTitle = editTitle.value;
    const newBody = editBody.value;
    const newTags = [editTags.value];

    editPost(newMedia, newTitle, newBody, newTags);
});

// EditPost function
/**
 * Edits an existing post with new data and updates it on the server.
 *
 * @param {string} newMedia - The URL of the updated post's image or media.
 * @param {string} newTitle - The updated title of the post.
 * @param {string} newBody - The updated body content of the post.
 * @param {string} newTags - An array of updated tags associated with the post.
 */
async function editPost(newMedia, newTitle, newBody, newTags) {
    const postData = JSON.stringify({ title: newTitle, body: newBody, tags: newTags, media: newMedia });
    const editOptions = {
        method: "PUT",
        body: postData,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(postIdUrl, editOptions);
        const json = await response.json();
        console.log(json)

        if (response.ok) {
            displayMessage("success-message", "The post is successfully edited.", ".message");

            saveButton.style.display = "none";
            const postId = json.id;
            let postLink = document.createElement("a");
            postLink.href = `/posts/specificPost.html?id=${postId}`;
            postLink.textContent = "Go to post";
            goToPostContainer.appendChild(postLink);
            goToPostContainer.classList.add(
                "mt-2"
            )

        } else {
            displayMessage("error-message", "Something went wrong", ".message");
        }

    } catch (error) {
        console.log("put request", error)
    }
}