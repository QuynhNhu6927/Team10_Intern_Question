export default function Footer() {
    return (
        <footer 
        style={{ 
            backgroundColor:'#BDE3FF',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0 20px 0'}}>
            <div>
                <div className="company-logo" 
                style={{ 
                    marginBottom: '10px', 
                    display: 'flex', 
                    justifyContent: 'center'}}>
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <div className="company-logo">
                    © 2023 Amazing Tech. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
