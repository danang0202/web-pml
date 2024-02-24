export const urlCentral = "https://central.pkl63.stis.ac.id/#";
export const urlEditCentral = "https://central.pkl63.stis.ac.id/v1/projects/1/";

// export const urlCentral = "http://localhost:8989/#";

export const xmlFormId = "Pencacahan";

import _, { update } from 'lodash';

export const paginationUtils = (totalPage, page, limit, siblings) => {
    let totalPgeNoInArray = 7 + siblings;
    if (totalPgeNoInArray >= totalPage) {
        return _.range(1, totalPage + 1);
    }
    let leftSiblingsIndex = Math.max(page - siblings, 1);
    let rightSiblingsIndex = Math.min(page + siblings, totalPage)

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < totalPage - 2;

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRange = _.range(1, leftItemsCount + 1);
        return [...leftRange, ' ...', totalPage];
    } else if (showLeftDots && !showRightDots) {
        let rightItemsCount = 3 + 3 * siblings;
        let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
        return [1, '... ', ...rightRange];
    } else {
        let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
        return [1, '... ', ...middleRange, ' ...', totalPage];
    }
}

export function fetchDataByPagination(data, page, limit) {
    let array = [];
    for (let i = (page - 1) * limit; i < (page * limit) && i < data.length; i++) {
        array.push(data[[i]])

    }
    return array;
}

export function getStartIndexData(page, limit) {
    return (page - 1) * limit + 1;
}

export function getEndIndexData(page, limit, lengthData) {
    let akhir = ((page - 1) * limit) + limit;
    return akhir <= lengthData ? akhir : lengthData;
}

export function getNameAllNameFilter(dataTim) {
    let array = [];
    dataTim.map((item) => {
        array.push(item.nama);
    })
    return array;
}

export function getNameAllNoBS(wilayah) {
    let array = [];
    wilayah.map((item) => {
        array.push(item.no_bs);
    })
    return array;
}

export function isNameInArrayFilter(namaAnggota, filterList) {
    const data = filterList.find((item) => item == namaAnggota)
    return data ? true : false;
}

export function removefiltername(namaAanggota, filterList) {
    const updateFilterLIst = filterList.filter(item => item !== namaAanggota);
    return updateFilterLIst;
}

export function addFilterName(namaAnggota, filterList) {
    const updatedFilterList = [...filterList, namaAnggota];
    console.log(updatedFilterList);
    return updatedFilterList;
}

export function filterData(data, status, sorting, name, wilayah, keyword) {
    let dataFilter = [];
    if (status && status.length > 0) {
        dataFilter = data.filter(item => {
            if (status.includes("noStatus") && item.reviewState == null) {
                return true;
            }
            return status.includes(item.reviewState);
        });
    }
    if (sorting == 'desc') {
        dataFilter.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
        dataFilter.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (keyword != '') {
        dataFilter = dataFilter.filter(item => {
            const itemString = String(item.reviewState).toLowerCase();
            return itemString.includes(keyword);
        })
    }
    console.log(dataFilter);
    return dataFilter;
}



