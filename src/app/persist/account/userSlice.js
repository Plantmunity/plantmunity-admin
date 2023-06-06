import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  first_name: null,
  middle_name: null,
  last_name: null,
  username: null,
  user_type: null,
  address: null,
  contact: null,
  email: null,
  image: null,
  bio_note: null,
  sex: null,
  profile_cover: null,
  type: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setPersonalDetails: (
      state,
      {
        payload: {
          id,
          first_name,
          middle_name,
          last_name,
          username,
          user_type,
          address,
          contact,
          email,
          image,
          bio_note,
          sex,
          profile_cover,
          type,
        },
      }
    ) => {
      state.id = id;
      state.first_name = first_name;
      state.middle_name = middle_name;
      state.last_name = last_name;
      state.username = username;
      state.user_type = user_type;
      state.address = address;
      state.contact = contact;
      state.email = email;
      state.image = image;
      state.bio_note = bio_note;
      state.sex = sex;
      state.profile_cover = profile_cover;
      state.type = type;
    },
    resetPersonalDetails: (state) => {
      state.id = null;
      state.first_name = null;
      state.middle_name = null;
      state.last_name = null;
      state.username = null;
      state.user_type = null;
      state.address = null;
      state.contact = null;
      state.email = null;
      state.image = null;
      state.bio_note = null;
      state.sex = null;
      state.profile_cover = null;
      state.type = null;
    },
  },
});

export const { setPersonalDetails, resetPersonalDetails } = userSlice.actions;

export default userSlice.reducer;
