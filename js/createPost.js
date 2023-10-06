import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const createPostContainer = document.querySelector("#new-post-form");
const formTitle = document.querySelector("#postTitleInput");
const formBody = document.querySelector("#postBodyInput");



createPostContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleValue = formTitle.value;
    const postBodyValue = formBody.value;

    createPost(titleValue, postBodyValue);
});

async function createPost(titleValue, postBodyValue) {
    const createPostsUrl = `${API_BASE_URL}/api/v1/social/posts`;

    const postData = JSON.stringify({ title: titleValue, body: postBodyValue });

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