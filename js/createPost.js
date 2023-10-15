import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";
import { clearMessages, displayMessage } from "./components/displayMessage.mjs";

const createPostContainer = document.querySelector("#new-post-form");
const formTitle = document.querySelector("#postTitleInput");
const formBody = document.querySelector("#postBodyInput");
const formTags = document.querySelector("#postTagsInput");
const formImage = document.querySelector("#postImageInput");
const messageContainerId = "#message-container";
const goToPostContainer = document.querySelector("#go-to-post-by-id");
const saveButton = document.querySelector("#save-post-button");

createPostContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    clearMessages(messageContainerId);

    const titleValue = formTitle.value;
    const postBodyValue = formBody.value;
    const postTagsValue = [formTags.value];
    const postImageValue = formImage.value;

    createPost(titleValue, postBodyValue, postTagsValue, postImageValue);
});

/**
 * Creates a new post and uploads it to the server.
 *
 * @param {string} titleValue - The title of the post.
 * @param {string} postBodyValue - The body content of the post.
 * @param {string[]} postTagsValue - An array of tags associated with the post.
 * @param {string} postImageValue - The URL of the post's image or media.
 */
async function createPost(titleValue, postBodyValue, postTagsValue, postImageValue) {
    const createPostsUrl = `${API_BASE_URL}/social/posts`;

    const postData = JSON.stringify({ title: titleValue, body: postBodyValue, tags: postTagsValue, media: postImageValue });

    const postOptions = {
        method: "POST",
        body: postData,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(createPostsUrl, postOptions);
        const json = await response.json();
        const jsonErrors = json.errors;
        const postId = json.id;
        console.log(response);
        console.log(json)

        if (response.ok) {
            displayMessage("success-message", `The post was successfully uploaded`, messageContainerId);

            createPostContainer.reset();
            saveButton.style.display = "none";
            let postLink = document.createElement("a");
            postLink.href = `/posts/specificPost.html?id=${postId}`;
            postLink.textContent = "Go to post";
            goToPostContainer.appendChild(postLink);

        } else if (jsonErrors) {
            clearMessages(messageContainerId);
            jsonErrors.forEach((errorMessage) => {
                displayMessage("error-message", errorMessage.message, messageContainerId, true);
            });
        }
    } catch (error) {
        console.log(error)
        displayMessage("error-message", "Something went wrong", messageContainerId);
    }
};