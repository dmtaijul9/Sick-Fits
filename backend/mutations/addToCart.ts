import { Session } from "./../types";
import { CartItemCreateInput } from "./../.keystone/schema-types";
import { KeystoneContext } from "@keystone-next/types";

const addToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  console.log("Adding to card");

  //1. Query the current user see if they are signed in

  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("You must be logged in to do this!");
  }

  //2. Query the current users cart

  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: "id,quantity",
  });

  //3. See if the current item is in their cart
  const [existingCartItem] = allCartItems;

  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increament by 1`
    );

    //4. if it is , increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });
  }
  //5. if it is't , create a new cart item!
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
};

export default addToCart;