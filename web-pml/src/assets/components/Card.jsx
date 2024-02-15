import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faClipboardCheck, faFileArchive, faFilePen, faFolderOpen, faFolderPlus, faSquareXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTimContext } from '../../context/TimContext';
import { countDiTerimaSubmissions, countDiTolakubmissions, countEditedSubmissions, countNoReviewSubmissions, countTotalSubmissions } from '../config/kumpulanFunction';

function Card() {
    const { submissionListTim } = useTimContext();
    return (
        <>
            <div className="card-container w-100 d-flex flex-column gap-4  bg-grad-2 position-relative" style={{ height: '22rem' }}>
                <div className="title d-flex flex-row justify-content-center align-items-center pb-4 pt-4">
                    <img src="/images/logo/maskot-full.png" alt="" style={{ width: '10rem' }} />
                    <div className="d-flex flex-column">
                        <h3 className='text-light fw-semibold'>Harmoni dalam Tradisi Bersinergi dengan Inovasi</h3>
                        <h1 className='text-light '>Berbakti untuk Negeri</h1>
                    </div>
                </div>
                <div className="d-flex flex-row gap-3 justify-content-center position-absolute text-center w-100 card-box">
                    <div className="box d-flex flex-column bg-clear px-4 py-4 rounded-3 shadow">
                        <div className="label-container">
                            <p className="text-blue text-center fw-semibold">PKL 63 Politeknik Statisika STIS</p>
                        </div>
                        <div className="number-container d-flex flex-row  gap-3">
                            <div className="d-flex flex-row align-items-end gap-2">
                                <h1 className="text-blue fw-bold" style={{ fontSize: 70 }}>12</h1>
                                <div className="d-flex flex-column">
                                    <p className="text-blue fw-semibold">hari</p>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-end gap-2">
                                <h1 className="text-orange fw-bold" style={{ fontSize: 70 }}>10</h1>
                                <div className="d-flex flex-column">
                                    <p className="text-blue fw-semibold mb-0">jam</p>
                                    <p className="text-blue">tersisa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box d-flex flex-column bg-clear px-4 py-4 rounded-3 shadow">
                        <div className="label-container w-100">
                            <p className="text-blue text-center fw-semibold">Total Submissions</p>
                        </div>
                        <div className="number-container d-flex flex-row gap-2">
                            <div className="d-flex flex-row gap-3 align-items-end">
                                <div className="bg-blue-t px-4 py-3 rounded-pill">
                                    <FontAwesomeIcon icon={faFileArchive} style={{ color: '#03396c', fontSize: '3.5rem' }} />
                                </div>
                                <div className="d-flex flex-column justify-content-end">
                                    <h1 className="text-blue fw-bold mb-0" style={{ fontSize: 42 }}>{submissionListTim && submissionListTim.length > 0 ? countTotalSubmissions(submissionListTim) : 0}</h1>
                                    <p className="text-blue mb-1">Terkumpul</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <div className="box d-flex flex-column bg-clear px-4 py-4 rounded-3 shadow">
                            {/* <h6>Dokumen Masuk</h6> */}
                            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                                <div className="icon">
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
                        <div className="box d-flex flex-row bg-clear justify-content-between align-items-center gap-2 px-4 py-4 rounded-3 shadow">
                            <div className="icon">
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
                    <div className="d-flex flex-column justify-content-between">
                        <div className="box d-flex flex-row bg-clear justify-content-between align-items-center gap-2 px-4 py-4 rounded-3 shadow">
                            <div className="icon">
                                <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: '#f5b020', fontSize: '1.6rem' }} />
                            </div>
                            <div className="lable">
                                <p className="mb-0 fw-semibold">Bermasalah</p>
                            </div>
                            <div className="count">
                                <h6 className="mb-0 badge bg-orange-t fs-5 rounded-3 text-orange">{submissionListTim && submissionListTim.length > 0 ? countDiTerimaSubmissions(submissionListTim) : 0}</h6>
                            </div>
                        </div>
                        <div className="box d-flex flex-row bg-clear justify-content-between align-items-center gap-2 px-4 py-4 rounded-3 shadow">
                            <div className="icon">
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
                    <div className="box d-flex flex-column bg-clear px-4 py-4 rounded-3 shadow">
                        <div className="label-container w-100">
                            <p className="text-blue text-center fw-semibold">Total Approved</p>
                        </div>
                        <div className="number-container d-flex flex-row  gap-3">
                            <div className="d-flex flex-row gap-3 align0-items-end">
                                <div className="bg-green-t px-4 py-3 rounded-pill">
                                    <FontAwesomeIcon icon={faClipboardCheck} style={{ color: '#1AC073', fontSize: '3.5rem' }} />
                                </div>
                                <div className="d-flex flex-column justify-content-end">
                                    <h1 className="text-green fw-bold mb-0" style={{ fontSize: 42 }}>{submissionListTim && submissionListTim.length > 0 ? countDiTerimaSubmissions(submissionListTim) : 0}</h1>
                                    <p className="text-blue mb-1">Approved</p>
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