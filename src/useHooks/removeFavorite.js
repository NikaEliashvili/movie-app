export default function removeFavorite(movieId) {
  const savedItems = JSON.parse(localStorage.getItem("favoritedItems")) || [];
  if (savedItems?.length > 0) {
    const newFavoriteItems = [];
    for (let i = 0; i < savedItems.length; i++) {
      if (savedItems[i].id !== movieId) {
        newFavoriteItems.push(savedItems[i]);
      }
    }

    localStorage.removeItem("favoritedItems");
    localStorage.setItem("favoritedItems", JSON.stringify(newFavoriteItems));
  }

  console.log("Deleted Item: ");
}
