import React from 'react'
import { orange, grey } from '@mui/material/colors';

import Checkbox from '@mui/material/Checkbox';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {
    Grid, TextField, Box, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup,
    Stack, Button, InputLabel, Input,
    InputAdornment, AccountCircle, IconButton,
    Modal, Typography, Select, MenuItem
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import patientreg from '../../assets/images/patientreg.png'
import back from '../../assets/images/back.png'
import medinicon from '../../assets/images/medin_icon.png'
import avatar from '../../assets/images/avatar.png'
import noavatar from '../../assets/images/noavatar.png'
import prescription from '../../assets/images/prescription.png'
import Calendar from 'react-calendar/dist/umd/Calendar';
import 'react-calendar/dist/Calendar.css';

import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputMask from "react-input-mask";
import styles from './DoctorPage.module.css'
import { CircularProgress } from "react-cssfx-loading";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format } from 'date-fns'
import { WeekendOutlined } from '@mui/icons-material';

export default function DoctorPage() {
    const [selectedDay, setSelectedDay] = useState(format(new Date(), 'yyyy-MM-dd'))
    const navigate = useNavigate();
    const [doctorInfo, setDoctorInfo] = useState([])
    const [doctorName, setDoctorName] = useState()
    const [patientsList, setPatientsList] = useState([])
    const [refresh, setRefresh] = useState(false)

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const [searching, setSearching] = useState(false)
    const [searchPatient, setSearchPatient] = useState([])
    const [newPatient, setNewPatient] = useState([])

    const addPatient = (patient, doctor) => {
        setRefresh(true)
        setTimeout(() => {
            var body = {
                doctorIin: doctor,
                pacientIin: patient
            }
            axios.post('http://localhost:8080/api/v1/treatment/relationship', body)
                .then((response) => {
                    axios.get(`http://localhost:8080/api/v1/treatment/relationship/pacient/list/${localStorage.getItem('myiin')}`)
                        .then(response => {
                            console.log(response.data)
                            setPatientsList(response.data)
                        })

                })
                .catch((error) => { alert(error) })
            setRefresh(false)
        }, 500)
        console.log(patientsList)
    }

    const deletePatient = (patient, doctor) => {
        setRefresh(true)
        setTimeout(() => {
            axios.delete(`http://localhost:8080/api/v1/treatment/relationship/${doctor}/${patient}`)
                .then(response =>
                    axios.get(`http://localhost:8080/api/v1/treatment/relationship/pacient/list/${localStorage.getItem('myiin')}`)
                        .then(response => {
                            console.log(response.data)
                            setPatientsList(response.data)
                        }))
                .catch(error => console.log(error))
            setRefresh(false)
        }, 500)


    }

    const getPatient = (e, iin) => {
        if (e.key == 'Enter') {
            axios.get(`http://localhost:8080/api/v1/user/${parseInt(iin)}`)
                .then(response => {
                    setSearching(true)
                    setNewPatient(response.data)
                    setSearching(false)
                })
        }

    }

    const saveTreatment = (treatment) => {
        axios.post("http://localhost:8080/api/v1/treatment", treatment)
            .then(response => {
                alert(response.data)
                console.log(response)
            })
            .catch(error => alert(error.response.data.result))
    }

    const [date, onChangeDate] = useState(new Date());
    const [week, setWeek] = useState([])
    const getWeek = () => {
        var curr = new Date(); // get current date
        var today = new Date()
        var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        // var first2 = first + 1;
        var second = first + 1;
        var third = first + 2;
        var fourth = first + 3;
        var fifth = first + 4;
        var sixth = first + 5;
        var last = first + 6; // last day is the first day + 6

        if (today.getDay() == 0) {
            var firstday = new Date(curr.setDate(first - 7)).getDate();
            var secondday = new Date(curr.setDate(second - 7)).getDate();
            var thirdday = new Date(curr.setDate(third - 7)).getDate();
            var fourthhday = new Date(curr.setDate(fourth - 7)).getDate();
            var fifthday = new Date(curr.setDate(fifth - 7)).getDate();
            var sixthday = new Date(curr.setDate(sixth - 7)).getDate();
            var lastday = new Date(curr.setDate(last - 7)).getDate();
        }
        else {
            var firstday = new Date(curr.setDate(first)).getDate();
            var secondday = new Date(curr.setDate(second)).getDate();
            var thirdday = new Date(curr.setDate(third)).getDate();
            var fourthhday = new Date(curr.setDate(fourth)).getDate();
            var fifthday = new Date(curr.setDate(fifth)).getDate();
            var sixthday = new Date(curr.setDate(sixth)).getDate();
            var lastday = new Date(curr.setDate(last)).getDate();

        }

        console.log(firstday, secondday, thirdday, fourthhday, fifthday, sixthday, lastday)
        setWeek({
            today: today.getDate(),
            monday: firstday,
            tuesday: secondday,
            wednesday: thirdday,
            thursday: fourthhday,
            friday: fifthday,
            saturday: sixthday,
            sunday: lastday
        })
        // console.log(week)
    }



    const [times, setTime] = useState([
        {
            time: '09:00',
            value: '09:00:00.000'
        },
        {
            time: '10:00',
            value: '10:00:00.000'

        },
        {
            time: '11:00',
            value: '11:00:00.000'
        },
        {
            time: '12:00',
            value: '12:00:00.000'
        },
        {
            time: '13:00',
            value: '13:00:00.000'
        },
        {
            time: '14:00',
            value: '14:00:00.000'
        },
        {
            time: '15:00',
            value: '15:00:00.000'
        },
        {
            time: '16:00',
            value: '16:00:00.000'
        },
        {
            time: '17:00',
            value: '17:00:00.000'
        },
        {
            time: '18:00',
            value: '18:00:00.000'
        },
        {
            time: '19:00',
            value: '19:00:00.000'
        },
        {
            time: '20:00',
            value: '20:00:00.000'
        },
        {
            time: '21:00',
            value: '21:00:00.000'
        },
        {
            time: '22:00',
            value: '22:00:00.000'
        },
        {
            time: '23:00',
            value: '23:00:00.000'
        },
        {
            time: '24:00',
            value: '24:00:00.000'
        },
    ])
    const [startDate, setStartDate] = useState(new Date())
    const handleChangeStartDate = (newValue) => setStartDate(newValue)

    const [endDate, setEndDate] = useState(new Date())
    const handleChangeEndDate = (newValue) => setEndDate(newValue)

    const [selectedPatient, setSelectedPatient] = useState([])

    const [treatmentDetails, setTreatmentDetails] = useState([])

    const [refreshTreatment, setRefreshTreatment] = useState(false)


    const [openMenu, setOpenMenu] = useState(false);
    const getTreatmentDetails = (patientIin, doctorIin, date) => {

        setRefreshTreatment(true)
        axios.get(`http://localhost:8080/api/v1/treatment/detail/${patientIin}/${doctorIin}`)
            .then(response => {

                console.log(response.data)
                response.data.map((day, i) =>
                    // day.date == date ?
                    day.time.map((time, i) =>
                        times.map((item, i) => {
                            if (item.medicine) {
                                delete item.medicine
                            }
                        }
                        )
                    )
                    // :
                    // null

                )
                response.data.map((day, i) =>
                    day.date == date ?
                        day.time.map((time, i) =>
                            times.map((item, i) => {
                                if (time.time == item.value) {
                                    console.log('medicine is set to ' + item.value)
                                    item.medicine = day.medicine[0].name
                                    item.done = time.done
                                    item.open = false;
                                    item.pacientComment = time.pacientComment
                                }
                            }
                            )
                        )
                        :
                        null

                )
                console.log(selectedDay)
                setTreatmentDetails(response.data)
                setTimeout(() =>
                    setRefreshTreatment(false)
                    , 500)
                console.log(times)


            })
    }

    const saveProgress = (time, checked) => {
        var newProgress = {
            doctorIin: localStorage.getItem('myiin'),
            pacientIin: selectedPatient.iin,
            progress: [
                {
                    time: selectedDay + "T" + time,
                    done: checked
                }
            ]
        }
        axios.post('http://localhost:8080/api/v1/treatment/progress', newProgress)
            .then(response => console.log(response))
            .catch(error => alert(error))

        console.log(newProgress)

    }

    const changeTimes = () => {
        treatmentDetails.map((day, i) =>
            day.date == selectedDay ?
                day.time.map((time, i) =>
                    times.map((item, i) => {
                        if (time.time == item.value) {
                            console.log('medicine is set to ' + time.time)
                            item.medicine = day.medicine[0].name
                        }
                    }
                    )
                )
                :
                null

        )
    }

    const [treatment, setTreatment] = useState({
        start: format(new Date(), 'yyyy-MM-dd'),
        end: format(new Date(), 'yyyy-MM-dd'),
        frequencyInPeriod: '',
        frequencyInDay: 1,
        medicine: [],
        timeToMedicine: [],
        pacientIin: '',
        doctorIin: localStorage.getItem('myiin'),
        comment: ''
    })

    const [firstmenu, setFirstMenu] = useState(true)



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        height: 600,
        bgcolor: '#FCFCFC',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        outline: 'none',
        p: 4,
    };
    const [openTreatment, setOpenTreatment] = useState(false)
    const handleOpenTreatment = () => setOpenTreatment(true)
    const handleCloseTreatment = () => setOpenTreatment(false)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = createTheme({
        palette: {

            primary: {
                // This is green.A700 as hex.
                main: '#FF725E',
                contrastText: '#fff'
            },
        },
    });

    const [stats, setStats] = useState('day')

    // console.log('2022-04-25'.split('-')[1])


    useEffect(() => {
        getWeek()



        axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('myiin')}`)
            .then(response => {
                console.log(response.data)
                setDoctorInfo(response.data)
                setDoctorName(response.data.fio.split(' '))
            })

        axios.get(`http://localhost:8080/api/v1/treatment/relationship/pacient/list/${localStorage.getItem('myiin')}`)
            .then(response => {
                console.log(response.data)
                setPatientsList(response.data)
            })
    }, []);

    return (
        <div className="body">

            <Box className="main_container">

                <Grid container>
                    <Grid item style={{ marginLeft: '130px' }}>
                        <img onClick={() => navigate(-1)} src={back} style={{ width: '20px', height: '20px', marginTop: '-200px', cursor: 'pointer' }} />
                    </Grid>
                </Grid>

                {/* logo name and avatar row  */}
                <Grid container spacing={0} direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Box className={styles.patient_info}>
                        <Grid container
                            direction="row"
                            style={{ width: '100%' }}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <img src={medinicon} style={{ width: '50px', height: '60px', marginLeft: '30px' }} />
                            <Box >
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    style={{ marginRight: '20px', marginTop: '20px' }}
                                >
                                    <p style={{ cursor: 'pointer' }} onClick={handleOpen}>{doctorInfo.fio}</p>
                                    <img src={noavatar} style={{ width: '60px', height: '60px', marginLeft: '30px' }} />

                                </Grid>
                            </Box>
                        </Grid>
                        {/* patient info about doctors and calendar */}
                        <Grid container direction="row" style={{ marginTop: '50px' }}>
                            <Grid item xs={6} >
                                <div style={{ marginLeft: '30px' }}>
                                    <h5>Something about this page</h5>
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Поиск
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            onKeyDown={(e) => { getPatient(e, e.target.value) }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>


                                <div style={{ marginLeft: '30px', marginTop: '10px', position: 'absolute' }}>
                                    <div className={styles.green_circle}></div>
                                    <div className={styles.yellow_circle}></div>
                                    <div className={styles.red_circle}></div>
                                </div>

                                <div className={styles.my_patients}>
                                    {refresh ?
                                        <div className={styles.loader}>
                                            <CircularProgress color="#FF725E" width="300px" height="300px" duration="1s" />
                                        </div>
                                        :
                                        patientsList.map((patient, i) =>
                                            <div key={i} onClick={() => {
                                                getTreatmentDetails(patient.iin, localStorage.getItem('myiin'), selectedDay)
                                                setSelectedPatient(patient)
                                            }
                                            } style={{ marginLeft: '60px', marginTop: '20px', width: '430px', cursor: 'pointer' }}>
                                                <Grid
                                                    container
                                                    display="row"
                                                    className='doctor_card'
                                                    style={{ background: patient.iin == selectedPatient.iin ? '#FF725E ' : null }}
                                                >
                                                    <Grid xs={3} item>
                                                        <img src={noavatar} style={{ width: '60px', height: '60px', margin: '10px' }} />

                                                    </Grid>
                                                    <Grid xs={6} item >

                                                        <Grid container justifyContent='flex-start' alignItems='center' className="doctor">
                                                            <div style={{ width: '100%' }}>
                                                                <h5 style={{ width: '100%', fontSize: '17px', color: patient.iin == selectedPatient.iin ? '#FFFFFF' : '#455A64' }}>{patient.fio}</h5>
                                                                <div className={styles.green_circle}></div>
                                                            </div>

                                                        </Grid>
                                                    </Grid>
                                                    <Grid xs={3} item>
                                                        <Grid
                                                            container
                                                            justifyContent="flex-end"
                                                            alignItems="center"
                                                        >
                                                            {/* <LocalPhoneOutlinedIcon style={{ marginTop: '20px', marginRight: '20px' }} />
                                                            <CloseIcon onClick={() => deletePatient(patient.iin, localStorage.getItem('myiin'))}></CloseIcon> */}
                                                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '15px' }}>
                                                                <IconButton >
                                                                    <LocalPhoneOutlinedIcon style={{ color: patient.iin == selectedPatient.iin ? '#FFFFFF' : null }} />
                                                                </IconButton>
                                                                <IconButton style={{ color: patient.iin == selectedPatient.iin ? '#FFFFFF' : null }} onClick={() => {
                                                                    if (selectedPatient.iin == patient.iin) {
                                                                        setSelectedPatient([])

                                                                    }
                                                                    deletePatient(patient.iin, localStorage.getItem('myiin'))

                                                                }
                                                                }>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </div>

                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </div>
                                        )
                                    }
                                </div>
                                {newPatient.length != 0 ?
                                    <div className={styles.searchPatients}>
                                        {searching ?
                                            <div className={styles.loader}>
                                                <CircularProgress color="#FF725E" width="300px" height="300px" duration="1s" />
                                            </div>
                                            :
                                            <div>
                                                <h6 style={{ marginBottom: '10px' }}>Найден 1 пациент</h6>
                                                {newPatient.length != 0 ?
                                                    <div className={styles.new_patient}>

                                                        <div className={styles.new_patient_avatar}>
                                                            <img src={noavatar} style={{ width: '60px', height: '60px', marginTop: '10px', marginLeft: '25px' }} />

                                                        </div>
                                                        <div className={styles.new_patient_name}>
                                                            <h6 style={{ marginTop: '20px' }}>{newPatient.fio}</h6>
                                                        </div>
                                                        <div className={styles.new_patient_add}>
                                                            <IconButton onClick={() => {

                                                                addPatient(newPatient.iin, localStorage.getItem('myiin'))
                                                                setNewPatient([])
                                                            }} style={{ marginLeft: '45px' }} >
                                                                <AddIcon />
                                                                {/* <CheckIcon color='success'/> */}
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        }
                                    </div>
                                    :
                                    null
                                }

                            </Grid>
                            <Grid style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }} item xs={6}>
                                {selectedPatient.length == 0 ?
                                    <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                                        <Calendar onChange={onChangeDate} value={date} />
                                    </div>
                                    :
                                    firstmenu ?
                                        <div className={styles.treatment}>
                                            {/* <Button onClick={() => changeTimes()}>ChangeTimes</Button>
                                            <Button onClick={() => console.log(times)}>LogTimes</Button>
                                            <Button onClick={() => console.log(treatmentDetails)}>LogTreatmentDetails</Button> */}


                                            <div className={styles.treatment_patient}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <img src={noavatar} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
                                                    <h6>{selectedPatient.fio}</h6>
                                                </div>
                                                <div>

                                                    <IconButton >
                                                        <ListIcon onClick={() => setFirstMenu(false)} />
                                                    </IconButton>
                                                    <IconButton onClick={() => setSelectedPatient([])}>
                                                        <CloseIcon />
                                                    </IconButton>

                                                </div>
                                            </div>
                                            <div style={{ padding: '10px', marginTop: '10px' }}>
                                                <div style={{ width: '100%', height: '200px', padding: '10px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <DriveFileRenameOutlineIcon style={{ cursor: 'pointer' }} />
                                                    </div>
                                                    <div >
                                                        <p style={{ padding: '10px 30px' }}>Заметки которые оставил доктор</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ padding: '10px', marginTop: '10px' }}>
                                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px' }}>

                                                    {stats == 'day' ?
                                                        <div style={{ width: '33%', textAlign: 'center', cursor: 'pointer' }}>
                                                            <h6 onClick={() => setStats('day')} style={{ color: '#FF725E' }}>День</h6>
                                                        </div>
                                                        :
                                                        <div onClick={() => setStats('day')} style={{ width: '33%', textAlign: 'center', cursor: 'pointer' }}>
                                                            <h6>День</h6>
                                                        </div>
                                                    }

                                                    {stats == 'week' ?
                                                        <div onClick={() => setStats('week')} style={{ width: '33%', textAlign: 'center', cursor: 'pointer' }}>
                                                            <h6 style={{ color: '#FF725E' }}>Неделя</h6>
                                                        </div>
                                                        :
                                                        <div onClick={() => setStats('week')} style={{ width: '33%', textAlign: 'center', cursor: 'pointer' }}>
                                                            <h6>Неделя</h6>
                                                        </div>
                                                    }
                                                    {stats == 'month' ?
                                                        <div onClick={() => setStats('month')} style={{ width: '33%', textAlign: 'center', cursor: 'pointer' }}>
                                                            <h6 style={{ color: '#FF725E' }}>Месяц</h6>
                                                        </div>
                                                        :
                                                        <div onClick={() => setStats('month')} style={{ width: '33%', textAlign: 'center', cursor: 'pointer' }}>
                                                            <h6>Месяц</h6>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div style={{ padding: '10px', marginTop: '10px', position: 'relative' }}>

                                                {stats == 'day' ?
                                                    <div>
                                                        {/* stats день
                                                    9 часов утра 76px начальная точка
                                                    73px = 3 часа
                                                    24.3px = 1 час
                                                    162px = 100%
                                                */}

                                                        {treatmentDetails.map((day, i) =>
                                                            day.date == selectedDay ?
                                                                day.time.map((time, i) => {
                                                                    if (parseInt(time.time.split(':')[0]) == 9 && time.time) {
                                                                        return (
                                                                            <div key={i} style={{
                                                                                position: 'absolute',
                                                                                left: '76px', height: '162px',
                                                                                bottom: '67px',
                                                                                borderLeft: time.done ? '5px solid #FF725EC2' : '5px solid #455A6473'
                                                                            }} />
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <div key={i} style={{
                                                                                position: 'absolute',
                                                                                left: `${76 + (parseInt(time.time.split(':')[0]) - 9) * 24.3}px`,
                                                                                height: '162px', bottom: '67px',
                                                                                borderLeft: time.done ? '5px solid #FF725EC2' : '5px solid #455A6473'
                                                                            }} />
                                                                        )
                                                                    }
                                                                }
                                                                )
                                                                :
                                                                null
                                                        )}
                                                    </div>
                                                    :
                                                    null
                                                }

                                                {stats == 'week' ?
                                                    <div>
                                                        {/* stats неделя
                                                    9 часов утра 70px начальная точка
                                                    65px = день
                                                    162px = 100%
                                                */}
                                                        {treatmentDetails.map((day, i) => {
                                                            if (parseInt(day.date.split('-')[2]) == week.monday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '60px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                            else if (parseInt(day.date.split('-')[2]) == week.tuesday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '125px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                            else if (parseInt(day.date.split('-')[2]) == week.wednesday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '190px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                            else if (parseInt(day.date.split('-')[2]) == week.thursday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '255px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                            else if (parseInt(day.date.split('-')[2]) == week.friday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '310px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                            else if (parseInt(day.date.split('-')[2]) == week.saturday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '375px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                            else if (parseInt(day.date.split('-')[2]) == week.sunday) {
                                                                return (
                                                                    <div key={i} style={{ position: 'absolute', left: '440px', height: `${parseFloat(day.percent) * 1.62}px`, bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                                )
                                                            }
                                                        })}

                                                    </div>
                                                    :
                                                    null
                                                }
                                                {stats == 'month' ?
                                                    <div>
                                                        {/* stats месяц
                                                    40px = между 1 день и 5 день
                                                    76px = 5 дней
                                                    14.6px = 1 день
                                                    162px = 100%
                                                */}
                                                        {treatmentDetails.map((day, i) => {
                                                            if (day.date.split('-')[1] == selectedDay.split('-')[1] && parseInt(day.date.split('-')[2]) > 5) {
                                                                return (
                                                                    <div key={i} style={{
                                                                        position: 'absolute',
                                                                        left: `${76 + (parseInt(day.date.split('-')[2]) - 5) * 14.6}px`,
                                                                        height: `${parseFloat(day.percent) * 1.62}px`,
                                                                        bottom: '67px',
                                                                        borderLeft: '5px solid #FF725EC2'
                                                                    }} />
                                                                )
                                                            }
                                                            else if (day.date.split('-')[1] == selectedDay.split('-')[1] && parseInt(day.date.split('-')[2]) < 5) {
                                                                return (
                                                                    <div key={i} style={{
                                                                        position: 'absolute',
                                                                        left: `${36 + parseInt(day.date.split('-')[2]) * 7.2}px`,
                                                                        height: `${parseFloat(day.percent) * 1.62}px`,
                                                                        bottom: '67px',
                                                                        borderLeft: '5px solid #FF725EC2'
                                                                    }} />
                                                                )
                                                            }
                                                            else if (day.date.split('-')[1] == selectedDay.split('-')[1] && parseInt(day.date.split('-')[2]) == 1) {
                                                                return (
                                                                    <div key={i} style={{
                                                                        position: 'absolute',
                                                                        left: `${36}px`,
                                                                        height: `${parseFloat(day.percent) * 1.62}px`,
                                                                        bottom: '67px',
                                                                        borderLeft: '5px solid #FF725EC2'
                                                                    }} />
                                                                )
                                                            }
                                                        }

                                                        )}
                                                        {/* <div style={{ position: 'absolute', left: '36px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} /> */}

                                                        {/* <div style={{ position: 'absolute', left: '76px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} /> */}
                                                        {/* <div style={{ position: 'absolute', left: '149px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                        <div style={{ position: 'absolute', left: '222px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                        <div style={{ position: 'absolute', left: '295px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                        <div style={{ position: 'absolute', left: '368px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} />
                                                        <div style={{ position: 'absolute', left: '441px', height: '162px', bottom: '67px', borderLeft: '5px solid #FF725EC2' }} /> */}
                                                    </div>
                                                    :
                                                    null
                                                }
                                                <div style={{ height: '200px', display: 'flex', flexDirection: 'row', width: '440px' }}>
                                                    <div style={{ width: '30px', display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ height: '40px' }}>100%</div>
                                                        <div style={{ height: '40px' }}>75%</div>
                                                        <div style={{ height: '40px' }}>50%</div>
                                                        <div style={{ height: '40px' }}>25%</div>
                                                        <div style={{ height: '40px' }}>0%</div>
                                                    </div>
                                                    <div style={{ width: '405px' }}>
                                                        <div style={{ height: '40px', paddingTop: '12px' }}><hr style={{ margin: '0' }} /></div>
                                                        <div style={{ height: '40px', paddingTop: '12px' }}><hr style={{ margin: '0' }} /></div>
                                                        <div style={{ height: '40px', paddingTop: '12px' }}><hr style={{ margin: '0' }} /></div>
                                                        <div style={{ height: '40px', paddingTop: '12px' }}><hr style={{ margin: '0' }} /></div>
                                                        <div style={{ height: '40px', paddingTop: '12px' }}><hr style={{ margin: '0' }} /></div>
                                                    </div>
                                                </div>
                                                {stats == 'day' ?
                                                    <div style={{ height: '30px', display: 'flex', flexDirection: 'row', width: '440px' }}>

                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6> 9</h6>
                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>12</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>15</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>18</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>21</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>24</h6>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                }
                                                {stats == 'week' ?
                                                    <div style={{ height: '30px', display: 'flex', flexDirection: 'row', width: '440px' }}>

                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Пн</h6>
                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Вт</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Ср</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Чт</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Пт</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Сб</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>Вс</h6>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                }
                                                {stats == 'month' ?
                                                    <div style={{ height: '30px', display: 'flex', flexDirection: 'row', width: '440px' }}>

                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6> 5</h6>
                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>10</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>15</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>20</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>25</h6>

                                                        </div>
                                                        <div style={{ width: '73px', justifyContent: 'flex-end', display: 'flex' }}>
                                                            <h6>30</h6>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                }

                                            </div>
                                        </div>
                                        :
                                        <div className={styles.treatment}>
                                            <div className={styles.treatment_patient}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <img src={noavatar} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
                                                    <h6 onClick={() => console.log(times)} >{selectedPatient.fio}</h6>
                                                </div>
                                                <div>
                                                    <IconButton onClick={() => {

                                                        setFirstMenu(true)
                                                    }
                                                    }>
                                                        <EventNoteOutlinedIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleOpenTreatment()}>
                                                        <AddIcon />
                                                    </IconButton>


                                                </div>
                                            </div>
                                            {week ?
                                                <div className={styles.calendar_week}>

                                                    <div>
                                                        <div>Пн</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.monday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.monday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}
                                                            style={{ cursor: 'pointer' }} className={week.monday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.monday}</div>
                                                    </div>
                                                    <div>
                                                        <div>Вт</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.tuesday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.tuesday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}
                                                            style={{ cursor: 'pointer' }} className={week.tuesday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.tuesday}</div>
                                                    </div>
                                                    <div>
                                                        <div>Ср</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.wednesday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.wednesday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}

                                                            style={{ cursor: 'pointer' }} className={week.wednesday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.wednesday}</div>
                                                    </div>
                                                    <div>
                                                        <div>Чт</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.thursday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.thursday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}
                                                            style={{ cursor: 'pointer' }} className={week.thursday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.thursday}</div>
                                                    </div>
                                                    <div>
                                                        <div>Пт</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.friday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.friday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}
                                                            style={{ cursor: 'pointer' }} className={week.friday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.friday}</div>
                                                    </div>
                                                    <div>
                                                        <div>Сб</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.saturday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.saturday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}
                                                            style={{ cursor: 'pointer' }} className={week.saturday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.saturday}</div>
                                                    </div>
                                                    <div>
                                                        <div>Вс</div>
                                                        <div
                                                            onClick={() => {
                                                                var tmpday = selectedDay.split('-');
                                                                if (week.monday > 10) {
                                                                    tmpday[2] = '' + week.sunday
                                                                }
                                                                else {
                                                                    tmpday[2] = '0' + week.sunday
                                                                }
                                                                setSelectedDay(tmpday.join('-'))
                                                                getTreatmentDetails(selectedPatient.iin, localStorage.getItem('myiin'), tmpday.join('-'))

                                                                console.log(tmpday)
                                                            }}
                                                            style={{ cursor: 'pointer' }} className={week.sunday == parseInt(selectedDay.split('-')[2]) ? styles.today_week : null}>{week.sunday}</div>
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }

                                            <div style={{ width: '100%', height: '500px', marginTop: '10px', alignItems: 'center' }}>
                                                {refreshTreatment ?
                                                    <div className={styles.loader}>
                                                        <CircularProgress color="#FF725E" width="300px" height="300px" duration="1s" />
                                                    </div>
                                                    :

                                                    times.map((item, i) =>
                                                        item.medicine ?
                                                            <div key={i} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                                <div style={{ width: '10%', padding: '5px', height: '30px', textAlign: 'center' }}>
                                                                    <h6 style={{ margin: '5px' }}>{item.time}</h6>
                                                                </div>
                                                                <div style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', width: '90%', padding: '5px', height: '30px' }}>
                                                                    <div style={{ width: '80%', paddingLeft: '30px', paddingTop: '18px' }}>
                                                                        <h6 className={styles.treatment_medicine}>{item.medicine}</h6>
                                                                    </div>
                                                                    <div>
                                                                        <Checkbox
                                                                            checked={item.done}
                                                                            sx={{
                                                                                color: grey[550],
                                                                                '&.Mui-checked': {
                                                                                    color: orange[800],
                                                                                },
                                                                            }}
                                                                            onClick={(e) => console.log(item.value, e.target.checked, selectedDay)}
                                                                        />
                                                                    </div>
                                                                    <div style={{ position: 'relative' }}>
                                                                        <ChatBubbleOutlineOutlinedIcon style={{ color: 'grey', cursor: 'pointer' }}
                                                                            onClick={(e) => {
                                                                                times[i].open = true;
                                                                                setOpenMenu(true)
                                                                            }
                                                                            }
                                                                        />
                                                                        {item.open && openMenu ?
                                                                            <div style=
                                                                                {{
                                                                                    padding: '10px',
                                                                                    position: 'absolute',
                                                                                    width: '300px',
                                                                                    height: '210px',
                                                                                    right: '50px',
                                                                                    zIndex: '10',
                                                                                    background: '#FCFCFC',
                                                                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                                                                    borderRadius: '5px'
                                                                                }}>
                                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                                                                    <IconButton onClick={() => {
                                                                                        times[i].open = false;
                                                                                        setOpenMenu(false)
                                                                                    }}>
                                                                                        <CloseIcon />
                                                                                    </IconButton>
                                                                                </div>
                                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                                    <h6>{item.time}</h6>
                                                                                    <h6>{item.medicine}</h6>
                                                                                </div>

                                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                                    {/* <TextField
                                                                                        style={{color:'black'}}
                                                                                        disabled
                                                                                        id="filled-multiline-static"
                                                                                        // label="Заметка врачу"
                                                                                        multiline
                                                                                        rows={3}
                                                                                        value={item.pacientComment}
                                                                                        // onBlur={(e)=> setComment(e.target.value)}
                                                                                        variant="filled"
                                                                                    /> */}
                                                                                    <div style={{background: '#F1F1F1', width:'190px', height:'100px', padding:'10px'}}>
                                                                                        <p>{item.pacientComment}</p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div key={i} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                                <div style={{ width: '10%', padding: '5px', height: '30px', textAlign: 'center' }}>
                                                                    <h6 style={{ margin: '5px' }}>{item.time}</h6>
                                                                </div>
                                                                <div style={{ width: '90%', padding: '5px', height: '30px' }}>
                                                                    <hr ></hr>
                                                                </div>
                                                            </div>
                                                    )

                                                }
                                            </div>
                                        </div>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
            <div className='footer'>
                {/* Modals */}
                {/* Modal doctor info */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <div className={styles.personal_info}>
                            <div className={styles.personal_info_1}>
                                <div className={styles.my_avatar_age}>
                                    <div className={styles.avatar}>
                                        <img src={noavatar} style={{ width: '100px', height: '100px', marginTop: '30px', marginLeft: '105px' }} />

                                    </div>
                                    <div className={styles.age}>
                                        <h6 style={{ textAlign: 'center' }}>Возраст: {getAge(doctorInfo.birthDate)}</h6>
                                    </div>
                                    <div className={styles.change_avatar}>
                                        <ThemeProvider theme={theme}>
                                            <Button style={{ display: 'block', margin: 'auto' }} variant='outlined'>Изменить фото</Button>
                                        </ThemeProvider>
                                    </div>

                                </div>

                                <div className={styles.my_info}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <DriveFileRenameOutlineIcon style={{ cursor: 'pointer' }} />

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ width: '140px' }} className={styles.field_name}>
                                            <h6>Имя</h6>
                                            <h6>Фамлия</h6>
                                            <h6>Город</h6>
                                            <h6>Год рождения</h6>
                                            <h6>ИИН</h6>
                                            <h6>Пол</h6>

                                        </div>
                                        <div className={styles.field_value}>
                                            {doctorName && doctorInfo ?
                                                <div>
                                                    <h6>{doctorName[0]}</h6>
                                                    <h6>{doctorName[1]}</h6>
                                                    <h6>{doctorName[2]}</h6>
                                                    <h6>{doctorInfo.city.toUpperCase()}</h6>
                                                    <h6>{doctorInfo.iin}</h6>
                                                    {doctorInfo.gender == 'male' ?
                                                        <h6>Мужской</h6>
                                                        :
                                                        <h6>Женский</h6>
                                                    }

                                                </div>
                                                :
                                                null
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={styles.personal_info_2}>
                                <div className={styles.medical_card}>
                                    <div className={styles.medical_card_name}>
                                        <h6>Медицинская карта</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>

                {/* Modal set treatment */}
                <Modal
                    open={openTreatment}
                    onClose={handleCloseTreatment}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <div style={{ width: '50%', paddint: '10px' }}>
                                <div style={{ padding: '0 30px', width: '100%' }}>
                                    <TextField
                                        onBlur={(e) => treatment.medicine = [e.target.value]}
                                        fullWidth
                                        id="standard-basic"
                                        label="Название"
                                        variant="standard" />
                                </div>
                                <div style={{ padding: '20px 30px', width: '100%' }}>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onChange={(e) => treatment.frequencyInPeriod = e.target.value}
                                        >
                                            <FormControlLabel value="1in1" control={<Radio />} label="Каждый день" />
                                            <FormControlLabel value="1in2" control={<Radio />} label="1 разв два дня" />
                                            <FormControlLabel value="3in7" control={<Radio />} label="3 раза в неделю" />

                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={{ padding: '0 30px', width: '100%' }}>
                                    <img src={prescription} style={{ width: '270px', height: '270px' }} />

                                </div>
                            </div>
                            <div style={{ width: '50%' }}>
                                <div style={{ padding: '0 30px' }}>
                                    <TextField style={{
                                        background: '#FAFAFA',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '5px'
                                    }}
                                        onBlur={(e) => treatment.comment = e.target.value}
                                        fullWidth id="outlined-basic" label="Комментарий" variant="outlined" />
                                </div>
                                <div style={{
                                    marginTop: '30px',
                                    height: '360px',
                                    width: '100%',
                                    padding: '20px 30px',
                                    background: '#FDFDFD',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    borderRadius: '5px'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                                        <h6 style={{ marginRight: '15px' }}>Повтор</h6>
                                        <FormControl size="small" style={{ width: '100px' }} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Кол-во</InputLabel>
                                            <Select
                                                defaultValue=""
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={treatment.frequencyInDay}
                                                label="Age"
                                                onChange={(e) => {
                                                    if (e.target.value == 1 && treatment.timeToMedicine.length == 3) {
                                                        treatment.timeToMedicine.splice(1, 2)
                                                    }
                                                    else if (e.target.value == 1 && treatment.timeToMedicine.length == 2) {
                                                        treatment.timeToMedicine.splice(1)
                                                    }
                                                    setTreatment(prevState => ({ ...prevState, frequencyInDay: e.target.value }))
                                                }}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    {treatment.frequencyInDay == 1 || treatment.frequencyInDay == 2 || treatment.frequencyInDay == 3 ?
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                                            <h6 style={{ marginRight: '23px' }}>Время</h6>
                                            <FormControl size="small" style={{ width: '100px' }} fullWidth>
                                                <Select
                                                    defaultValue=""
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={treatment.timeToMedicine[0]}
                                                    label="Age"
                                                    onChange={e => {
                                                        treatment.timeToMedicine[0] = e.target.value
                                                    }}
                                                >

                                                    {times.map((item, i) =>
                                                        <MenuItem key={i} value={item.value}>{item.time}</MenuItem>

                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        : null
                                    }
                                    {treatment.frequencyInDay == 2 || treatment.frequencyInDay == 3 ?
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                                            <h6 style={{ marginRight: '23px' }}>Время</h6>
                                            <FormControl size="small" style={{ width: '100px' }} fullWidth>
                                                <Select
                                                    defaultValue=""
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={treatment.timeToMedicine[1]}
                                                    label="Age"
                                                    onChange={e => {
                                                        treatment.timeToMedicine[1] = e.target.value
                                                    }}
                                                >

                                                    {times.map(item =>
                                                        <MenuItem value={item.value}>{item.time}</MenuItem>

                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        : null
                                    }
                                    {treatment.frequencyInDay == 3 ?
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                                            <h6 style={{ marginRight: '23px' }}>Время</h6>
                                            <FormControl size="small" style={{ width: '100px' }} fullWidth>
                                                <Select
                                                    defaultValue=""

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={treatment.timeToMedicine[2]}
                                                    label="Age"
                                                    onChange={e => {
                                                        treatment.timeToMedicine[2] = e.target.value
                                                    }}
                                                >

                                                    {times.map(item =>
                                                        <MenuItem value={item.value}>{item.time}</MenuItem>

                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        : null
                                    }





                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                                        <h6 style={{ marginRight: '15px' }}>Начало</h6>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    label="Date desktop"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={treatment.start}
                                                    onChange={(e) => setTreatment(prevState => ({ ...prevState, start: format(e, 'yyyy-MM-dd') }))}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                            </Stack>
                                        </LocalizationProvider>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>

                                        <h6 style={{ marginRight: '23px' }}>Конец</h6>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="Date desktop"
                                                        inputFormat="dd/MM/yyyy"
                                                        value={treatment.end}
                                                        onChange={(e) => setTreatment(prevState => ({ ...prevState, end: format(e, 'yyyy-MM-dd') }))}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div>

                                        <ThemeProvider theme={theme}>
                                            <Button variant='outlined' onClick={() => {
                                                treatment.pacientIin = selectedPatient.iin
                                                console.log(treatment)
                                                saveTreatment(treatment)
                                            }}>Назначить лечение</Button>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Box>
                </Modal>
            </div>

        </div >
    )
}
