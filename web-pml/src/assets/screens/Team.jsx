import { Row, Col } from 'react-bootstrap';
import { useTimContext } from '../../context/TimContext';
import { useEffect } from 'react';

function Team() {
    const { dataTim } = useTimContext();


    useEffect(()=>{
        console.log(dataTim);
    },[dataTim])

    return (
        <>
           
        </>
    )
}

export default Team