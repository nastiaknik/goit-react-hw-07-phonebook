import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const agent = axios.create({
  baseURL: 'https://643e5caf6c30feced8265963.mockapi.io',
});

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (signal, { rejectWithValue }) => {
    try {
      const response = await agent.get('/contacts', { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await agent.delete(`contacts/${id}`);
      return response.data.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await agent.post('contacts', contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'contacts/toggleFavorite',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await agent.put(`contacts/${contact.id}`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await agent.put(`contacts/${contact.id}`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
