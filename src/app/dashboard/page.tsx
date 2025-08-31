"use client";
import { useSession } from "next-auth/react";
import Card from "@/components/card";
import { useRouter } from "next/navigation";
import useBooks from "@/hooks/useBooks";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const { books, loading, error, refetch } = useBooks({ limit: 8 });
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const deleteBook = async (bookId: string) => {
    console.log("deleting book", bookId);
    try {
      const response = await fetch(`/api/books?bookId=${bookId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to delete book");
      }
      refetch();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section
        id="welcome"
        className="h-screen flex items-center justify-center snap-start px-4"
      >
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <p className="text-4xl sm:text-6xl lg:text-8xl font-bold">
            Welcome,{" "}
            <span className="text-blue-600">
              Mr.
              {session?.user?.name?.split(" ")[0] ||
                session?.user?.name ||
                "User"}
            </span>
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl">Today is {today}</p>

          <div className="flex flex-col items-center space-y-4 animate-bounce pt-8">
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              Scroll down to continue to catalogue
            </p>
            <div className="flex flex-col space-y-1">
              <div className="w-6 h-6 border-r-2 border-b-2 border-gray-600 transform rotate-45 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Catalog */}
      <section
        id="catalogue"
        className="h-screen snap-start bg-gray-800 overflow-y-auto"
      >
        <div className="h-full flex flex-col py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 w-full flex-1 flex flex-col">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-white">
              Your Books:
            </h2>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-500 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="max-w-md mx-auto">
                  <Card className="text-center text-red-600">
                    <p>Error loading books: {error}</p>
                  </Card>
                </div>
              ) : books.length === 0 ? (
                <div className="max-w-md mx-auto">
                  <Card className="text-center">
                    <div className="py-8">
                      <p className="text-gray-600 mb-4">
                        No books in your collection yet
                      </p>
                      <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => router.push("/add-books")}
                      >
                        Add Your First Book
                      </button>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-4">
                  {books.map((book) => (
                    <Card
                      key={book.id}
                      title={book.title}
                      subtitle={`by ${book.author}`}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <div className="text-center py-4">
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-blue-600 rounded mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white text-xl sm:text-2xl">
                            📖
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const confirmed = confirm(
                              "Are you sure you want to delete this book?",
                            );
                            if (confirmed) {
                              deleteBook(book.id);
                            }
                          }}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-colors w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center mt-4 sm:mt-6 py-4">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                onClick={() => router.push("/add-books")}
              >
                Add a Book
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
