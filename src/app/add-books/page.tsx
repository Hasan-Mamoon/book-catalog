"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddBooksPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          genre: genre,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add book");
      }

      setSuccess("Book added successfully!");
      setTitle("");
      setAuthor("");
      setGenre("");

      setTimeout(() => {
        router.push("/dashboard/#catalogue");
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-300">
            Add a New Book
          </h2>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base">
              {success}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-xs sm:text-sm font-medium text-gray-500 mb-1"
              >
                Book Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter the book title"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-xs sm:text-sm font-medium text-gray-500 mb-1"
              >
                Author *
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="block w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter the author name"
              />
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-xs sm:text-sm font-medium text-gray-500 mb-1"
              >
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={genre}
                required
                onChange={(e) => setGenre(e.target.value)}
                className="block w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors "
              >
                <option value="">Select a genre</option>
                <option value="Action">Action</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Business">Business</option>
                <option value="Technology">Technology</option>
                <option value="Thriller">Thriller</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Button Section */}
          <div className="space-y-3 sm:space-y-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Book...
                </span>
              ) : (
                "Add Book"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-gray-800 text-gray-200 border-rose-300">
                  Or
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                router.push("/dashboard/#catalogue");
              }}
              className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base font-medium text-gray-300 bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Collection
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">* Required fields</p>
        </div>
      </div>
    </div>
  );
}
