import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";


export const useAuthstore = create((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,
    error: null,

    clearError: () => set({ error: null }),

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {
            const res = await axiosInstance.get("auth/check")

            if (res.data.success) {
                set({
                    authUser: res.data.user,
                    error: null
                });
                toast.success("succesfully get the user")

            }
            else {
                set({ authUser: null })
            }
        } catch (error) {
            console.log("❌ fetching user  failed:", error.response?.data?.message || error.message);
            set({
                authUser: null,
                error: error.response?.data?.message || "getting user  failed"
            })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    singup: async (data) => {
        set({ isSigningUp: true, error: null })
        try {
            const res = await axiosInstance.post("auth/singup", data)

            set({
                authUser: res.data.user,
                error: null
            })
            toast.success("user created succesfully")
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Signup failed";
            set({ error: errorMessage });
            toast.error(errorMessage)

        }
        finally{
            set({isSigningUp:false})
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true,error:null})

        try {
            const res=await axiosInstance.post("auth/login",data)

            set({
                authUser:res.data.user,
                error:null
            })
            toast.success("user loggedin Succesfully")
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "login failed";
            set({ error: errorMessage });
            toast.error(errorMessage)
            
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        set({ error: null })
        try {
            await axiosInstance.post("auth/logout")
            set({authUser:null,error:null})
            toast.success("user loggedOut succesfully")

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Logout failed";
            set({ authUser: null, error: errorMessage });
            toast.error(errorMessage)
        }
    }
}))