import { Row, Col } from 'react-bootstrap';
import { useTimContext } from '../../context/TimContext';
import { useEffect } from 'react';

function Team() {
    const { dataTim, submissionsList, wilayahKerja } = useTimContext();


    useEffect(() => {
        console.log(wilayahKerja);
    }, [dataTim])

    return (
        <>

        </>
    )
}

export default Team