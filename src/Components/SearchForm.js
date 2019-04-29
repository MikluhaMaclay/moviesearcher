import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const SearchForm = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <FormGroup>
          <Label for="searchField">Type to Search</Label>
          <Input
            type="text"
            name="query"
            id="searchField"
            onChange={(e) => {
              props.handleQueryChange(e.target.value);
            }}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default SearchForm;
