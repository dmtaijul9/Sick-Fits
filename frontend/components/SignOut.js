import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return <button onClick={signout}>Sign Out</button>;
};

export default SignOut;
