import { EditBookInterface, addBook, deleteBook, getAllBooks, getBookById, updateBook } from "@/services/bookService";
import { BookType } from "@/types/bookTypes";
import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit"

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}


interface initialStateInterface {
  meBooks: BookType[] | [];
  loading: boolean;
  error: null | unknown;
}

const initialState:initialStateInterface = {
  meBooks: [],
  loading: false,
  error: null,
}

export const fetchMeBooks = createAsyncThunk('book/fetchMeBooks', async () => {
  return await getAllBooks();
})

export const editBook = createAsyncThunk('book/editBook', async (params:EditBookInterface) => {
  return await updateBook(params);
})


export const addNewBook = createAsyncThunk('book/addNewBook', async (data:BookType) => {
  return await addBook(data);
})

export const fetchBookById = createAsyncThunk('book/fetchBookById', async (id:number) => {
  return await getBookById(id);
})

export const bookDeleted = createAsyncThunk('book/bookDeleted', async (id:string, { dispatch }: Redux) => {
  try {
    await deleteBook(id);
    dispatch(fetchMeBooks());
  } catch (error) {
    return error;
  }
})

export const placeSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMeBooks.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchMeBooks.fulfilled, (state, action) => {
      state.meBooks = action.payload;
      state.loading = false;
    })
    .addCase(fetchMeBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase(editBook.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(editBook.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(editBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase(addNewBook.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(addNewBook.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(addNewBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase(fetchBookById.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchBookById.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(fetchBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase(bookDeleted.pending, (state, action) =>{
      state.loading = true;
    })
    .addCase(bookDeleted.fulfilled, (state, action) =>{
      state.loading = false;
    })
    .addCase(bookDeleted.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    
  }
})

export default placeSlice.reducer
