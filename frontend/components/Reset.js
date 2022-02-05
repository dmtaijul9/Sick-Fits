import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token: token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const customError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await reset().catch((err) => {
      console.log(err);
    });
    console.log(res);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={submitHandler}>
      <h2>Reset Your Password</h2>
      {data?.redeemUserPasswordResetToken === null && (
        <p>You can now sign in.</p>
      )}
      <DisplayError error={error || customError} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Reset!</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
