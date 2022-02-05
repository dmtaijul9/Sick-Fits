import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const rounter = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );

  const findItemsButChill = debounce(findItems, 350);
  const items = data?.searchTerms || [];

  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange: () => {
      console.log("Input changed!");

      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });

      console.log("running");
    },
    onSelectedItemChange: (selectedItem) => {
      console.log("Selected Item Changed!");
      rounter.push({
        pathname: `/product/${selectedItem?.selectedItem?.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items?.map((item, index) => {
            return (
              <DropDownItem
                key={item.id}
                {...getItemProps({ item })}
                highlighted={index === highlightedIndex}
              >
                <img
                  src={item?.photo?.image?.publicUrlTransformed}
                  alt="hello"
                  width={50}
                />
                {item?.name}
              </DropDownItem>
            );
          })}

        {isOpen && !items?.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
