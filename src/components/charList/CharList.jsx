import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '@/components/errorMessage/ErrorMessage'

import './charList.scss';

const CharList = (props) => {

    const [char, setChar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeId, setActiveId] = useState(null);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateAllChar()
    }, [] 
    )

    const updateAllChar = (offset) => {
        onCharLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharLoader)
            .catch(onError)
    }

    const onCharLoading = () => {
        setNewItemLoading(true)
    }

    const onCharLoader = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setChar(char => [...char, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const setActiveID = (id) => {
        setActiveId(id);
    }

    const onError = () => {
        setLoading(false);
        setError(true)
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) 
                        ? <CharListView chars={char} activeId={activeId} setActiveId={setActiveID} onCharSelected={props.onCharSelected}/> 
                        : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => updateAllChar(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        ) 
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