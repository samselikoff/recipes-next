import { request } from "graphql-request";
import useSWR from "swr";
import { AspectRatio } from "@ui";
import Link from "next/link";

const API = "http://samselikoff-recipes-backend.herokuapp.com/v1/graphql";
const fetcher = (query) => request(API, query);

export default function Home() {
  const { data, error } = useSWR(
    `{
      recipes(order_by: {name: asc}) {
        id
        name
        imageUrl
      }
    }`,
    fetcher
  );

  return (
    <div>
      <header className="p-4 border-b-2 border-gray-200 flex justify-center items-center relative">
        <h1 className="text-3xl font-semibold text-gray-700">All Recipes</h1>
        <Link href="/new">
          <a className="absolute right-0 mr-4 flex items-center text-blue-500 focus:outline-none focus:shadow-outline rounded-full p-1 pr-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4"></path>
            </svg>
            Add
          </a>
        </Link>
      </header>

      <main className="p-4 mt-4">
        {!data ? (
          <p>Loading...</p>
        ) : (
          <div className="px-12 space-y-12">
            {data.recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <AspectRatio ratio={4 / 5}>
                  <img
                    src={recipe.imageUrl}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
                <p className="bg-white m-2 rounded px-2 py-1 bg-opacity-90 text-sm font-semibold absolute bottom-0 inset-x-0">
                  {recipe.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
