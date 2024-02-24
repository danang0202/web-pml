import { useTimContext } from '../../context/TimContext';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { addFilterName, getNameAllNameFilter, getNameAllNoBS, isNameInArrayFilter, removefiltername } from '../config/util';
import { filter } from 'lodash';
const ControlPanel = ({ filterStatus, setFilterStatus, filterName, setFilterName, filterSorting, setFilterSorting, filterWilayah, setFilterWilayah }) => {

    const { dataTim, wilayahKerja } = useTimContext();

    useEffect(() => {
        if (dataTim && dataTim.length > 0) {
            setFilterName(getNameAllNameFilter(dataTim));
        }
    }, [dataTim])

    useEffect(() => {
        if (wilayahKerja && wilayahKerja.length > 0) {
            setFilterWilayah(getNameAllNoBS(wilayahKerja));
        }
    }, [wilayahKerja])

    const changeFilterName = (item) => {
        if (isNameInArrayFilter(item.nama, filterName)) {
            setFilterName(removefiltername(item.nama, filterName))
        } else {
            setFilterName(addFilterName(item.nama, filterName));
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




    return (
        <>
            <div className="control-container bg-transparent">
                <div className="header bg-blue py-2 px-4 rounded-top shadow-sm">
                    <h6 className='fw-semibold text-center text-light mb-0'>Control Panel</h6>
                </div>
                <div className="content p-3 px-4 d-flex flex-column gap-3 bg-clear shadow-sm rounded-bottom">
                    <div className="box">
                        <div className="label d-flex flex-row justify-content-between align-items-center mb-2">
                            <p className='fw-semibold mb-0'>Status Submission</p>
                            <div className="icon" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faArrowsRotate} />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="box-content d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isNameInArrayFilter("noStatus", filterStatus)} onClick={() => changeFilterStatus("noStatus")} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Diterima</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isNameInArrayFilter("hasIssues", filterStatus)} onClick={() => changeFilterStatus("hasIssues")} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Bermasalah</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isNameInArrayFilter("edited", filterStatus)} onClick={() => changeFilterStatus("edited")} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Diubah</label>
                                </div>
                            </div>
                            <div className="box-content d-flex flex-column gap-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isNameInArrayFilter("approved", filterStatus)} onClick={() => changeFilterStatus("approved")} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Approved</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isNameInArrayFilter("rejected", filterStatus)}  onClick={() => changeFilterStatus("rejected")}/>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Ditolak</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="box">
                        <div className="label d-flex flex-row justify-content-between align-items-center my-2">
                            <p className='fw-semibold mb-0'>Urutan Data</p>
                            <div className="icon" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faArrowsRotate} />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="inlineCheckbox1" name="radioGroup" value="option1" checked={filterSorting == 'desc'} onClick={() => setFilterSorting("desc")} />
                                <label className="form-check-label" htmlFor="inlineCheckbox1">Data Terbaru</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="inlineCheckbox2" name="radioGroup" value="option2" checked={filterSorting == 'asc'} onClick={() => setFilterSorting("asc")} />
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Data Terlama</label>
                            </div>

                        </div>
                    </div>
                    <div className="box">
                        <div className="label d-flex flex-row justify-content-between align-items-center my-2">
                            <p className='fw-semibold mb-0'>Nama Pengirim</p>
                            <div className="icon" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faArrowsRotate} />
                            </div>
                        </div>
                        <div className="box-content d-flex flex-column gap-2">
                            {dataTim && dataTim.length > 0 && dataTim.map((item, index) => (
                                <div key={index} className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isNameInArrayFilter(item.nama, filterName)} onClick={() => changeFilterName(item)} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{item.nama}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="box">
                        <div className="label d-flex flex-row justify-content-between align-items-center my-2">
                            <p className='fw-semibold mb-0'>Wilayah Kerja</p>
                            <div className="icon" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faArrowsRotate} />
                            </div>
                        </div>
                        <div className="box-content row">
                            {wilayahKerja && wilayahKerja.length > 0 && wilayahKerja.map((item, index) => (
                                <>
                                    <div key={index} className="col-6 my-2">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isNameInArrayFilter(item.no_bs, filterWilayah)} onClick={() => changeFilterWilayah(item)} />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{item.no_bs}</label>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ControlPanel