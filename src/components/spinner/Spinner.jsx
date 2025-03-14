const Spinner = () => {
    return (
        <svg width="120" height="120" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto', background: 'none', display: 'block'}}>
            <rect x="1" y="1" rx="1" width="10" height="10">
            <animate id="spinner_FFyM" begin="0;spinner_HDCY.end" attributeName="x" dur="0.2s" values="1;13" fill="freeze" />
            <animate id="spinner_AIvE" begin="spinner_1FwE.end" attributeName="y" dur="0.2s" values="1;13" fill="freeze" />
            <animate id="spinner_wWCL" begin="spinner_gH4o.end" attributeName="x" dur="0.2s" values="13;1" fill="freeze" />
            <animate id="spinner_S3Gg" begin="spinner_Q0bx.end" attributeName="y" dur="0.2s" values="13;1" fill="freeze" />
            </rect>
            <rect x="1" y="13" rx="1" width="10" height="10">
            <animate id="spinner_1FwE" begin="spinner_FFyM.end" attributeName="y" dur="0.2s" values="13;1" fill="freeze" />
            <animate id="spinner_gH4o" begin="spinner_AIvE.end" attributeName="x" dur="0.2s" values="1;13" fill="freeze" />
            <animate id="spinner_Q0bx" begin="spinner_wWCL.end" attributeName="y" dur="0.2s" values="1;13" fill="freeze" />
            <animate id="spinner_HDCY" begin="spinner_S3Gg.end" attributeName="x" dur="0.2s" values="13;1" fill="freeze" />
            </rect>
        </svg>
    )
}

export default Spinner