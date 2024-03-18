import { axiosPublic } from "@/configs/axios";
import { BookType } from "@/types/bookTypes";

export interface EditBookInterface {
  id: string;
  book: BookType;
}


export const getAllBooks = async () => {
  try {
    const {data} = await axiosPublic.get(`/books`);
    return data;
  } catch (error) {
    return error;
  }
}

export const addBook = async ( data:BookType) => {
  try {
    const response = await axiosPublic.post(`/books`, data)
    console.log(response);
  } catch (error) {
    return error;
  }
}

export const updateBook = async (params:EditBookInterface) => {
  try {
    const response = await axiosPublic.put(`/books/${params.id}`, params.book)
    console.log(response);
  } catch (error) {
    return error;
  }
}

export const getBookById = async (id:number) => {
  
  try {
    const {data} = await axiosPublic.get(`/books/${id}`);
    return data;
    
  } catch (error) {
    return error;
  }
}

export const deleteBook = async (id:string) => {
  try {
    const response = await axiosPublic.delete(`/books/${id}`)
    console.log(response);
  } catch (error) {
    return error;
  }
}











