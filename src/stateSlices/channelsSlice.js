/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    defaultChannelId: 1,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels
        .filter((channel) => channel.id !== action.payload.id);

      if (state.currentChannelId === action.payload.id) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const renamedChannel = state.channels.find((channel) => channel.id === id);
      renamedChannel.name = name;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const {
  setChannels, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
