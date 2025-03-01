import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        char: [],
        count: 0
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

    updateCount = () => {
        this.setState({count} = ({
            count: count + 1
        }))
    }

    onCharLoader = (char) => {
        this.setState({char})
        console.log(char)
    }

    render() {
        console.log(this.state.char)
        const elements = this.state.char.map(item => {

            const {name, thumbnail} = item;
            console.log(item)
    
            return (
                <CharItem 
                    key={() => {this.updateCount}} 
                    name = {name}
                    thumbnail = {thumbnail}
                />
            )
        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {elements}
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
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }   
}

const CharItem = (name, thumbnail) => {

    return (
        <li className="char__item">
            <img src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;