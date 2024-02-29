import axios from 'axios';
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import login from '../../assets/images/login.png'
import back from '../../assets/images/back.png'
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import styles from './ResetPasswordPage.module.css'

function ResetPasswordPage() {
    const theme = createTheme({
        palette: {

            primary: {
                // This is green.A700 as hex.
                main: '#FF725E',
                contrastText: '#fff'
            },
        },
    });
    const navigate = useNavigate()

    const [account, setAccount] = useState({
        iin: '',
        password: '',
        role: ''
    })

    const signin = () => {
        axios.post('http://localhost:8080/api/v1/login', account)
            .then(response => {
                if (response.status == 200) {
                    if (account.role == 'ROLE_DOCTOR') {
                        navigate('/doctor')
                    }
                    else {
                        navigate('./patient')
                    }
                }
            })
            .catch(error => console.log(error))

        // console.log(account)
    }
    return (
        <div className="body">
            {/* <Container className='justify-content-md-center main_container'>
                <Row className='login_fields'>
                    <Col >
                        <Row className="justify-content-md-center">
                            <img src={login} style={{ width: '400px', height: '400px', margin: '0 auto' }} />
                        </Row>
                    </Col>
                    <Col>
                        1
                    </Col>

                </Row>
            </Container> */}


            <Container className='main_container'>
                <Row>
                    <Col>
                        <img onClick={() => navigate(-1)} src={back} style={{ width: '20px', height: '20px', marginTop: '-80px', cursor: 'pointer' }} />

                    </Col>

                </Row>
                <Row className="login_fields" style={{alignText: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <div 
                    style={{ width: '600px', }}
                    >
                        <div >
                            <h1 className={styles.text1} >Сбросить пароль</h1>
                            <h2 className={styles.text2} >Что-то про сброс пароля</h2>
                        </div>
                        <div style={{marginBottom:'10px'}} >
                            <TextField style={{width:'400px', display:'block', margin:'auto'}}
                                fullWidth
                                // onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, fio: e.target.value }))} 
                                id="standard-basic" label="ИИН" variant="standard" />
                        </div>
                        <div style={{alignItems:'center',justifyContent:'center'}}>
                            <ThemeProvider theme={theme} >
                                <Button 
                                style={{marginTop:'20px',backgroundColor:'#FF725E',color:'white', display:'block', margin:'auto'}}
                                variant='contained'>Отправить</Button>
                            </ThemeProvider>
                        </div>
                    </div>

                </Row>

            </Container>

            <div className='footer'>

            </div>

        </div>
    );
}



export default ResetPasswordPage;
