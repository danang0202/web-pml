// TimContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const TimContext = createContext();

export const useTimContext = () => useContext(TimContext);

export const TimProvider = ({ children }) => {
    const [dataTim, setDataTim] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('teamData');
        if (storedData) {
            setDataTim(JSON.parse(storedData));
        }
    }, []);

    const updateDataTim = async (data) => {
        try {
            localStorage.setItem('teamData', JSON.stringify(data));
            setDataTim(data);
        } catch (error) {
            console.error('Gagal memperbarui data tim:', error);
        }
    };

    return (
        <TimContext.Provider value={{ dataTim, updateDataTim }}>
            {children}
        </TimContext.Provider>
    );
};
