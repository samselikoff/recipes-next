import Link from "next/link";
import { Formik } from "formik";
import { request } from "graphql-request";

const API = "https://samselikoff-recipes-backend.herokuapp.com/v1/graphql";
const mutation = `
  mutation insert_articles($objects: [recipes_insert_input!]!) {
    insert_recipes(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export default function New() {
  return (
    <div>
      <header className="p-4 border-b-2 border-gray-200 flex items-center relative justify-center">
        <Link href="/">
          <a className="ml-4 absolute left-0 flex items-center text-blue-500 focus:outline-none focus:shadow-outline rounded-full p-1 pr-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            Back
          </a>
        </Link>
        <h1 className="text-center text-3xl font-semibold text-gray-700">
          New Recipe
        </h1>
      </header>

      <main>
        <div className="mt-8 px-6">
          <Formik
            initialValues={{
              name: "",
              imageUrl: "",
              ingredients: "",
              instructions: "",
              recipeUrl: "",
            }}
            onSubmit={(values) => {
              const variables = { objects: [values] };
              request(API, mutation, variables);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Spaghetti with Meatballs"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Image URL
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="imageUrl"
                        value={values.imageUrl}
                        onChange={handleChange}
                        placeholder="https://www.budgetbytes.com/wp-content/uploads/2018/01/Sheet-Pan-BBQ-Meatloaf-Dinner-V2.jpg"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="ingredients"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Ingredients
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <textarea
                        id="ingredients"
                        rows="3"
                        value={values.ingredients}
                        onChange={handleChange}
                        placeholder="Butter and sugar"
                        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="instructions"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Instructions
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <textarea
                        id="instructions"
                        value={values.instructions}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Mix em' up!"
                        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="recipeUrl"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Original Recipe URL
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="recipeUrl"
                        value={values.recipeUrl}
                        onChange={handleChange}
                        placeholder="https://www.budgetbytes.com/sheet-pan-bbq-meatloaf-dinner/"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-5">
                  <div className="flex justify-end">
                    <span className="ml-3 inline-flex rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                      >
                        Save
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
