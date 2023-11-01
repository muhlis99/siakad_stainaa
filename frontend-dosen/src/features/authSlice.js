import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("User/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('v1/login/in', {
            username: user.name,
            password: user.password
        })
        return response.data
    } catch (error) {
        if (error.response.data.message) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        } else {
            const message = error.response.data.errors[0].msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get('v1/login/me')
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const ResetPass = createAsyncThunk("user/ResetPass", async (user, thunkAPI) => {
    try {
        const response = await axios.put(`v1/login/resetPasswordByForgot/${user.id}`, {
            newPassword: user.newPass,
            confirmNewPassword: user.confirmPass
        })
        return response.data
    } catch (error) {
        if (error.response.data.message) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        } else {
            const message = error.response.data.errors[0].msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await axios.delete('v1/login/out')
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(ResetPass.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(ResetPass.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(ResetPass.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer