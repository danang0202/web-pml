function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-clear w-100 shadow px-5" style={{ height:'4rem' }}>
                <div className="container-fluid">
                    <div className="logo-container text-end px-5">
                        <img src="/images/metalab-logo.png" alt="" style={{ width: '9rem' }} />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/submissions">Submissions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/team">Data Team</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar