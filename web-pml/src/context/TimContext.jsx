// TimContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getSubmissionsTim } from './function';

const TimContext = createContext();

export const useTimContext = () => useContext(TimContext);

export const TimProvider = ({ children }) => {
    const [dataTim, setDataTim] = useState(null);
    const [wilayahKerja, setWilayahKerja] = useState();
    const [submissionsList, setSubmissionList] = useState([]);
    const [getSubmissions, setGetSubmission] = useState(false);
    const [submissionListTim, setSubmissionListTim] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('teamData');
        const storedWilayahKerja = localStorage.getItem('wilayahKerja');
        const storedSubmission = localStorage.getItem('submissions');
        if (storedData) {
            setDataTim(JSON.parse(storedData));
        }
        if (storedWilayahKerja) {
            setWilayahKerja(JSON.parse(storedWilayahKerja));
        }
        if (storedSubmission) {
            setSubmissionList(JSON.parse(storedSubmission));
        } else {
            setGetSubmission(true);
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

    const updateDataWilayahKerjaTim = async (data) => {
        try {
            localStorage.setItem('wilayahKerja', JSON.stringify(data));
            setWilayahKerja(data);
        } catch (error) {
            console.error('Gagal mengupdate wilayah kerja tim');
        }
    }

    const updateDataSubmissions = async (data) => {
        try {
            const now = new Date();
            localStorage.setItem('submissions', JSON.stringify(data));
            localStorage.setItem('lastUpdate', now);
            setSubmissionList(data);
        } catch (error) {
            console.error('Gagal mengupdate data submissions');
        }
    }

    useEffect(() => {
        if (submissionsList.length > 0) {
            setSubmissionListTim(getSubmissionsTim(dataTim, submissionsList))
        }
    }, [dataTim, submissionsList])

    // useEffect(() => {
    //     console.log(submissionsList);
    //     console.log(submissionListTim);
    // }, [submissionListTim])


    return (
        <TimContext.Provider value={{ dataTim, updateDataTim, wilayahKerja, updateDataWilayahKerjaTim, submissionsList, updateDataSubmissions, getSubmissions, setGetSubmission, submissionListTim }}>
            {children}
        </TimContext.Provider>
    );
};
