import {createContext,useContext} from 'react'
import React from 'react'
// This is an alternate method to generate the context by creating a custom provider.
// More efficient way of creating the context as we dont have to import the provider in all the children
// files.
export const ThemeContext=createContext({
themeMode:"light",
darkTheme:()=>{},
lightTheme:()=>{},
});


export const ThemeProvider= ThemeContext.Provider;

export default function useTheme(){
return useContext(ThemeContext);
}