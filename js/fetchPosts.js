import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token } from "./utils/storage.mjs";

// all-posts-container
export const postsURL = `${API_BASE_URL}/social/posts`;


export async function fetchAllPosts(url, options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
}) {
    try {
        const fetchOptions = options;
        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        console.log(json)

        for (let i = 0; i < json.length; i++) {

            const title = json[i].title;
            const media = json[i].media;
            const id = json[i].id;

            // Create HTML - container
            const postsContainer = document.querySelector(".postsContainer");

            // PostCard
            const postCard = document.createElement("a");
            postCard.href = `/posts/specificPost.html?id=${id}`;
            postCard.classList.add(
                "card",
                "col-sm-12",
                "col-xs-2",
                "col-md-5",
                "m-1",
                "p-0"
            );

            // PostCard Body
            const cardBody = document.createElement("div");
            cardBody.classList.add(
                "card-body",
                "p-0"
            );

            // PostCard Image
            let postImage = document.createElement("img");
            postImage.classList.add(
                "card-img-top"
            );

            if (media === "" || media === null) {
                postImage.src = "/images/flat-lay-homemade-soup-broccoli-spinach.jpg";
            } else {
                postImage.src = media;
            }

            // PostCard Body Elements
            let postTitle = document.createElement("h3");
            postTitle.classList.add(
                "card-title"
            );
            postTitle.textContent = title;

            // Append the elements to the cardbody
            cardBody.appendChild(postImage);
            cardBody.appendChild(postTitle);

            //Append the cardBody to the postCard
            postCard.appendChild(cardBody);

            // Append the postCard to the PostsContainer
            postsContainer.appendChild(postCard);
        }

    } catch (error) {
        console.log(error)
    }
}

fetchAllPosts(postsURL);