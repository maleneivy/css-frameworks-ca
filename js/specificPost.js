import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

async function specificPost() {
    try {

        const specificPostUrl = `${API_BASE_URL}/social/posts/${postId}?_author=true`;

        const fetchSpecificPost = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(specificPostUrl, fetchSpecificPost);

        const specificPost = await response.json();

        console.log(specificPost);

        // Create HTML
        const specificPostContainer = document.querySelector(".specific-post-container");
        specificPostContainer.classList.add(
            "container",
            "mt-5"
        )

        // PostCard
        const postCard = document.createElement("div");
        postCard.classList.add(
            "row"
        )

        // PostImage
        const postImage = document.createElement("img");
        postImage.classList.add(
            "img-fluid",
            "mt-2",
            "rounded-5"
        )
        postImage.src = `${specificPost.media}`;

        // PostTitle
        const postTitle = document.createElement("h1");
        postTitle.classList.add(
            "col-12"
        );
        postTitle.textContent = specificPost.title;

        // PostAuthor
        const postAuthor = document.createElement("p");
        postAuthor.classList.add(
            "col-6"
        )
        postAuthor.textContent = `Author: ${specificPost.author.name}`;

        // Postdate
        const postDate = document.createElement("p");
        postDate.classList.add(
            "col-6"
        )
        postDate.textContent = `Created: ${specificPost.created}`;

        // PostBody
        const postBody = document.createElement("p");
        postBody.classList.add(
            "col-12"
        )
        postBody.textContent = specificPost.body;


        specificPostContainer.appendChild(postCard);
        postCard.appendChild(postImage);
        postCard.appendChild(postTitle);
        postCard.appendChild(postAuthor);
        postCard.appendChild(postDate);
        postCard.appendChild(postBody);

    } catch (error) {
        console.log(error);
    }
}
specificPost()
