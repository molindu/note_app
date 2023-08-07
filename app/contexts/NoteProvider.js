import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext();
const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        // console.log(result);
        if (result !== null) setNotes(JSON.parse(result));
    }

    useEffect(() => {
        findNotes();
        // AsyncStorage.clear();
        // findGreet();
    }, []);

    return (
        <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

const styles = StyleSheet.create({})

export const useNotes = () => useContext(NoteContext); 
export default NoteProvider;