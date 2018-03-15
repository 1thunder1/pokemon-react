/**
*
* Pokemon
*
*/

import React from 'react';
// import styled from 'styled-components';
import * as Loader from 'react-loader';
import './styles.scss';

import _ from 'lodash';

class Pokemon extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
    	if (!this.props.pokemon.isLoaded)
    		this.props.loadByName(this.props.pokemon.name);
    }
    render() {
    	const types = [ ];
        if (this.props.pokemon.details)
            _.forEach(this.props.pokemon.details.types, (type, i) => {
                types.push(
                    <span 
                        className={ "badge pokemon__badge pokemon__badge__" + type.type.name }
                        key={type.type.name}
                        onClick={() => this.props.loadByType(type.type.name)}
                    >
                        { type.type.name }
                    </span>
                );
            });
        return (
            <div className="pokemon__item">
            	<div 
            		className="pokemon__item__avatar"
            		style={ 
            			{
            				backgroundImage: this.props.pokemon.details ? 'url(' + this.props.pokemon.details.sprites.front_default + ')' : '' 
            			}
            		}
            	>
            		<Loader loaded={this.props.pokemon.isLoaded} />
            	</div>
                <div className="pokemon__item__info">
            	   { this.props.pokemon.name.charAt(0).toUpperCase() + this.props.pokemon.name.slice(1) } <br />
                   { types }
                </div>
            </div>
        );
    }
}

Pokemon.propTypes = {

};

export default Pokemon;
