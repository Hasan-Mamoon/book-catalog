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
      const respone = await fetch(`/api/books?bookId=${bookId}`, {
        method: "DELETE",
      });
      if (!respone.ok) {
        console.log(respone)
        throw new Error("Failed to delete book");
      }
      refetch();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Section 1: Welcome */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <p className="text-8xl">
            Welcome,{" "}
            <span className="text-blue-600">Mr.{session?.user?.name}</span>
          </p>
          <p className="text-4xl">Today is {today}</p>

          <div className="flex flex-col items-center space-y-4 animate-bounce">
            <p className="text-lg text-gray-400 font-medium mt-6">
              Scroll down to continue to catalogue
            </p>
            <div className="flex flex-col space-y-1">
              <div className="w-6 h-6 border-r-2 border-b-2 border-gray-600 transform rotate-45 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Book Catalog */}
      <section className="h-screen flex flex-col justify-center snap-start bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-5xl font-bold text-center mb-12">Your Books:</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="text-center text-red-600">
              <p>Error loading books: {error}</p>
            </Card>
          ) : books.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <Card
                  key={book.id}
                  title={book.title}
                  subtitle={`by ${book.author}`}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Simple content with just book name and author */}
                  <div className="text-center py-4">
                    <div className="w-16 h-20 bg-blue-100 rounded mx-auto mb-3 flex items-center justify-center">
                      <span className="text-blue-600 text-2xl">📖</span>
                    </div>
                    <button
                      onClick={() => {
                        const confirmed = confirm(
                          "Are you sure you want to delete this book?"
                        );
                        if (confirmed) {
                          deleteBook(book.id);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/add-books")}
            >
              Add a Book
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
