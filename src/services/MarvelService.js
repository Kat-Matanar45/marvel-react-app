import useHttp from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = `apikey=${import.meta.env.VITE_API_KEY}`;
    const _baseOffset = 1;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const textDescription = char.description === '' ? "Подробная информация отсутствует" : char.description.length > 200 ? char.description.slice(0, 200) + '...' : char.description;
        return {
            id: char.id,
            name: char.name,
            description: textDescription,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount ? comics.pageCount : `No information about the number of pages`,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price,          
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;