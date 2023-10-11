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