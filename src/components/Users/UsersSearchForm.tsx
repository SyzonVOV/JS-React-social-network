import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { TUsersFilters } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import userSelectors from '../../redux/selectors/users-selector';

type TProps = {
  onFilterChanged: (arg: TUsersFilters) => void,
}

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
}

export const UsersSearchForm = (props: TProps) => {

  const {onFilterChanged} = props

  const term: string = useSelector( userSelectors.selectTerm )
  const friend: string = useSelector( userSelectors.selectFriend )

  const submit = (values: TUsersFilters, { setSubmitting }: FormikHelpers<TUsersFilters>) => {
    onFilterChanged( values);
    setSubmitting(false);
  }

  return <div>
    <h3>Find users!</h3>
    <Formik
      enableReinitialize={true}
      initialValues={ { term, friend } }
      validate={ usersSearchFormValidate }
      onSubmit={ submit }
    >
      { ({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term"/>
          <Field name="friend" as="select">
            <option value="">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          <button type="submit" disabled={ isSubmitting }>
            Find
          </button>
        </Form>
      ) }
    </Formik>
  </div>
}