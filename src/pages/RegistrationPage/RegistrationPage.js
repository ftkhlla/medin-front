import { Grid, TextField, Box, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, Stack, Button } from '@mui/material';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import patientreg from '../../assets/images/patientreg.png'
import doctorreg from '../../assets/images/doctorreg.png'

import back from '../../assets/images/back.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputMask from "react-input-mask";
import './RegistrationPage.css'
import { Link, useNavigate } from 'react-router-dom'
function RegistrationPage() {
    const navigate = useNavigate();
    const [isPatient, setPatient] = useState(true);
    const [isDoctor, setDoctor] = useState(false)
    const [accountInfo, setAccountInfo] = useState({
        fio: '',
        iin: '',
        phoneNumber: '',
        city: '',
        gender: '',
        birthDate: '',
        login: '',
        password: '',
        role: 'ROLE_USER',
        email: ''
    })
    const theme = createTheme({
        palette: {

            primary: {
                // This is green.A700 as hex.
                main: '#FF725E',
                contrastText: '#fff'
            },
        },
    });

    const registerAccount = () => {

        if (accountInfo.fio != ''
            && accountInfo.phoneNumber != ''
            && accountInfo.iin != ''
            && accountInfo.city != ''
            && accountInfo.gender != ''
            && accountInfo.birthDate != ''
            && accountInfo.login != ''
            && accountInfo.password != ''
            && accountInfo.role != ''
            && accountInfo.email != ''
        ) {
            axios.post('http://localhost:8080/api/v1/registration', accountInfo)
                .then((response) => {
                    alert('Вы успешно зарегестрировались. Нажмите OK для перехода на страницу авторизации.')

                    setTimeout(()=>{
                        navigate('/login')
                    },500)

                })
                .catch((error)=>{alert(error.response.data.result)})
                
        }
        else {
            alert('Заполните все данные');
        }
        console.log(accountInfo)
        

    }

    return (
        <div className="body">
            <Box className="main_container">
                <Grid container>
                    <Grid item style={{ marginLeft: '150px' }}>
                        <Link to="/"> <img src={back} style={{ width: '20px', height: '20px', marginTop: '-200px', }} /></Link>
                    </Grid>
                </Grid>

                <Grid container spacing={0} direction="row"
                    justifyContent="center"
                    alignItems="flex-start">


                    <Grid
                        xs={0}
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >

                        {isPatient ?
                            <div className='button_option_pressed'>
                                Patient
                            </div>
                            :
                            <div onClick={() => { setPatient(true); setDoctor(false); setAccountInfo(prevstate => ({ ...prevstate, role: 'ROLE_USER' })) }} className='button_option'>
                                Patient
                            </div>
                        }
                        {isDoctor ?
                            <div className='button_option_pressed'>
                                Doctor
                            </div>
                            :
                            <div onClick={() => { setPatient(false); setDoctor(true); setAccountInfo(prevstate => ({ ...prevstate, role: 'ROLE_DOCTOR' })) }} className='button_option'>
                                Doctor
                            </div>
                        }


                    </Grid>
                    <Grid container xs={9} className="registration_fields">
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="center"
                            xs={6}
                        >
                            <div style={{ width: '80%', marginTop: '30px' }}>
                                <h5 className='registration_text'>Регистрация</h5>
                                {isPatient ?
                                    <h6 className='registration_text'>Пациент</h6>
                                    :
                                    <h6 className='registration_text'>Доктор</h6>

                                }
                            </div>
                            <div style={{ width: '80%' }}>
                                <TextField fullWidth onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, fio: e.target.value }))} id="standard-basic" label="ФИО" variant="standard" />
                                <TextField fullWidth onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, iin: e.target.value }))} id="standard-basic" label="ИИН" variant="standard" />
                                <TextField fullWidth onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, city: e.target.value }))} id="standard-basic" label="Город" variant="standard" />
                            </div>
                            <div style={{ width: '80%', marginTop: '15px' }}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Пол</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel onChange={(e) => setAccountInfo(prevstate => ({ ...prevstate, gender: e.target.value }))} value="male" control={<Radio />} label="Мужской" />
                                        <FormControlLabel onChange={(e) => setAccountInfo(prevstate => ({ ...prevstate, gender: e.target.value }))} value="female" control={<Radio />} label="Женский" />

                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <Grid
                                container

                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                style={{ marginTop: '15px', width: '80%' }}
                            >
                                <InputMask
                                    mask="+7(999) 999 99 99"
                                    disabled={false}
                                    maskChar=" "
                                    onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, phoneNumber: e.target.value.replace(/[^\d]/g, '') }))}

                                >
                                    {() => <TextField placeholder='+7'

                                        style={{ marginRight: '10px' }} />}
                                </InputMask>
                                <TextField
                                    onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, birthDate: e.target.value }))}
                                    id="date"
                                    label="Дата рождения"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <div style={{ width: '80%' }}>
                                <TextField fullWidth
                                    onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, email: e.target.value }))}
                                    id="standard-basic" label="E-mail" variant="standard" />
                                <TextField
                                    onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, login: e.target.value }))}
                                    fullWidth id="standard-basic" label="Логин" variant="standard" />
                                <TextField
                                    onBlur={(e) => setAccountInfo(prevstate => ({ ...prevstate, password: e.target.value }))}
                                    fullWidth id="standard-basic" label="Пароль" type="password" variant="standard" />

                            </div>
                            <div style={{ width: '80%', marginTop: '20px' }}>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={registerAccount} variant='contained'>Регистрация</Button>
                                </ThemeProvider>
                            </div>
                            <div style={{ width: '80%', marginTop: '20px' }}>
                                <p>Есть аккаунт? <Link to="/login" style={{ textDecoration: 'none' }}><span style={{ color: "#FF725E" }}>Вход </span></Link></p>
                            </div>

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            xs={6}
                        >
                            {isPatient ?
                                <img src={patientreg} style={{ width: '400px', height: '400px', margin: '0 auto' }} />
                                :
                                <img src={doctorreg} style={{ width: '400px', height: '400px', margin: '0 auto' }} />

                            }
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
            <div className='footer'>

            </div>
        </div >
    );
}



export default RegistrationPage;
