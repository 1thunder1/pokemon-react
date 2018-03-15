/**
*
* SearchForm
*
*/

import React from 'react';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import './styles.scss';

const SearchForm = ({ handleSubmit, intl, filteredType, removeFilters }) => { 
    const removeFiltersBadge = ((filteredType) ? (
        <span onClick={removeFilters} className="remove__filters">Remove filter by { filteredType }</span>
    ) : null);

    return (
        <form
            onSubmit={handleSubmit}
            className="search__container"
        >
            <div className="form-group">
                <Field
                    component="input"
                    type="text"
                    className="form-control"
                    name="query"
                    placeholder={
                        intl.formatMessage(messages.searchPlaceholder)
                    }
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary pull-right">
                    <FormattedMessage {...messages.submit} />
                </button>

                {
                    removeFiltersBadge
                }
                
            </div>
        </form>
    );
}

const SearchFormWithReduxForm = reduxForm({
  form: 'search',
})(SearchForm);

export default injectIntl(SearchFormWithReduxForm);
