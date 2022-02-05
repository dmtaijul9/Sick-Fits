import { extendGraphqlSchema } from "./mutations/index";
import { CartItem } from "./schemas/CartItem";
import { sendPasswordResetEmail } from "./lib/mail";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  statelessSessions,
  withItemData,
} from "@keystone-next/keystone/session";
import { ProductImage } from "./schemas/ProductImage";
import { Product } from "./schemas/Product";
import { User } from "./schemas/User";
import { insertSeedData } from "./seed-data";
import "dotenv/config";

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],

    // TODO: Add in initial roles here
  },
  passwordResetLink: {
    sendToken: async (args: any) => {
      // send an email

      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      // TODO: add data seeding here
      async onConnect(keystone) {
        console.log("database connected");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    extendGraphqlSchema: extendGraphqlSchema,
    ui: {
      // show the ui only for people who pass this test .
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: "id email name",
    }),
  })
);
