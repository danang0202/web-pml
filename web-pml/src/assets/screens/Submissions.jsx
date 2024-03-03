import Table from '../components/Table';
import ControlPanel from '../components/ControlPanel';
import { fetchDataByPagination, filterData, getEndIndexData, getStartIndexData, paginationUtils, xmlFormId } from '../config/util';
import { useEffect, useState } from 'react';
import { useTimContext } from '../../context/TimContext';
import Loading from "../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faSearch } from '@fortawesome/free-solid-svg-icons';
import { formatDateAndTime, updateStatusSubmisionMetaData } from '../config/kumpulanFunction';
import apiCentralProject from '../config/axiosCentralProject';
import Cookies from 'js-cookie';

const Submissions = () => {
    const { submissionListTim, dataTim, setGetSubmission, wilayahKerja, getSubmissions, updateDataSubmissions } = useTimContext();
    const [limit, setLimit] = useState(8);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState();
    const [paginatedData, setPaginatedData] = useState();
    const [keyword, setKeyword] = useState('');
    const siblings = 1;
    let array = paginationUtils(totalPage, page, limit, siblings)
    const [filterStatus, setFilterStatus] = useState(['noStatus', 'approved', 'hasIssues', 'rejected', 'approved', 'edited']);
    const [filterName, setFilterName] = useState([]);
    const [filterSorting, setFilterSorting] = useState('desc');
    const [filterWilayah, setFilterWilayah] = useState([]);
    const [loading, setLoading] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const token = Cookies.get('token');

    useEffect(() => {
        if (windowWidth < 900) {
            setLimit(15);
        }
    }, [])

    useEffect(() => {
        if (submissionListTim && submissionListTim.length > 0) {
            setPage(1);
            setFilteredData(filterData(submissionListTim, filterStatus, filterSorting, filterName, filterWilayah, keyword, wilayahKerja))
        }
    }, [submissionListTim, filterStatus, filterSorting, filterName, filterWilayah, keyword])

    useEffect(() => {
        const fetchDataSubmissions = async () => {
            setLoading(true);
            try {
                const response = await apiCentralProject.get(`forms/${xmlFormId}/submissions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status == 200) {
                    updateDataSubmissions(response.data, true);
                }
            } catch (error) {
                console.log("Error saat melakukan fetch data submissions di halaman submissions");
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setGetSubmission(false);
                }, 1000);
            }
        }
        if (getSubmissions) {
            fetchDataSubmissions()
        }
    }, [getSubmissions])


    useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            setPaginatedData(fetchDataByPagination(filteredData, page, limit));
            setTotalpage(filteredData.length / limit);
        } else {
            setPaginatedData([]);
        }
    }, [filteredData, page, limit])

    const onPageChange = (value) => {
        if (value === '&laquo' || value == '... ') {
            setPage(1);
        } else if (value == '&lsaquo') {
            if (page != 1) {
                setPage(page - 1);
            }
        } else if (value == '&rsaquo') {
            if (page != totalPage) {
                setPage(page + 1);
            }
        } else if (value == '&raquo' || value == ' ...') {
            setPage(totalPage);
        } else {
            setPage(value);
        }
    }
    return (
        <>
            <div className="container-fluid w-100 d-flex flex-lg-row flex-column gap-3 justify-content-center pt-3 pb-3">
                <ControlPanel filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterName={filterName} setFilterName={setFilterName} filterSorting={filterSorting} setFilterSorting={setFilterSorting} filterWilayah={filterWilayah} setFilterWilayah={setFilterWilayah} />
                <div className="table-submission-container bg-clear rounded d-flex flex-column justify-content-between">
                    <div className="submission-header pt-3">
                        <div>
                            <div className="container-fluid px-md-4 px-3">
                                <div className="d-flex flex-row justify-content-betweeN align-items-center justify-content-between">
                                    <div className="d-flex flex-md-row flex-column gap-lg-5 gap-md-4 gap-2">
                                        <p className="mb-0 d-none d-lg-inline"><span className="text-success fw-semibold">Last update</span> : {formatDateAndTime(localStorage.getItem('lastUpdate'))}</p>
                                        <p className="mb-0 fs-7 d-inline d-lg-none text-center"><span className="text-success fw-semibold fs-7 d-none d-md-inline ">Last update :</span> {formatDateAndTime(localStorage.getItem('lastUpdate'))}</p>
                                    </div>
                                    <div className="d-flex flex-row gap-lg-2 gap-1">
                                        <div className="rounded bg-grad-3 text-light d-block px-lg-3 py-lg-2 px-2 py-2 hover-grad-1 transition-colors d-flex flex-row gap-2 align-items-center" onClick={() => setGetSubmission(true)}>
                                            <p className="mb-0 fs-btn">Refresh <FontAwesomeIcon icon={faArrowsRotate} style={{ color: '#fff' }} /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="header py-2 px-md-4  px-3 d-flex flex-row justify-content-between align-items-center">
                                <h6 className='mb-0 fw-bold text-blue d-none d-md-inline'>Data Pencacahan PKL 63 Polstat STIS</h6>
                                <h6 className='mb-0 fw-bold text-blue d-inline d-md-none fs-7'>Data Pencacahan PKL 63 Polstat STIS</h6>
                                <div className="search-box">
                                    <form >
                                        <span className="input-group">
                                            <input
                                                type="text"
                                                className="form-control rounded-start-3  bg-light border fs-btn"
                                                placeholder="Search..."
                                                value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                            />
                                            <button className="btn bg-orange rounded-0 rounded-end-3 d-flex align-items-center fs-btn" type="submit">
                                                <div className="d-none d-lg inline">
                                                    <FontAwesomeIcon icon={faSearch} color='#fff' fontSize='1rem' />
                                                </div>
                                                <div className="d-inline d-lg none">
                                                    <FontAwesomeIcon icon={faSearch} color='#fff' fontSize='.8rem' />
                                                </div>
                                            </button>
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 pt-1 w-100">
                            <div className="table-container table-sub-container">
                                <Table data={paginatedData} dataTim={dataTim} loading={loading} setLoading={setLoading} />
                            </div>
                        </div>
                    </div>
                    <div className="bottom-table d-flex flex-column gap-2 flex-md-row justify-content-between px-4 w-100 py-2 pb-4">
                        <div className="page-info">
                            {filteredData && filteredData != 0 && (
                                <p className='mb-0 fs-btn'>Menampilkan {getStartIndexData(page, limit)} - {getEndIndexData(page, limit, filteredData.length)} dari {filteredData.length} Data</p>
                            )}
                        </div>
                        <div className="pagination">
                            <div className="d-flex justify-content-between w-100">
                                <div className="box d-flex flex-row h-auto align-items-center">
                                    <label htmlFor="show-number">show:</label>
                                    <select id="show-number" className="form-select form-select-sm mx-1" value={limit} onChange={(e) => { setLimit(e.target.value); setPage(1) }}>
                                        <option value="8">8</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>

                                <ul className="pagination pagination-sm d-flex flex-row h-auto align-items-center m-0">
                                    <li className="page-item">
                                        <a className="page-link" onClick={() => onPageChange('&laquo')} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" onClick={() => onPageChange('&lsaquo')} >&lsaquo;</a></li>
                                    {array
                                        .map((value, index) => (
                                            <li className="page-item" key={index}><a className={`page-link hover-bg-orange ${page == value ? 'bg-blue text-light' : 'text-blue'}`} onClick={() => onPageChange(value)}>{value}</a></li>
                                        ))}
                                    <li className="page-item"><a className="page-link" onClick={() => onPageChange('&rsaquo')}>&rsaquo;</a></li>
                                    <li className="page-item">
                                        <a className="page-link" onClick={() => onPageChange('&raquo')} aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {loading && <Loading />}
            </div>
        </>
    )
}
export default Submissions