import { Field, Form, Formik } from "formik";

const SearchBar = ({ handleSearch }) => {
  const initialValues = { search: "" };

  const onSubmit = (values, actions) => {
    handleSearch(values.search);
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
