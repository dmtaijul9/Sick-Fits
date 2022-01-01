import UpdateProduct from "../components/UpdateProduct";

const update = ({ query }) => {
  return <UpdateProduct id={query.id} />;
};
export default update;
