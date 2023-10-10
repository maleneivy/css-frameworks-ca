import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

const postIdUrl = `${API_BASE_URL}/social/posts/${postId}`;
const editFormContainer = document.querySelector("#edit-post-form");

//get the content of the post

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
        console.log(json)

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
        console.log(response)
        console.log(json)
    } catch (error) {
        console.log("put request", error)
    }
}


/*

async function editPost(media, title, body, tags) {

    const postData = JSON.stringify({ title: title, body: body, tags: tags, media: media });

    const postOptions = {
        method: "PUT",
        body: postData,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(postIdUrl, postOptions);
        const json = await response.json();
        console.log(response)
        console.log(json)

    } catch (error) {
        console.log(error)
    }

}

*/

/*
editFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const media = editImage.value;
    const title = editTitle.value;
    const body = editBody.value;
    const tags = [editTags.value];

    editPost(media, title, body, tags);
});
*/
