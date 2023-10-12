import { displayMessage } from "./components/displayMessage.mjs";
import { presentPosts } from "./presentPosts.mjs";
import { API_BASE_URL } from "./settings/baseUrl.mjs";
import { token, userName } from "./utils/storage.mjs";


// Present username on profile
// GET request
// API + /social/profiles/<name>

// Get single profile 
async function getMyUserData() {
    const url = `${API_BASE_URL}/social/profiles/${userName}?_posts=true?_followers=true?_following=true`;

    try {
        const fetchUser = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, fetchUser);
        const json = await response.json();
        const jsonErrors = json.errors;

        presentUserProfile(json);

        if (jsonErrors) {
            jsonErrors.forEach((errorMessage) => {
                displayMessage("error-message", errorMessage.message, ".message");
            });
        }

    } catch (error) {
        console.log(error)
    }
}
getMyUserData();

// Present userProfile
function presentUserProfile(json) {

    // Profile Image - get the avatar
    let avatarData = json.avatar;

    if (avatarData === null) {
        avatarData = "/images/default-img/default-profile-image.jpg";
    };

    const profileAvatarContainer = document.querySelector("#profile-picture-container");
    const avatarImage = document.createElement("img");
    avatarImage.src = avatarData;
    avatarImage.classList.add(
        "img-fluid",
        "col-4",
        "rounded-circle"
    );
    profileAvatarContainer.appendChild(avatarImage);

    // Profile name
    const nameContainer = document.querySelector("#profile-name-container");
    nameContainer.classList.add(
        "mb-3"
    );
    let profileName = document.createElement("h1");
    profileName.textContent = `${userName}`;

    nameContainer.appendChild(profileName);

    // posts, followers, following 
    let countForProfile = json._count;
    console.log(countForProfile);
    let userPostsNumber = countForProfile.posts;
    let userFollowersNumber = countForProfile.followers;
    let userFollowingNumber = countForProfile.following;

    const profileCountsContainer = document.querySelector("#profile-counts-container");
    profileCountsContainer.classList.add(
        "row",
        "text-center",
        "justify-content-sm-center",
        "justify-content-around",
        "mb-3"
    )

    // Present the counts for user posts
    const userPostCard = document.createElement("div");
    userPostCard.classList.add(
        "flex-d",
        "col-2",
        "col-xs-4"
    );
    const postsNumber = document.createElement("p");
    postsNumber.textContent = `${userPostsNumber}`;
    const postsText = document.createElement("p");
    postsText.textContent = "posts";

    userPostCard.appendChild(postsNumber);
    userPostCard.appendChild(postsText);

    // Present the counts for user followers
    const userFollowersCard = document.createElement("div");
    userFollowersCard.classList.add(
        "flex-d",
        "col-2",
        "col-xs-4"
    );
    const followersNumber = document.createElement("p");
    followersNumber.textContent = `${userFollowersNumber}`;
    const followersText = document.createElement("p");
    followersText.textContent = "followers";

    userFollowersCard.appendChild(followersNumber);
    userFollowersCard.appendChild(followersText);

    // Present the counts for user following
    const userFollowingCard = document.createElement("div");
    userFollowingCard.classList.add(
        "flex-d",
        "col-2",
        "col-xs-4"
    );
    const followingNumber = document.createElement("p");
    followingNumber.textContent = `${userFollowingNumber}`;
    const followingText = document.createElement("p");
    followingText.textContent = "following";

    userFollowingCard.appendChild(followingNumber);
    userFollowingCard.appendChild(followingText);

    // Add the counter cards in the container
    profileCountsContainer.appendChild(userPostCard);
    profileCountsContainer.appendChild(userFollowersCard);
    profileCountsContainer.appendChild(userFollowingCard);
}


// Get users posts
async function getUserPosts() {
    const postsUrl = `${API_BASE_URL}/social/profiles/${userName}/posts`;
    try {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(postsUrl, postData);
        const json = await response.json();
        const jsonErrors = json.errors;

        console.log(json)

        presentPosts(json);

        if (jsonErrors) {
            jsonErrors.forEach((errorMessage) => {
                displayMessage("error-message", errorMessage.message, ".message");
            });
        }

    } catch (error) {
        console.log(error)
    }
}
getUserPosts();