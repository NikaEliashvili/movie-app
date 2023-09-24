export default function AddFavoriteButton(movie) {
  const savedItems = JSON.parse(localStorage.getItem("favoritedItems")) || [];
  console.log(savedItems);
  const isSaved = savedItems?.some((item) => item.id === movie.id);
  if (!isSaved) {
    console.log("Added New Item !");
    if (JSON.parse(localStorage.getItem("favoritedItems"))) {
      const favorites = JSON.parse(localStorage.getItem("favoritedItems"));
      localStorage.setItem(
        "favoritedItems",
        JSON.stringify([...favorites, movie])
      );
    } else {
      localStorage.setItem("favoritedItems", JSON.stringify([movie]));
    }
  }
}
