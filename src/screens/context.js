import React, {createContext, useState} from 'react'
import { View, Text } from 'react-native'

const initialState = {
    'Lips': [],
    'Hands':[],
    'Legs': [],
    'Fingers': [],
    'Jawline': [],
    'Eyes': [],
    'Head': [],
    'Hair': [],
    'Knees': [],
    'Feet': [],
    'Elbows': [],
    'Cheeks': [],
    'Nose': [],
    'Neck': [],
    'Arms': [],
    'Stomach': [],
    'Navel': [],
    'Others': []
}
export const GlobalContext = createContext()
export default function Context(props) {
    const [state, setstate] = useState(initialState)
    return (
        <GlobalContext.Provider value={[state,setstate]}>
            {props.children}
        </GlobalContext.Provider>
    )
}

