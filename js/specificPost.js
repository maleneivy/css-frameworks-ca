import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";
import { deletePost } from "./deletePost.mjs";

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
            "rounded-5",
        )
        postImage.src = `${specificPost.media}`;
        postImage.style.maxHeight = "500px";
        postImage.style.objectFit = "cover";

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

        // EditPostButton
        const editButtonPost = document.createElement("button");
        editButtonPost.classList.add(
            "btn",
            "btn-primary",
            "edit-btn",
            "col-2",
            "p-2",
            "m-2"
        )
        editButtonPost.textContent = "Edit";
        editButtonPost.addEventListener("click", (e) => {

            window.location.href = `/posts/edit-post.html?id=${postId}`;
        })

        // DeleteButton
        const deletePostButton = document.createElement("button");
        deletePostButton.classList.add(
            "btn",
            "btn-primary",
            "delete-btn",
            "col-2",
            "p-2",
            "m-2"
        )
        deletePostButton.textContent = "Delete";
        deletePostButton.addEventListener("click", (e) => {
            e.preventDefault();

            deletePost(postId);
        });

        specificPostContainer.appendChild(postCard);
        postCard.appendChild(postImage);
        postCard.appendChild(postTitle);
        postCard.appendChild(postAuthor);
        postCard.appendChild(postDate);
        postCard.appendChild(postBody);
        postCard.appendChild(editButtonPost);
        postCard.appendChild(deletePostButton);

    } catch (error) {
        console.log(error);
    }
}
specificPost()
