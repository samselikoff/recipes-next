import { buildSchema, graphql } from "graphql";
import { Server, Model } from "miragejs";
import recipes from "./recipes";

// Construct a schema, using GraphQL schema language
let graphqlSchema = buildSchema(`
  type Query {
    recipes(order_by: [recipes_order_by!]): [recipes!]!
  }
  type Mutation {
    insert_recipes(objects: [recipes_insert_input!]!): recipes_mutation_response!
  }
  type recipes {
    id: Int!
    name: String!
    imageUrl: String
    recipeUrl: String
    ingredients: String
    instructions: String
  }
  input recipes_insert_input {
    id: Int
    name: String
    imageUrl: String
    ingredients: String
    instructions: String
    recipeUrl: String
  }
  input recipes_order_by {
    id: order_by 
    name: order_by 
  }
  enum order_by {
    asc
    asc_nulls_last
    asc_nulls_first
    desc
    desc_nulls_first
    desc_nulls_last
  }
  type recipes_mutation_response {
    returning: [recipes!]!
  }
  `);

export default function makeServer() {
  if (typeof window !== "undefined") {
    if (window.server) {
      window.server.shutdown();
      delete window.server;
    }

    window.server = new Server({
      models: {
        recipe: Model,
      },

      seeds(server) {
        server.db.loadData({ recipes });
      },

      routes() {
        this.urlPrefix = "https://samselikoff-recipes-backend.herokuapp.com";

        this.post("/v1/graphql", (schema, request) => {
          let requestJson = JSON.parse(request.requestBody);
          let query = requestJson.query;
          let variables = requestJson.variables;

          let resolver = {
            recipes(queryArgs) {
              let recipes = JSON.parse(JSON.stringify(schema.db.recipes));

              if (queryArgs.order_by) {
                queryArgs.order_by.forEach((ordering) => {
                  let key = Object.keys(ordering)[0];
                  recipes = recipes.sort((a, b) => (a[key] > b[key] ? 1 : -1));
                });
              }

              return recipes;
            },

            insert_recipes(mutationArgs) {
              let newRecipes = mutationArgs.objects.map((recipe) => {
                return schema.db.recipes.insert(recipe);
              });

              return {
                returning: newRecipes,
              };
            },
          };

          return graphql(graphqlSchema, query, resolver, null, variables).then(
            (response) => {
              return response;
            }
          );
        });
      },
    });
  }
}
