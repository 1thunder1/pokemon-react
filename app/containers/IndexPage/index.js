/**
 *
 * IndexPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Loader from 'react-loader';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectIndexPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import SearchForm from 'components/SearchForm';
import Pokemon from 'components/Pokemon';

import { loadAction, loadOneAction, loadByTypeAction } from './actions';

import _ from 'lodash';
import ReactPaginate from 'react-paginate';

import './styles.scss';

class IndexPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    search = ({query}) => {
        this.props.dispatch(loadAction({query}));
    };

    componentDidMount() {
        this.props.dispatch(loadAction({ page: 0 }));
    }

    loadByName = (name) => {
        this.props.dispatch(loadOneAction(name));
    };
    loadByType = (type) => {
        this.props.dispatch(loadByTypeAction({ type, page: 0 }));
    };
    removeFilters = () => {
        this.props.dispatch(loadAction({ page: 0 }));
    };

    handlePageClick = (data) => {
        if (this.props.indexPage.type)
            this.props.dispatch(loadByTypeAction({ type: this.props.indexPage.type, page: data.selected }));
        else
            this.props.dispatch(loadAction({ page: data.selected }));
    };
    
    render() {
        const rows = [ ];

        _.forEach(this.props.indexPage.data.results, (pokemon, i) => {
            rows.push(
                <Pokemon 
                    pokemon={pokemon} 
                    key={pokemon.name} 
                    loadByName={this.loadByName}
                    loadByType={this.loadByType}
                />
            );
        });

        return (
            <div className="container">
                <Helmet>
                    <title>Pokemon Demo</title>
                </Helmet>
                <Loader loaded={!this.props.indexPage.isLoading}>
                    <SearchForm 
                        onSubmit={this.search} 
                        getFormState={st => st.get('form')} 
                        initialValues={
                            {
                                query: this.props.indexPage.query,
                            }
                        }
                        query={this.props.indexPage.query}
                        filteredType={ this.props.indexPage.type }
                        removeFilters={this.removeFilters}
                    />
                    <div className="pokemons__grid">
                        { rows }
                    </div>

                    {
                        (this.props.indexPage.data.count > 10) ? (
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                forcePage={this.props.indexPage.page}
                                breakClassName={"break"}
                                pageCount={ Math.ceil(this.props.indexPage.data.count / 10) }
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                        ) : null
                    }
                            
                </Loader>
            </div>
        );
    }
}

IndexPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    indexPage: makeSelectIndexPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'indexPage', reducer });
const withSaga = injectSaga({ key: 'indexPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(IndexPage);
