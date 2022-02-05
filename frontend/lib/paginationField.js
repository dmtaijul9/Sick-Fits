import { PAGINATION_QUERY } from "../components/Pagination";

const paginationField = () => {
  return {
    keyArgs: false, //Tells apollo we will take care of everything
    read: (existing = [], { args, cache }) => {
      const { first, skip } = args;

      // Read the number of items on the page from the cache/

      const data = cache.readQuery({ query: PAGINATION_QUERY });

      const count = data?._allProductsMeta?.count;

      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      //if
      //there are items
      //And there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // Then just sen it

      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have any items , we must go to the network to fetch them.

        return false;
      }

      // if there are items , just return theme from the cache , and we don't need to go to the network

      if (items.length) {
        return items;
      }

      return false;

      // First thing it does it asks the read function for those items.
      // We can either do one of two things:
      // First things we can do is return the items because they are already in the cache .
      //The other thing we can do is to return false from here,  ( network request)
    },
    merge: (existing, incoming, { args }) => {
      //This runs when the apollo client comes back from the network with our product

      const { skip, first } = args;

      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);

      // finally we return the merged items from the cache .

      return merged;
    },
  };
};

export default paginationField;
