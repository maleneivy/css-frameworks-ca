/**
 * Filters and displays cards in the DOM based on a search query.
 *
 * @param {string} searchValue - The search query entered by the user.
 */

async function searchFilter(searchValue) {
    // Get all card elements.
    const postsContainer = document.querySelector(".postsContainer");
    const cards = postsContainer.querySelectorAll(".card");

    cards.forEach((card) => {
        // Hide cards that does not have a title that contains the user's query.
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const shouldBeVisible = title.includes(searchValue);

        if (shouldBeVisible) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

const searchInput = document.querySelector("#search-posts");

searchInput.addEventListener('input', function () {
    const searchValue = this.value.trim().toLowerCase();
    searchFilter(searchValue)
})
