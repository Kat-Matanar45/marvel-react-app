import {useState} from 'react'; 
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import '../charSearchForm/charSearchForm.scss';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();
    const {register, handleSubmit, formState: { errors },} = useForm({mode: 'onChange'});

    const onSubmit = ({nameChar}) => {
        let searchNameChar = nameChar.toLowerCase().trim().replace(/\s+/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        updateChar(searchNameChar)
    };

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
    }

    console.log(char)

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <form className="char__search-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input type='text' id='charName' placeholder='Enter name' 
                {...register('nameChar', {
                    required: 'Введите имя персонажа'
                })}
                aria-invalid={errors.nameChar ? "true" : "false"}
                />
                <button type='submit' className="button button__main" disabled={loading}>
                    <div className="inner">Find</div>
                </button>
            </div>
            {errors.nameChar && <div className="char__search-error">{errors.nameChar.message}</div>}
            {errorMessage}
            {results}
        </form>
    )
}

export default CharSearchForm;