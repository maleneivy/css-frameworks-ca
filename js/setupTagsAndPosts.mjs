import { presentPosts } from "./presentPosts.mjs";
import { fetchPosts } from "./fetchPosts.mjs";

export async function setupTagsAndPosts() {
    // Fetch all posts.
    let posts = await fetchPosts(null);

    // Present all posts.
    presentPosts(posts);

    // Setup tags.
    let allTags = [];

    posts.forEach((post) => {
        let tags = post.tags;
        allTags = allTags.concat(tags);
    });

    // Remove tags that are empty.
    allTags = allTags.filter((tag) => {
        return tag !== "";
    });

    // Remove duplicate tags and sort them.
    allTags = [...new Set(allTags)].sort()

    // Insert the tags into the <select>.
    const selectTagFormContainer = document.querySelector(".form-select");
    allTags.forEach(tag => {
        const selectOption = document.createElement("option");
        selectOption.setAttribute = "value";
        selectOption.value = `${tag}`;
        selectOption.textContent = `${tag}`;

        selectTagFormContainer.appendChild(selectOption);
    });

    // Add event listener that will fetch all posts with the selected tag.
    selectTagFormContainer.addEventListener("change", async (e) => {
        let tag = selectTagFormContainer.value;
        console.log(`'${tag}'`)
        tag = tag == "show-all-posts" ? null : tag;

        let posts = await fetchPosts(tag);
        presentPosts(posts);
    });
}

setupTagsAndPosts()