import {
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS,
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    DELETE_BOOK_SUCCESS,
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,
    EDIT_BOOK_SUCCESS,
    FETCH_BOOK_ERROR,
    FETCH_BOOK_LOADING,
    FETCH_BOOK_SUCCESS
} from './types';

import {books} from '../data';
import axios from 'axios';
import {history} from '../index';

const url = 'http://localhost:8000/books';

//CREATE
export const createBookSuccess = (data) => {
    return {
        type:ADD_BOOK_SUCCESS,
        payload: data
    }
};

export const createBook = (book) => {
    const data = {
        title: book.title,
        author: book.author,
        year: book.year
    };

    return (dispatch) => {
        return axios.post(url, data)
        .then(response => {
            const id = response.data;

            axios.get(`${url}/${id}`)
            .then(response => {
                const data = response.data;

                const normalizedData = {
                    id: data.ID,
                    title: data.Title,
                    author: data.Author,
                    year: data.Year
                };

                dispatch(createBookSuccess(normalizedData));
                history.push('/');
            }).catch(error => {
                console.log(error);
            });

        }).catch(error => {
            console.log(error);
        });
    }
}

export const fetchBookSuccess = (data) => {
    return {
        type: FETCH_BOOK_SUCCESS,
        payload: data
    }
}

export const fetchBooksLoading = (data) => {
    return {
        type: FETCH_BOOK_LOADING,
        payload: data
    };
};

export const fetchBooksError = (data) => {
    return {
        type: FETCH_BOOK_ERROR,
        payload: data
    };
};

const normalizeResponse = (data) => {
    const arr = data.map(item => {
        const keys = Object.keys(item);

        keys.forEach(k => {
            item[k.toLowerCase()] = item[k];
            delete item[k];
        });

        return item;
    })
    return arr;
}

export const fetchBooks = () => {
    let isLoading = true;

    return (dispatch) => {
        dispatch(fetchBooksLoading(isLoading));
        return axios.get(url)
        .then(response => {
            const data = normalizeResponse(response.data);
            dispatch(fetchBookSuccess(data));
            isLoading = false;
            dispatch(fetchBooksLoading(isLoading));
        }).catch(error => {
            const errorPayload = {};
            errorPayload['message'] = error.response.data.Message;
            errorPayload['status'] = error.response.status;
            dispatch(fetchBooksError(errorPayload));

            isLoading = false;
            dispatch(fetchBooksLoading(isLoading));
        });
    }
}