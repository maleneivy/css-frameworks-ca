export function presentPosts(posts) {
    // Get container and clear it.
    const postsContainer = document.querySelector(".postsContainer");
    postsContainer.innerHTML = "";

    // Iterate over the posts and insert them to DOM.
    posts.forEach((post) => {
        const title = post.title;
        const media = post.media;
        const id = post.id;

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
    });
}