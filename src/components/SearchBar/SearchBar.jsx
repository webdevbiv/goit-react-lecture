import { Field, Form, Formik } from "formik";

const SearchBar = () => {
  const initialValues = { search: "" };

  const onSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field type="text" name="search" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </>
  );
};

export default SearchBar;
