import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { signin, signup, googlelogin} from "../../api";


export const login = createAsyncThunk("auth/login",
    async({form,navigate,toast},{rejectWithValue}) =>{
        try {

            const res = await signin(form);
            toast("Login succesfully")
            navigate('/')
            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data)
        }
    })

export const register = createAsyncThunk("auth/register",
    async({form,navigate,toast},{rejectWithValue}) =>{
        try {
            console.log("i am in register thunk");
            const res = await signup(form);
            toast.success("Login succesfully")
            navigate('/')
            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data)
        }
    })

export const googleLogin = createAsyncThunk("auth/googlelogin",
    async({result,toast},{rejectWithValue}) =>{
        try {
            const res = await googlelogin(result);
            toast.success("google Login succesfully")
            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data)
        }
    })


const authSclice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false
    },
    reducers:{
        setUser:(state,action) =>{
            state.user = action.payload
        },
        setLogout:(state,action) =>{
            state.user = null;
            localStorage.clear()
        }
    },
    extraReducers:{
        [login.pending]:(state,action) =>{
            state.loading = true;
        },
        [login.fulfilled]:(state,action) =>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
            state.user = action.payload;
        },
        [login.rejected]:(state,action) =>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending]:(state,action) =>{
            state.loading = true;
        },
        [register.fulfilled]:(state,action) =>{
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [register.rejected]:(state,action) =>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [googleLogin.pending]:(state,action) =>{
            state.loading = true;
        },
        [googleLogin.fulfilled]:(state,action) =>{
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [googleLogin.rejected]:(state,action) =>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})
export const {setUser,setLogout} = authSclice.actions; 
export default authSclice.reducer;