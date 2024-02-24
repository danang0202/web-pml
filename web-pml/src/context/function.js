export
    function getSubmissionsTim(dataTim, submissions) {
    const hasil = [];
    if (dataTim && submissions) {
        dataTim.map((anggota) => {
            if (anggota.akunId) {
                const submissionTemp = submissions.filter(data => data.submitterId == anggota.akunId) // BAGIAN INI DIBENARKAN KONDISINYA
                if (submissionTemp.length > 0) {
                    hasil.push(...submissionTemp);
                }
            }
        })
        if (hasil.length > 0) {
            hasil.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }
    return hasil;
}