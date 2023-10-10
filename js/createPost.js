import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const createPostContainer = document.querySelector("#new-post-form");
const formTitle = document.querySelector("#postTitleInput");
const formBody = document.querySelector("#postBodyInput");
const formTags = document.querySelector("#postTagsInput");
const formImage = document.querySelector("#postImageInput");



createPostContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleValue = formTitle.value;
    const postBodyValue = formBody.value;
    const postTagsValue = [formTags.value];
    const postImageValue = formImage.value;

    createPost(titleValue, postBodyValue, postTagsValue, postImageValue);
});


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
        console.log(response)
        console.log(json)

        if (response.ok) {
            console.log("Success!")
        }
        else {
            console.log("Failed to upload new post")
        }

    } catch (error) {
        console.log(error)
    }
};