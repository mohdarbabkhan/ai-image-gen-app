import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPosts} from "../../api";

export const getPost = createAsyncThunk("post/getpost",
    async() => {
        try {
            const res = await fetchPosts();
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    })

export const createPost = createAsyncThunk("post/createpost",
    async(post) => {
        try {
            const res = await createPosts(post);
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    }
)

const postSlice = createSlice({
    name:'post',
    initialState:{
        data:[],
        error:"",
        loading:false
    },
    
    extraReducers:{
        [getPost.pending]:(state,action) =>{
            state.loading = true;
        },
        [getPost.fulfilled]:(state,action) =>{
            state.loading = false;
            state.data = action.payload
        },
        [getPost.rejected]:(state,action) =>{
            state.error = action.payload.meassage;
            state.loading = false;
        },
        [createPost.pending]:(state,action) =>{
            state.loading = true;
        },
        [createPost.fulfilled]:(state,action) =>{
            state.loading = false;
            state.data = action.payload
        },
        [createPost.rejected]:(state,action) =>{
            state.error = action.payload.meassage;
            state.loading = false;
        },
    }
})

export default postSlice.reducer;