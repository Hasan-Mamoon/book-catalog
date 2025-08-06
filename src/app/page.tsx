"use client";
import { useSession } from "next-auth/react";
import Card from "@/components/card";
import { useRouter } from "next/navigation";


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      <section className="h-screen flex items-center justify-center snap-start bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-5xl font-bold text-center mb-12">Your Book Catalog</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Total Books" className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <p className="text-gray-600">in your collection</p>
            </Card>
            
            <Card title="Currently Reading" className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-gray-600">books in progress</p>
            </Card>
            
            <Card title="Completed" className="text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <p className="text-gray-600">books finished</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors" onClick={()=>{router.push("/add-books")}}>
              Add Your First Book
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
