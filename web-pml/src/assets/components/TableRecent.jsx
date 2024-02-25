import { useTimContext } from '../../context/TimContext';
import Cookies from 'js-cookie';
import { getNamaPengirim, konversiFormatWaktu, updateStatusSubmisionMetaData } from '../config/kumpulanFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faCaretDown, faCheck, faClipboardCheck, faEject, faEye, faFilePen, faPenToSquare, faSquareXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import apiCentralProject from '../config/axiosCentralProject';
import { xmlFormId } from "../config/util";
function TableRecent({ setLoading }) {
    const token = Cookies.get('token');
    const { submissionListTim, dataTim, setGetSubmission, updateDataSubmissions, submissionsList } = useTimContext();
    const [statusTemp, setStatusTemp] = useState('');

    const handleLinkClick = (item) => {
        event.preventDefault();
        // let url = (`https://central.pkl63.stis.ac.id/-/edit/OGnOJdHta8UsUQ3JTo10xPCq9f3BhYr?instance_id=${item.instanceId}&return_url=`);
        let url = (`https://central.pkl63.stis.ac.id/v1/projects/1/forms/MODUL2/submissions/${item.instanceId}/edit`);
        window.open(url, '_blank');
    }

    const onClickEditStatusButton = (item) => {
        setStatusTemp(item.reviewState);
    }

    const onClickStatus = (e, status) => {
        e.stopPropagation();
        setStatusTemp(status);
    }


    const editReviewStateAction = async (item) => {
        setLoading(true);
        try {
            const data = {
                "reviewState": statusTemp
            }
            const response = await apiCentralProject.patch(`forms/${xmlFormId}/submissions/` + item.instanceId, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            if (response.status == 200) {
                updateDataSubmissions(updateStatusSubmisionMetaData(submissionsList, response.data), false);
            }
        } catch (error) {
            console.log("Error saat edit review state");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setGetSubmission(false);
            }, 1000);
        }
    }

    return (
        <>
            <table className="table table-hover text-center table-recent">
                <thead>
                    <tr>
                        <th scope="col" >Waktu Pengumpulan</th>
                        <th scope="col" >NIM Pengirim</th>
                        <th scope="col" >Nama Pengirim</th>
                        <th scope="col" >Label Rumah Tangga</th>
                        <th scope="col" >Status</th>
                        <th scope="col" colSpan={2}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {submissionListTim.length > 0 &&
                        submissionListTim.slice(0, 10).map((item, index) => (
                            <tr key={index}>
                                <td scope="row">{konversiFormatWaktu(item.createdAt)}</td>
                                <td>{getNamaPengirim(item.submitterId, dataTim).nim}</td>
                                <td className=''>{getNamaPengirim(item.submitterId, dataTim).nama}</td>
                                <td>{item.currentVersion.instanceName}</td>
                                <td>
                                    <div className="dropdown">
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className={`px-2 py-1 rounded text-light fw-semibold fs-7 ${item.reviewState == 'approved' ? 'bg-green' : item.reviewState == 'rejected' ? 'bg-danger' : item.reviewState == null ? 'bg-blue' : 'bg-orange'}`} data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }} onClick={() => onClickEditStatusButton(item)}>{item.reviewState == 'approved' ? 'Approved' : item.reviewState == 'rejected' ? 'Ditolak' : item.reviewState == null ? 'Diterima' : item.reviewState == 'edited' ? 'Diubah' : 'Bermasalah'} <FontAwesomeIcon icon={faCaretDown} style={{ color: '#fff' }} /></div>
                                            <div className="dropdown-menu px-2 border-0 shadow">
                                                <p className="mb-0 font-semibold text-center">{item.currentVersion.instanceName}</p>
                                                <div className="w-100">
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'approved' ? 'bg-green text-light' : 'bg-green-t text-success'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "approved")}>
                                                        <FontAwesomeIcon icon={faClipboardCheck} />
                                                        <p className='mb-0'>Approved</p>
                                                    </div>
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'edited' ? 'bg-orange text-light' : 'bg-orange-t text-orange'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "edited")}>
                                                        <FontAwesomeIcon icon={faFilePen} />
                                                        <p className='mb-0'>Diubah</p>
                                                    </div>
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'hasIssues' ? 'bg-orange text-light' : 'bg-orange-t text-orange'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "hasIssues")}>
                                                        <FontAwesomeIcon icon={faTriangleExclamation} />
                                                        <p className='mb-0'>Bermasalah</p>
                                                    </div>
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'rejected' ? 'bg-danger text-light' : 'bg-danger-t text-danger'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "rejected")}>
                                                        <FontAwesomeIcon icon={faSquareXmark} />
                                                        <p className='mb-0'>Ditolak</p>
                                                    </div>
                                                    <hr className='border-2' />
                                                    <div className="mt-2 mb-1 rounded bg-grad-1 text-light px-2 py-1 hover-grad-1 transition-colors d-flex flex-row gap-1 align-items-center outline-0 justify-content-center" onClick={() => editReviewStateAction(item)}>
                                                        <p className="mb-0 fs-7 fw-semibold">Change Status</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                {/* <td>
                                    <div className='d-flex justify-content-center'>
                                        <div className="dropdown">
                                            <div className="rounded bg-grad-3 text-light px-2 py-1 hover-grad-1 transition-colors d-flex flex-row gap-1 align-items-center outline-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => onClickEditStatusButton(item)}>
                                                <p className="mb-0 fs-7 fw-semibold">Status</p>
                                                <FontAwesomeIcon icon={faCaretDown} style={{ color: '#fff' }} />
                                            </div>
                                            <div className="dropdown-menu px-2 border-0 shadow">
                                                <p className="mb-0 font-semibold text-center">{item.currentVersion.instanceNmae}</p>
                                                <div className="w-100">
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'approved' ? 'bg-green text-light' : 'bg-green-t text-success'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "approved")}>
                                                        <FontAwesomeIcon icon={faClipboardCheck} />
                                                        <p className='mb-0'>Approved</p>
                                                    </div>
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'edited' ? 'bg-orange text-light' : 'bg-orange-t text-orange'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "edited")}>
                                                        <FontAwesomeIcon icon={faFilePen} />
                                                        <p className='mb-0'>Diubah</p>
                                                    </div>
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'hasIssues' ? 'bg-orange text-light' : 'bg-orange-t text-orange'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "hasIssues")}>
                                                        <FontAwesomeIcon icon={faTriangleExclamation} />
                                                        <p className='mb-0'>Bermasalah</p>
                                                    </div>
                                                    <div className={`btn my-2 fs-7 d-flex flex-row align-items-center gap-2 fw-semibold ${statusTemp == 'rejected' ? 'bg-danger text-light' : 'bg-danger-t text-danger'} w-100 px-3 py-1 rounded`} onClick={(e) => onClickStatus(e, "rejected")}>
                                                        <FontAwesomeIcon icon={faSquareXmark} />
                                                        <p className='mb-0'>Ditolak</p>
                                                    </div>
                                                    <hr className='border-2' />
                                                    <div className="mt-2 mb-1 rounded bg-grad-1 text-light px-2 py-1 hover-grad-1 transition-colors d-flex flex-row gap-1 align-items-center outline-0 justify-content-center" onClick={() => editReviewStateAction(item)}>
                                                        <p className="mb-0 fs-7 fw-semibold">Change Status</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td> */}
                                <td>
                                    <div className='d-flex justify-content-center' >
                                        <div className="rounded bg-grad-2 text-light px-2 py-1 hover-grad-1 transition-colors d-flex flex-row gap-1 align-items-center" onClick={() => handleLinkClick(item)}>
                                            <p className="mb-0 fs-7 fw-semibold">Lihat</p>
                                            <FontAwesomeIcon icon={faEye} style={{ color: '#fff', fontSize: '.7rem' }} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableRecent