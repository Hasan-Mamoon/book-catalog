import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase-admin";
import bcrypt from "bcrypt";
import Link from "next/link";

async function signupAction(formData: FormData) {
  "use server";

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if user exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 12);

  const { error } = await supabase
    .from("users")
    .insert([{ username, email, password: hashedPassword }]);

  if (error) {
    throw new Error("Failed to create account");
  }

  redirect("/auth/signin");
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold">
            Create your account
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm">
            Or{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form
          action={signupAction}
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs sm:text-sm font-medium"
              >
                Full Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password (min 6 characters)"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
