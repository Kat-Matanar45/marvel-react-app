import { Component, Fragment } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '@/components/errorMessage/ErrorMessage'

import './charList.scss';

class CharList extends Component {
    state = {
        char: [],
        loading: true,
        activeId: null,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateAllChar();
    }

    updateAllChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoader)
            .catch(this.onError)
    }

    onCharLoader = (char) => {
        this.setState({
            char,
            loading: false
        })
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
        const {loading, activeId, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <CharListView chars={this.state.char} activeId={activeId} setActiveId={this.setActiveId} /> : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }   
}

const CharListView = ({chars, activeId, setActiveId}) => {

    const elements = chars.map((item) => {

        const {id, name, thumbnail} = item;

        return (
            <Fragment key={id}>
                <li 
                    className={`char__item ${activeId === id ? 'char__item_selected' : ''}`} 
                    onMouseEnter={() => setActiveId(id)}
                    onMouseLeave={() => setActiveId(null)}
                >  
                    <img src={thumbnail} alt="abyss"/>
                    <div className="char__name">{name}</div>
                </li>
            </Fragment>
        )
    })

    return (
        <ul className="char__grid">
            {elements}
        </ul>
    )
}

export default CharList;