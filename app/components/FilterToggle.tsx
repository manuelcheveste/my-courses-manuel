type FilterToggleProps = {
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (showOnlyFavorites: boolean) => void;
};

export default function FilterToggle({
  showOnlyFavorites,
  setShowOnlyFavorites,
}: FilterToggleProps) {
  return (
    <div className="flex items-center space-x-2 mt-4 md:mt-0">
      <button
        className={`px-4 py-2 rounded-l-md transition mr-0 w-30 ${
          !showOnlyFavorites
            ? 'bg-gray-200 text-gray-700'
            : 'bg-black text-white hover:bg-gray-300'
        }`}
        onClick={() => setShowOnlyFavorites(false)}
      >
        All Courses
      </button>

      <button
        className={`px-4 py-2 rounded-r-md transition w-30 ${
          showOnlyFavorites
            ? 'bg-gray-200 text-gray-700'
            : 'bg-black text-white hover:bg-gray-300'
        }`}
        onClick={() => setShowOnlyFavorites(true)}
      >
        Favorites
      </button>
    </div>
  );
}
