import axios from 'axios';
import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import login from '../../assets/images/login.png'
import back from '../../assets/images/back.png'
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './LoginPage.css'

function LoginPage() {
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
                        localStorage.setItem('myiin', account.iin)
                        localStorage.setItem('role', 'ROLE_DOCTOR')

                        navigate('/doctor')
                    }
                    else {
                        localStorage.setItem('myiin', account.iin)
                        localStorage.setItem('role', 'ROLE_USER')
                        navigate('/patient')
                    }
                }
            })

            .catch(error => alert(error))

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
                <Row className="login_fields">
                    <Col >
                        <Row className="justify-content-md-center">
                            <img src={login} style={{ width: '400px', height: '400px', margin: '0 auto' }} />
                        </Row>
                    </Col>
                    <Col >
                        <Row className="justify-content-md-center">
                            <h1 className="enter_title">Вход</h1>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>ИИН</Form.Label>
                                    <Form.Control
                                        onBlur={(e) => setAccount(prevState => ({ ...prevState, iin: e.target.value }))}

                                        type="email"
                                        placeholder="Введите ИИН" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        onBlur={(e) => setAccount(prevState => ({ ...prevState, password: e.target.value }))}

                                        type="password" placeholder="Введите пароль" />
                                    <Form.Text className="text-muted" onClick={() => navigate('/reset-password')} style={{ cursor: 'pointer' }}>
                                        Забыли пароль?
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Кто вы?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="ROLE_DOCTOR" onChange={(e) => setAccount(prevState => ({ ...prevState, role: e.target.value }))} control={<Radio />} label="Доктор" />
                                            <FormControlLabel value="ROLE_USER" onChange={(e) => setAccount(prevState => ({ ...prevState, role: e.target.value }))} control={<Radio />} label="Пациент" />
                                        </RadioGroup>
                                    </FormControl>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Запомнить меня" />
                                </Form.Group>

                                <ThemeProvider theme={theme} >
                                    <Button
                                        style={{ width:'130px' }}
                                        onClick={signin}
                                        variant='contained'>Войти</Button>
                                </ThemeProvider>

                                {/* <Button onClick={signin} variant="primary" >
                                    Войти
                                </Button> */}
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}



export default LoginPage;
