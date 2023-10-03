import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const createPostContainer = document.querySelector("#new-post-form");
const postTitle = createPostContainer.querySelector("#postTitle");
const postBody = createPostContainer.querySelector("#postBody");

createPostContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleValue = postTitle.value;
    const postBodyValue = postBody.value;

    createPost(titleValue, postBodyValue);
});

async function createPost(title, body) {
    const createPostsUrl = `${API_BASE_URL}/api/v1/social/posts`;

    const postData = JSON.stringify({ title: title, body: body });

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
        console.log(response)
        console.log(json)
    } catch (error) {
        console.log(error)
    }
}