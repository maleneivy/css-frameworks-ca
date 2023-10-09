import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { postsURL } from "./fetchPosts.js";
import { fetchAllPosts } from "./fetchPosts.js";

fetchAllPosts(postsURL);

console.log(postsURL)

// ---------- Create the post on the DOM


/*
const postsContainer = document.querySelector(".postsContainer");

// PostCard
const postCard = document.createElement("div");
postCard.classList.add(
"card",
"col-5",
"m-1",
"p-0"
);

// PostCard Body
const cardBody = document.createElement("div");

// PostCard Body Elements
let postTitle = document.createElement("p");
postTitle.classList.add(
"card-title"
);
postTitle.textContent = titleValue;

let postBody = document.querySelector("p");
postBody.classList.add(
"how-to-text"
);
postBody.textContent = postBodyValue;

// Append the elements to the cardbody
cardBody.appendChild(postTitle);
cardBody.appendChild(postBody);

//Append the cardBody to the postCard
postCard.appendChild(cardBody);

// Append the postCard to the PostsContainer
postsContainer.appendChild(postCard); 

*/

