import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import doctor from '../../assets/images/doctor.png'
import './MainPage.css'
import { Link } from 'react-router-dom'
function MainPage() {
    const theme = createTheme({
        palette: {

            primary: {
                // This is green.A700 as hex.
                main: '#FF725E',
                contrastText: '#fff'
            },
        },
    });
    return (
        <div className="body">
            <Container className='main_container'>
                <Row className="justify-content-md-center">
                    <Col >
                        <Row>
                            <p className='header_text'>Making Health
                            </p>
                            <p className='header_text'>
                                Care Better Together </p>
                        </Row>
                        <Row>
                            <p className='header_text2'>Женщина — Прекрасная, женщина — Легендарная, женщина –
                                Великая, женщина — Богиня. Женщина – самое прекрасное и самое
                                загадочное создание во вселенной. Без женщины мир наш
                                был бы намного скучнее. </p>
                        </Row>

                        <Row >
                            <div className='button_container'>
                                <ThemeProvider theme={theme} >
                                    <Link style={{textDecoration: 'none'}} to="/login">
                                        <Button
                                            style={{ width: '200px' }}
                                            // onClick={signin}
                                            variant='contained'>Войти</Button>
                                    </Link>
                                </ThemeProvider>
                                <ThemeProvider theme={theme} >
                                    <Link style={{textDecoration: 'none'}} to="/registration">
                                        <Button
                                            style={{ width: '200px', marginTop: '20px' }}
                                            // onClick={signin}
                                            variant='outlined'>Регистрация</Button>
                                    </Link>
                                </ThemeProvider>
                            </div>
                        </Row>
                    </Col>
                    <Col >
                        <Row className="justify-content-md-center">
                            <img src={doctor} style={{ width: '500px', height: '500px' }} />
                        </Row>
                    </Col>
                    {/* <Col md="auto">Variable width content</Col> */}

                </Row>
                <Row className="justify-content-md-center">
                </Row>
            </Container>
        </div>
    );
}



export default MainPage;
