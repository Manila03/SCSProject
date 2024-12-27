import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getBookByTitle = createAsyncThunk("book/getBookByTitle",async (title) => {
    const { data } = await axios.get(`http://localhost:4002/book/title/${title}`);
    return data;
});

// export const getAllBooks = createAsyncThunk("book/getAllBooks",async () => {
//     const { data } = await axios.get("http://localhost:4002/book/all");
//     return data;
// })

export const getBookByIsbn = createAsyncThunk("book/getBookByIsbn",async (isbn) => {
    const { data } = await axios.get(`http://localhost:4002/book/isbn/${isbn}`);
    return data;
})

export const getAllBooks = createAsyncThunk(
    "book/getAllBooks",
    async (params = {}) => {
    const { page = 0, size} = params;

    let url;
    if (page || size) {
    url = `http://localhost:4002/book/all?page=${page}&size=${size}`;
    } else {
    url = `http://localhost:4002/book/all`;
    }
    
    const { data } = await axios(url);
    return data;
});

export const createBook = createAsyncThunk("book/create",async (book) => {
    const { data } = await axiosInstance.post("http://localhost:4002/book/create", book);
    console.log(book);
    return data;
})

export const updateBook = createAsyncThunk("book/update", async ({ isbn, book }) => {
    const { data } = await axiosInstance.put(`http://localhost:4002/book/mod/${isbn}`, book);
    return data;
})

export const deleteBook = createAsyncThunk("book/delete",async (isbn) => {
    try{ 
        await axiosInstance.delete(`http://localhost:4002/book/delete/${isbn}`);
        return isbn;
    } catch (error) {
        throw new Error("Error al eliminar el libro");
    }
    
})

export const getBooksByGenre = createAsyncThunk(
    "book/getBooksByGenre",
    async ({ genre, page = 0, size }) => {
        let url;
        if (page || size) {
            url = `http://localhost:4002/book/genre/${genre}?page=${page}&size=${size}`;
        } else {
            url = `http://localhost:4002/book/genre/${genre}`;
        }
        
        const { data } = await axios(url);
        return data;
    }
);


const bookSlice = createSlice({
    name: "books",
    initialState: {
        items: {
            content: [], 
            pageable: {
                pageNumber: 0,
                pageSize: null,
                sort: {
                    empty: true,
                    sorted: false,
                    unsorted: true
                },
                offset: 0,
                paged: true,
                unpaged: false
            },
            last: true,
            totalElements: 0,
            totalPages: 0,
            size: null,
            number: 0,
            sort: {
                empty: true,
                sorted: false,
                unsorted: true
            },
            first: true,
            numberOfElements: 0,
            empty: false
        },
        loading: false,
        error: null,
        book: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(getBookByTitle.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getBookByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
        })
        .addCase(getBookByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })


        .addCase(getBookByIsbn.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(getBookByIsbn.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Libro recibido:", action.payload);
            state.book = action.payload;
        })
        .addCase(getBookByIsbn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })
        

        .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        })
        .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

        .addCase(getBooksByGenre.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getBooksByGenre.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
            })
            .addCase(getBooksByGenre.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            })

        
        .addCase(createBook.pending, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(createBook.fulfilled, (state, action) => {
            state.loading = false;
            state.items.content.push(action.payload);
        })
        
            .addCase(createBook.rejected, (state, action) => {
            state.error = action.error.message;
        })


        .addCase(updateBook.pending, (state) => {
            state.loading=true;
            state.error = null;
        })
        .addCase(updateBook.fulfilled, (state, action) => {
            state.loading = false;
            state.items = {
            ...state.items,
            content: state.items.content.map((book) => 
                book.isbn === action.payload.isbn ? action.payload : book
            )
            }
        })

        .addCase(updateBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })


        .addCase(deleteBook.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
            state.loading = false;
            const isbnToDelete = action.payload;
            const originalLength = state.items.content.length;
        
            state.items.content = state.items.content.filter(
                (book) => book.isbn !== isbnToDelete
            );
        
            if (state.items.content.length < originalLength) {
                console.log(`Libro con ISBN ${isbnToDelete} eliminado correctamente.`);
            } else {
                console.log(`No se encontró ningún libro con ISBN ${isbnToDelete}.`);
            }
        })
        .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })
    }
});

export default bookSlice.reducer;