import { useTimContext } from '../../context/TimContext';
import Cookies from 'js-cookie';
import { getNamaPengirim, konversiFormatWaktu } from '../config/kumpulanFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faEject, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function TableRecent() {

    const token = Cookies.get('token');
    const { submissionListTim, dataTim } = useTimContext();
    // const [loading, setLoading] = useState();

    const handleLinkClick = (item) => {
        event.preventDefault();
        // let url = (`https://central.pkl63.stis.ac.id/-/edit/OGnOJdHta8UsUQ3JTo10xPCq9f3BhYr?instance_id=uuid:7113273a-7d10-404a-a1e2-2746eb853243&return_url=`);
        let url = (`https://central.pkl63.stis.ac.id/v1/projects/1/forms/MODUL2/submissions/uuid:7113273a-7d10-404a-a1e2-2746eb853243/edit`);
        window.open(url, '_blank');
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
                        submissionListTim.map((item, index) => (
                            <tr key={index}>
                                <td scope="row">{konversiFormatWaktu(item.createdAt)}</td>
                                <td>{getNamaPengirim(item.submitterId, dataTim).nim}</td>
                                <td className=''>{getNamaPengirim(item.submitterId, dataTim).nama}</td>
                                <td>Klod.004B.1.2</td>
                                <td><span className={`badge ${item.reviewState == 'approved' ? 'bg-green' : item.reviewState == 'rejected' ? 'bg-danger' : item.reviewState == null ? 'bg-blue' : 'bg-orange'}`} >{item.reviewState == 'approved' ? 'Approved' : item.reviewState == 'rejected' ? 'Ditolak' : item.reviewState == null ? 'Diterima' : item.reviewState == 'edited' ? 'Diubah' : 'Bermasalah'}</span></td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <div className="rounded bg-grad-3 text-light px-2 py-1 hover-grad-1 transition-colors d-flex flex-row gap-1 align-items-center">
                                            <p className="mb-0 fs-7 fw-semibold">Status</p>
                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#fff' }} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex justify-content-center' >
                                        <div className="rounded bg-grad-2 text-light px-2 py-1 hover-grad-1 transition-colors d-flex flex-row gap-1 align-items-center" onClick={() => handleLinkClick(item)}>
                                            <p className="mb-0 fs-7 fw-semibold">Lihat</p>
                                            <FontAwesomeIcon icon={faEye} style={{ color: '#fff' }} />
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