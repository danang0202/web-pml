import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck, faFileArchive, faFilePen, faFolderOpen, faSquareXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTimContext } from '../../context/TimContext';
import { countBermasalahSubmissions, countDiTerimaSubmissions, countDiTolakubmissions, countEditedSubmissions, countNoReviewSubmissions, countTotalSubmissions } from '../config/kumpulanFunction';
import { useEffect, useState } from 'react';

function Card() {
    const { submissionListTim } = useTimContext();
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0 });

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const targetDate = new Date('2024-03-09T00:00:00');
            const currentDate = new Date();

            const difference = targetDate - currentDate;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                setTimeRemaining({ days, hours });
            } else {
                setTimeRemaining({ days: 0, hours: 0 });
            }
        };
        const timer = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <div className="card-container w-100 d-flex flex-column gap-4 bg-grad-2 position-relative" style={{ backgroundImage: 'url("/images/bg-web.png")', backgroundSize: 'cover' }}>
                <div className="title d-flex flex-row justify-content-center align-items-center pb-4 pt-md-4 pt-2">
                    <img src="/images/logo/maskot-full.png" className='maskot' alt="" />
                    <div className="d-flex flex-column">
                        <h3 className='text-light fw-semibold d-none d-lg-inline'>Harmoni dalam Tradisi Bersinergi dengan Inovasi</h3>
                        <h4 className='text-light fw-semibold d-inline d-lg-none'>Harmoni dalam Tradisi Bersinergi dengan Inovasi</h4>
                        <h1 className='text-light d-none d-lg-inline'>Berbakti untuk Negeri</h1>
                        <h2 className='text-light d-inilne d-lg-none'>Berbakti untuk Negeri</h2>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-center">
                    <div className="d-flex flex-column flex-md-row gap-3 position-absolute bottom-0 text-center card-box">
                        {/* Ini hanya tampil di layar laptop xl */}
                        <div className="box d-flex flex-column bg-clear px-4 py-4 rounded-3 d-none d-xl-inline">
                            <div className="label-container">
                                <p className="text-blue text-center fw-semibold">PKL 63 Politeknik Statisika STIS</p>
                            </div>
                            <div className="number-container d-flex flex-row  gap-3">
                                <div className="d-flex flex-row align-items-end gap-2">
                                    <h1 className="text-blue fw-bold" style={{ fontSize: 70 }}>{timeRemaining.days}</h1>
                                    <div className="d-flex flex-column">
                                        <p className="text-blue fw-semibold">hari</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-end gap-2">
                                    <h1 className="text-orange fw-bold" style={{ fontSize: 70 }}>{timeRemaining.hours}</h1>
                                    <div className="d-flex flex-column">
                                        <p className="text-blue fw-semibold mb-0">jam</p>
                                        <p className="text-blue">tersisa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="d-flex flex-row gap-3 justify-content-center">
                            <div className="box d-flex flex-column bg-clear px-lg-4 py-lg-4 px-3 py-2 rounded-3 shadow">
                                <div className="label-container w-100">
                                    <p className="text-blue text-center fw-semibold">Total Submissions</p>
                                </div>
                                <div className="number-container d-flex flex-row gap-lg-2 gap-1">
                                    <div className="d-flex flex-row gap-lg-3 gap-2 align-items-center w-100 justify-content-center">
                                        <div className="d-none d-md-inline bg-blue-t px-lg-4 py-lg-3 px-3 py-2 rounded-pill">
                                            <div className="d-none d-lg-inline">
                                                <FontAwesomeIcon icon={faFileArchive} style={{ color: '#03396c', fontSize: '3.5rem' }} />
                                            </div>
                                            <div className="d-inline d-lg-none">
                                                <FontAwesomeIcon icon={faFileArchive} style={{ color: '#03396c', fontSize: '2.5rem' }} />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-end">
                                            <h1 className="text-blue fw-bold mb-0 d-none d-lg-inline" style={{ fontSize: 42 }}>{submissionListTim && submissionListTim.length > 0 ? countTotalSubmissions(submissionListTim) : 0}</h1>
                                            <h1 className="text-blue fw-bold mb-0 d-inline d-lg-none" style={{ fontSize: 30 }}>{submissionListTim && submissionListTim.length > 0 ? countTotalSubmissions(submissionListTim) : 0}</h1>
                                            <p className="text-blue mb-1">Terkumpul</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="box d-flex flex-column bg-clear px-lg-4 py-lg-4 px-2 py-2 rounded-3 shadow">
                                    <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                                        <div className="icon d-none d-md-inline">
                                            <FontAwesomeIcon icon={faFolderOpen} style={{ color: '#03396c', fontSize: '1.6rem' }} />
                                        </div>
                                        <div className="lable">
                                            <p className="mb-0 fw-semibold">Diterima</p>
                                        </div>
                                        <div className="count">
                                            <h6 className="mb-0 badge bg-blue-t text-blue fs-5 rounded-3">{submissionListTim && submissionListTim.length > 0 ? countNoReviewSubmissions(submissionListTim) : 0}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="box d-flex flex-row bg-clear justify-content-between align-items-center gap-2 px-lg-4 py-lg-4 px-2 py-2 rounded-3 shadow">
                                    <div className="icon d-none d-md-inline">
                                        <FontAwesomeIcon icon={faFilePen} style={{ color: '#f5b020', fontSize: '1.6rem' }} />
                                    </div>
                                    <div className="lable">
                                        <p className="mb-0 fw-semibold">Diubah</p>
                                    </div>
                                    <div className="count">
                                        <h6 className="mb-0 badge bg-orange-t fs-5 rounded-3 text-orange">{submissionListTim && submissionListTim.length > 0 ? countEditedSubmissions(submissionListTim) : 0}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-3 justify-content-between">
                            <div className="d-flex flex-column justify-content-between">
                                <div className="box d-flex flex-row bg-clear justify-content-between align-items-center gap-2 px-lg-4 py-lg-4 px-2 py-2 rounded-3 shadow">
                                    <div className="icon d-none d-md-inline">
                                        <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: '#f5b020', fontSize: '1.6rem' }} />
                                    </div>
                                    <div className="lable">
                                        <p className="mb-0 fw-semibold">Bermasalah</p>
                                    </div>
                                    <div className="count">
                                        <h6 className="mb-0 badge bg-orange-t fs-5 rounded-3 text-orange">{submissionListTim && submissionListTim.length > 0 ? countBermasalahSubmissions(submissionListTim) : 0}</h6>
                                    </div>
                                </div>
                                <div className="box d-flex flex-row bg-clear justify-content-between align-items-center gap-2 px-lg-4 py-lg-4 px-2 py-2 rounded-3 shadow">
                                    <div className="icon d-none d-md-inline">
                                        <FontAwesomeIcon icon={faSquareXmark} style={{ color: '#dc3545', fontSize: '1.6rem' }} />
                                    </div>
                                    <div className="lable">
                                        <p className="mb-0 fw-semibold">Ditolak</p>
                                    </div>
                                    <div className="count">
                                        <h6 className="mb-0 badge bg-danger-t fs-5 rounded-3 text-danger">{submissionListTim && submissionListTim.length > 0 ? countDiTolakubmissions(submissionListTim) : 0}</h6>
                                    </div>
                                </div>

                            </div>
                            <div className="box d-flex flex-column bg-clear px-lg-4 py-lg-4 px-3 py-2 rounded-3 shadow">
                                <div className="label-container w-100">
                                    <p className="text-blue text-center fw-semibold">Total Approved</p>
                                </div>
                                <div className="number-container d-flex flex-row  gap-lg-3 gap-2 align-items-center">
                                    <div className="d-flex flex-row gap-3 w-100 justify-content-center">
                                        <div className="d-none d-md-inline bg-green-t px-lg-4 py-lg-3 px-3 py-2 rounded-pill">
                                            <div className="d-none d-lg-inline">
                                                <FontAwesomeIcon icon={faClipboardCheck} style={{ color: '#1AC073', fontSize: '3.5rem' }} />
                                            </div>
                                            <div className="d-inline d-lg-none">
                                                <FontAwesomeIcon icon={faClipboardCheck} style={{ color: '#1AC073', fontSize: '2.5rem' }} />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-end">
                                            <h1 className="text-green fw-bold mb-0 d-none d-lg-inline" style={{ fontSize: 42 }}>{submissionListTim && submissionListTim.length > 0 ? countDiTerimaSubmissions(submissionListTim) : 0}</h1>
                                            <h1 className="text-green fw-bold mb-0 d-inline d-lg-none" style={{ fontSize: 30 }}>{submissionListTim && submissionListTim.length > 0 ? countDiTerimaSubmissions(submissionListTim) : 0}</h1>
                                            <p className="text-blue mb-1">Approved</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Card