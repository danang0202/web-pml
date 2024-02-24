export function formatDateAndTime(timestamp) {
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = ('0' + dateObj.getDate()).slice(-2);
    const hari = daysOfWeek[dateObj.getDay()];
    const hours = ('0' + dateObj.getHours()).slice(-2);
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);
    const detik = ('0' + dateObj.getSeconds()).slice(-2);


    return `${hari}, ${day} ${month} ${year} pukul ${hours}:${minutes}:${detik} WIB`;
}

export function countTotalSubmissions(data) {
    return data.length;
}

export function countDiTerimaSubmissions(data) {
    const approvedSubmissions = data.filter(item => item.reviewState === 'approved');
    return approvedSubmissions.length;
}

export function countDiTolakubmissions(data) {
    const approvedSubmissions = data.filter(item => item.reviewState === 'rejected');
    return approvedSubmissions.length;
}

export function countNoReviewSubmissions(data) {
    const approvedSubmissions = data.filter(item => item.reviewState == null);
    return approvedSubmissions.length;
}

export function countEditedSubmissions(data) {
    const approvedSubmissions = data.filter(item => item.reviewState == 'edited');
    return approvedSubmissions.length;
}

export function konversiFormatWaktu(waktuISO) {
    // Buat objek Date dari string ISO
    const waktu = new Date(waktuISO);

    // Daftar nama bulan
    const namaBulan = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Juni",
        "Juli", "Agt", "Sept", "Okt", "Nov", "Des"
    ];

    // Dapatkan tanggal, bulan, tahun, jam, menit, dan detik
    const tanggal = waktu.getDate();
    const bulan = namaBulan[waktu.getMonth()];
    const tahun = waktu.getFullYear();
    const jam = String(waktu.getHours()).padStart(2, '0');
    const menit = String(waktu.getMinutes()).padStart(2, '0');
    const detik = String(waktu.getSeconds()).padStart(2, '0');

    // Kembalikan format waktu yang diinginkan
    const formatWaktu = `${tanggal} ${bulan} ${tahun}, ${jam}:${menit}:${detik}`;

    return formatWaktu;
}

export function getNamaPengirim(submitterId, dataTim) {
    const hasil = dataTim.find((item) => item.akunId == submitterId); // BAGIAIN INI NANTI DI BENARKAN KONDISINYA
    if (hasil) {
        return hasil;
    } else {
        return "";
    }
}


export function updateStatusSubmisionMetaData(data, updatedData) {
    const newData = data.map(item => {
        if (item.instanceId === updatedData.instanceId) {
            return {
                ...item,
                reviewState: updatedData.reviewState
            };
        }
        return item;
    });
    return newData;
}
