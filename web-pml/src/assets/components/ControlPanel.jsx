import { useTimContext } from '../../context/TimContext';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { addFilterName, getAllSubmitterId, getNameAllNoBS, isNameInArrayFilter, removefiltername } from '../config/util';
import { filter } from 'lodash';
const ControlPanel = ({ filterStatus, setFilterStatus, filterName, setFilterName, filterSorting, setFilterSorting, filterWilayah, setFilterWilayah }) => {
    const { dataTim, wilayahKerja } = useTimContext();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showControlPanel, setShowControlPanel] = useState(false);


    useEffect(() => {
        if (windowWidth > 900) {
            setShowControlPanel(true);
        }
    }, [windowWidth])

    useEffect(() => {
        resetFilterName();
    }, [dataTim])

    useEffect(() => {
        resetFilterWilayah();
    }, [wilayahKerja])

    const changeFilterName = (item) => {
        if (isNameInArrayFilter(item.akunId, filterName)) {
            setFilterName(removefiltername(item.akunId, filterName))
        } else {
            setFilterName(addFilterName(item.akunId, filterName));
        }
    }

    const changeFilterWilayah = (item) => {
        if (isNameInArrayFilter(item.no_bs, filterWilayah)) {
            setFilterWilayah(removefiltername(item.no_bs, filterWilayah))
        } else {
            setFilterWilayah(addFilterName(item.no_bs, filterWilayah));
        }
    }

    const changeFilterStatus = (status) => {
        if (isNameInArrayFilter(status, filterStatus)) {
            setFilterStatus(removefiltername(status, filterStatus))
        } else {
            setFilterStatus(addFilterName(status, filterStatus));
        }
    }

    const resetFilterStatus = () => {
        setFilterStatus(['noStatus', 'approved', 'hasIssues', 'rejected', 'approved', 'edited']);
    }

    const resetFilterName = () => {
        if (dataTim && dataTim.length > 0) {
            setFilterName(getAllSubmitterId(dataTim));
        }
    }

    const resetFilterWilayah = () => {
        if (wilayahKerja && wilayahKerja.length > 0) {
            setFilterWilayah(getNameAllNoBS(wilayahKerja));
        }
    }

    return (
        <>
            <div className="control-container bg-transparent">
                {windowWidth > 900 || showControlPanel ? (
                    <div className='smooth-transition'>
                        <div className="header bg-blue py-2 px-4 rounded-top shadow-sm position-relative">
                            <h6 className='fw-semibold text-center text-light mb-0'>Control Panel</h6>
                            <div className="d-inline d-lg-none position-absolute top-0 end-0 bg-danger py-1 px-md-2 px-2" onClick={() => setShowControlPanel(false)} style={{ borderRadius: "0rem .4rem 0rem 0rem" }}>
                                <FontAwesomeIcon icon={faXmark} color='#fff' fontSize={"1.5rem"} />
                            </div>
                        </div>
                        <div className="content p-3 px-4 d-flex flex-column gap-3 bg-clear shadow-sm rounded-bottom">
                            <div className="box">
                                <div className="label d-flex flex-row justify-content-between align-items-center mb-2">
                                    <p className='fw-semibold mb-0'>Status Submission</p>
                                    <div className="bg-blue hover-op6 py-1 px-2 rounded" style={{ cursor: 'pointer' }} onClick={() => resetFilterStatus()}>
                                        <p className='mb-0 fs-7 text-light'>Reset <FontAwesomeIcon icon={faArrowsRotate} color='#fff' className='' /></p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-center">
                                    <div className="col-6 box-content d-flex flex-column gap-2">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="diterima" checked={isNameInArrayFilter("noStatus", filterStatus)} onClick={() => changeFilterStatus("noStatus")} />
                                            <label className="fs-tbl form-check-label" htmlFor="diterima">Diterima</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="hasIssues" checked={isNameInArrayFilter("hasIssues", filterStatus)} onClick={() => changeFilterStatus("hasIssues")} />
                                            <label className="fs-tbl form-check-label" htmlFor="hasIssues">Bermasalah</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="diubah" checked={isNameInArrayFilter("edited", filterStatus)} onClick={() => changeFilterStatus("edited")} />
                                            <label className="fs-tbl form-check-label" htmlFor="diubah">Diubah</label>
                                        </div>
                                    </div>
                                    <div className="col-6 box-content d-flex flex-column gap-2">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="approved" checked={isNameInArrayFilter("approved", filterStatus)} onClick={() => changeFilterStatus("approved")} />
                                            <label className="fs-tbl form-check-label" htmlFor="approved">Approved</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="ditolak" checked={isNameInArrayFilter("rejected", filterStatus)} onClick={() => changeFilterStatus("rejected")} />
                                            <label className="fs-tbl form-check-label" htmlFor="ditolak">Ditolak</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="box">
                                <div className="label d-flex flex-row justify-content-between align-items-center my-2">
                                    <p className='fw-semibold mb-0'>Urutan Data</p>
                                    <div className="bg-blue hover-op6 py-1 px-2 rounded" style={{ cursor: 'pointer' }} onClick={() => setFilterSorting('desc')} >
                                        <p className='mb-0 fs-7 text-light'>Reset <FontAwesomeIcon icon={faArrowsRotate} color='#fff' /></p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="form-check form-check-inline col-6">
                                        <input className="form-check-input" type="radio" id="terbaru" name="radioGroup" value="option1" checked={filterSorting == 'desc'} onClick={() => setFilterSorting("desc")} />
                                        <label className="form-check-label fs-tbl" htmlFor="terbaru">Data Terbaru</label>
                                    </div>
                                    <div className="form-check form-check-inline col-6">
                                        <input className="form-check-input" type="radio" id="terlama" name="radioGroup" value="option2" checked={filterSorting == 'asc'} onClick={() => setFilterSorting("asc")} />
                                        <label className="form-check-label fs-tbl" htmlFor="terlama">Data Terlama</label>
                                    </div>

                                </div>
                            </div>
                            <div className="box">
                                <div className="label d-flex flex-row justify-content-between align-items-center my-2">
                                    <p className='fw-semibold mb-0'>Nama Pengirim</p>
                                    <div className="bg-blue hover-op6 py-1 px-2 rounded" style={{ cursor: 'pointer' }} onClick={() => resetFilterName()}>
                                        <p className='mb-0 fs-7 text-light'>Reset <FontAwesomeIcon icon={faArrowsRotate} color='#fff' /></p>
                                    </div>
                                </div>
                                <div className="box-content row">
                                    {dataTim && dataTim.length > 0 && dataTim.map((item, index) => (
                                        <div key={index} className=" px-5 py-2 w-auto form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id={item.akunId} checked={isNameInArrayFilter(item.akunId, filterName)} onClick={() => changeFilterName(item)} />
                                            <label className="form-check-label fs-tbl" htmlFor={item.akunId}>{item.nama}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="box">
                                <div className="label d-flex flex-row justify-content-between align-items-center my-2">
                                    <p className='fw-semibold mb-0'>Wilayah Kerja</p>
                                    <div className="bg-blue hover-op6 py-1 px-2 rounded" style={{ cursor: 'pointer' }} onClick={() => resetFilterWilayah()}>
                                        <p className='mb-0 fs-7 text-light'>Reset <FontAwesomeIcon icon={faArrowsRotate} color='#fff' /></p>
                                    </div>
                                </div>
                                <div className="box-content row">
                                    {wilayahKerja && wilayahKerja.length > 0 && wilayahKerja.map((item, index) => (
                                        <>
                                            <div key={index} className="w-auto px-5 py-2 form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id={item.no_bs} checked={isNameInArrayFilter(item.no_bs, filterWilayah)} onClick={() => changeFilterWilayah(item)} />
                                                <label className="fs-tbl form-check-label" htmlFor={item.no_bs}>{item.no_bs}</label>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-start">
                        <div className='smooth-transition bg-grad-2 h-grad-1 rounded' onClick={() => setShowControlPanel(true)}>
                            <p className='mb-0 text-light px-2 py-1 fs-btn'>Tampilkan control panel <FontAwesomeIcon icon={faCaretDown} className='ps-1' /></p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ControlPanel