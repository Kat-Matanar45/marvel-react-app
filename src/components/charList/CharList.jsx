import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '@/components/errorMessage/ErrorMessage'

import './charList.scss';

class CharList extends Component {
    state = {
        char: [],
        loading: true,
        activeId: null,
        error: false,
        newItemLoading: false,
        offset: 1,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateAllChar();
    }

    updateAllChar = (offset) => {
        this.onCharLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoader)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharLoader = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        this.setState(({char, offset}) => ({
            char: [...char, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    setActiveId = (id) => {
        this.setState({ activeId: id });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {loading, activeId, error, newItemLoading, offset, charEnded} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) 
                        ? <CharListView chars={this.state.char} activeId={activeId} setActiveId={this.setActiveId} onCharSelected={this.props.onCharSelected}/> 
                        : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.updateAllChar(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }   
}

const CharListView = ({chars, activeId, setActiveId, onCharSelected}) => {

    const elements = chars.map((item) => {

        const {id, name, thumbnail} = item;

        let imgStyle = {'objectFit' : 'cover'}
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'}
        }

        const handleKeyDown = (event, id) => {
            if (event.key === "Enter") {
                onCharSelected(id); 
            }
        };

        return (
                <li 
                    key={id}
                    className={`char__item ${activeId === id ? 'char__item_selected' : ''}`} 
                    onMouseEnter={() => setActiveId(id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(id)}
                    onBlur={() => setActiveId(null)} 
                    onClick={() => onCharSelected(id)}
                    onKeyDown={(event) => handleKeyDown(event, id)}
                    tabIndex='0'
                >  
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
        )
    })

    return (
        <ul className="char__grid">
            {elements}
        </ul>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;