import { Row, Col } from 'react-bootstrap';
import { useTimContext } from '../../context/TimContext';
import { useEffect } from 'react';
import { countAllDataUser, countAllDataUserApproved, formatTwoDigitString } from '../config/util';

function Team() {
    const { dataTim, submissionsList, submissionListTim } = useTimContext();


    useEffect(() => {
        console.log(dataTim);
    }, [dataTim])

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-lg-10 col-12">
                    <div className="box-content row w-100 py-3 container-fluid px-5">
                        {dataTim && dataTim.length != 0 &&
                            dataTim.map(item =>
                            (
                                <>
                                    <div className="col-md-6 col-12 py-3 d-flex flex-row d-flex justify-content-center" key={item.nim}>
                                        <div className="d-flex flex-row bg-clear p-3  pt-lg-4 pt-2 rounded col-12 d-flex justify-content-center">
                                            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-center">
                                                <div className="">
                                                    <img src={`https://capi.pkl63.stis.ac.id/photo/${item.nim}`} alt="Foto Mahasiswa" className='avatar'
                                                        onError={(e) => { e.target.onerror = null; e.target.src = "/images/logo/maskot-full.png" }} />
                                                </div>
                                                <div className="d-flex flex-column align-items-center">
                                                    <d className="flex flex-column align-items-center">
                                                        <p className='fw-semibold text-blue mb-0'>{item.nama} </p>
                                                    </d>
                                                    <p className='mb-0 fs-8 text-secondary fw-semibold'>{item.nim}</p>
                                                    <div className="d-flex flex-column w-100 p-2 align-items-center">
                                                        <div className="d-flex flex-row gap-2">
                                                            <div className="jumlah rounded px-3 py-2 d-flex flex-column align-items-center">
                                                                <p className='fw-semibold text-center'>Data Terkirim</p>
                                                                <div className="bg-orange-t rounded pill px-3 rounded">
                                                                    <p className='fw-bold text-orange mb-0' style={{ fontSize: 50 }}>{submissionListTim && submissionListTim.length > 0 ? formatTwoDigitString(countAllDataUser(submissionListTim, item)) : '00'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="jumlah rounded px-3 py-2 d-flex flex-column align-items-center">
                                                                <p className='text-center fw-semibold'>Data Approved</p>
                                                                <div className="bg-green-t rounded pill px-3 rounded">
                                                                    <p className='fw-bold text-success mb-0' style={{ fontSize: 50 }}>{submissionListTim && submissionListTim.length > 0 ? formatTwoDigitString(countAllDataUserApproved(submissionListTim, item)) : '00'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            ))}
                    </div>
                </div >
            </div >

        </>
    )
}

export default Team