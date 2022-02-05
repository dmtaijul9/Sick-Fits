import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await signup().catch((err) => {
      console.log(err);
    });
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={submitHandler}>
      <h2>Sign Up For An Account</h2>
      {data?.createUser && (
        <p>
          Signed up with {data?.createUser.email} - please go head and Sing in
        </p>
      )}
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
