import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  console.log(inputs);

  const [requestReset, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await requestReset().catch((err) => {
      console.log(err);
    });
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={submitHandler}>
      <h2>Request For Reset Your Password</h2>
      {data?.sendUserPasswordResetLink === null && (
        <p>We just send a temporary password. Please check your email.</p>
      )}
      <DisplayError error={error} />
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

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
