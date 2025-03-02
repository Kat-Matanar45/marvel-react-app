import { Component, Fragment } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        char: [],
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateAllChar();
    }

    updateAllChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoader)
    }

    onCharLoader = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    render() {
        const {loading} = this.state;

        return (
            <div className="char__list">
                    {loading ? <Spinner/> : <CharListView chars={this.state.char}/>}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }   
}

const CharListView = ({chars}) => {
    const elements = chars.map((item) => {

        const {id, name, thumbnail} = item;

        return (
            <Fragment key={id}>
                <li className="char__item">
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

                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}