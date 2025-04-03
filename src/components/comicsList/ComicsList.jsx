import { useEffect, useState } from 'react';

import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        getAllComics()
            .then(onComicsLoader)
    }, [])

    const onComicsLoader = (comics) => {
        setComics(comics)
    }

    return (
        <div className="comics__list">
            <ComicsListView comics={comics}/>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicsListView = ({comics}) => {

    const comicBook = comics.map(item => {
        const {id, title, price, thumbnail} = item;

        return (
            <li key={id} className="comics__item">
                <a href="#">
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}$</div>
                </a>
            </li>
        )
    })

    return (
        <ul className="comics__grid">
            {comicBook}
        </ul>
    )
}

export default ComicsList;