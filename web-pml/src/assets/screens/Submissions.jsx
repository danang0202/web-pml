import Table from '../components/Table';
import ControlPanel from '../components/ControlPanel';
import { fetchDataByPagination, filterData, getEndIndexData, getStartIndexData, paginationUtils } from '../config/util';
import { useEffect, useState } from 'react';
import { useTimContext } from '../../context/TimContext';
import Loading from "../components/Loading";

const Submissions = () => {
    const { submissionListTim, dataTim, setGetSubmission, updateDataSubmissions, submissionsList, wilayahKerja } = useTimContext();
    const [limit, setLimit] = useState(9);
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

    useEffect(() => {
        if (submissionListTim && submissionListTim.length > 0) {
            setPage(1);
            setFilteredData(filterData(submissionListTim, filterStatus, filterSorting, filterName, filterWilayah, keyword))
        }
    }, [submissionListTim, filterStatus, filterSorting, filterName, filterWilayah, keyword])


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
        <div className="container-fluid w-100 d-flex flex-row gap-3 justify-content-center pt-4 pb-5">
            <ControlPanel filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterName={filterName} setFilterName={setFilterName} filterSorting={filterSorting} setFilterSorting={setFilterSorting} filterWilayah={filterWilayah} setFilterWilayah={setFilterWilayah} />
            <div className="table-container bg-clear rounded w-75 d-flex flex-column justify-content-between">
                <div className="box">
                    <div className="header py-3 px-4 d-flex flex-row justify-content-between align-items-center">
                        <h6 className='mb-0 fw-bold text-blue'>Data Pencacahan PKL 63 Polstat STIS</h6>
                        <div className="search-box">
                            <form >
                                <span className="input-group w-auto">
                                    <input
                                        type="text"
                                        className="form-control rounded-start-3 w-auto bg-light border"
                                        placeholder="Search..."
                                        value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button className="btn bg-orange rounded-0 rounded-end-3 d-flex align-content-center" type="submit">
                                        <i className="material-icons text-white">search</i>
                                    </button>
                                </span>
                            </form>
                        </div>
                    </div>
                    <Table data={paginatedData} dataTim={dataTim} />
                </div>
                <div className="bottom-table d-flex flex-row justify-content-between px-4 w-100 py-2 pb-4">
                    <div className="page-info">
                        {filteredData && filteredData != 0 && (
                            <p className='mb-0'>Menampilkan {getStartIndexData(page, limit)} - {getEndIndexData(page, limit, filteredData.length)} dari {filteredData.length} Data</p>
                        )}
                    </div>
                    <div className="pagination">
                        <div className="d-flex justify-content-between w-100">
                            <div className="box mx-3 d-flex flex-row h-auto align-items-center">
                                <label htmlFor="show-number">show:</label>
                                <select id="show-number" className="form-select form-select-sm mx-1" value={limit} onChange={(e) => { setLimit(e.target.value); setPage(1) }}>
                                    <option value="9">9</option>
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
                                        <li className="page-item" key={index}><a className={`page-link hover-bg-orange ${page == value ? 'bg-blue text-light' : ''}`} onClick={() => onPageChange(value)}>{value}</a></li>
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
    )
}
export default Submissions