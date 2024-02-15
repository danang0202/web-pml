export
    function getSubmissionsTim(dataTim, submissions) {
    const hasil = [];
    if (dataTim && submissions) {
        dataTim.map((anggota) => {
            const submissionTemp = submissions.filter(data => data.submitterId == 7)
            if (submissionTemp.length > 0) {
                hasil.push(...submissionTemp);
            }
        })
        if (hasil.length > 0) {
            hasil.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }
    return hasil;
}