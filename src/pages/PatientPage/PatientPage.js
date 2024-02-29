import React from 'react'
import { Grid, TextField, Modal, Box, IconButton, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, Stack, Button, InputLabel, Input, InputAdornment, AccountCircle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns'
import Checkbox from '@mui/material/Checkbox';
import { orange, grey } from '@mui/material/colors';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
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
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Menu from '@mui/material/Menu';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputMask from "react-input-mask";
import './PatientPage.css'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Calendar from 'react-calendar/dist/umd/Calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

import styles from '../DoctorPage/DoctorPage.module.css'


export default function PatientPage() {
  const navigate = useNavigate();

  const [date, onChangeDate] = useState(new Date());

  const [patientInfo, setPatientInfo] = useState([])
  const [patientName, setPatientName] = useState()
  const [doctorsList, setDoctorsList] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




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


  const theme = createTheme({
    palette: {

      primary: {
        // This is green.A700 as hex.
        main: '#FF725E',
        contrastText: '#fff'
      },
    },
  });
  const [treatmentDetails, setTreatmentDetails] = useState([])

  const [openMenu, setOpenMenu] = useState(false);
  const getTreatmentDetails = (patientIin, doctorIin) => {
    axios.get(`http://localhost:8080/api/v1/treatment/detail/${patientIin}/${doctorIin}`)
      .then(response => {


        console.log(response.data)

        response.data.map((day, i) =>
          day.date == format(new Date(), 'yyyy-MM-dd') ?
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
        setTreatmentDetails(response.data)
      })
  }

  const saveProgress = (time, checked) => {
    var newProgress = {
      doctorIin: selectedDoctor.iin,
      pacientIin: localStorage.getItem('myiin'),
      progress: [
        {
          time: format(new Date(), 'yyyy-MM-dd') + "T" + time,
          done: checked
        }
      ]
    }
    axios.post('http://localhost:8080/api/v1/treatment/progress', newProgress)
      .then(response => console.log(response))
      .catch(error => alert(error))

    console.log(newProgress)

  }

  const [comment, setComment] = useState('')

  const sendComment = (time, comment) => {
  
    var commentdata = {
      pacientIin:localStorage.getItem('myiin'),
      doctorIin: selectedDoctor.iin,
      doctorComment: "",
      pacientComment: comment,
      date: format(new Date(), 'yyyy-MM-dd') + "T" + time
    }
    axios.post('http://localhost:8080/api/v1/treatment/comment', commentdata)
    .then(response => alert('Комментарий сохранен'))
    .catch(err=> alert('Комментарий не сохранен'))
    console.log(comment)
  }

  useEffect(() => {
    getWeek()

    axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('myiin')}`)
      .then(response => {
        console.log(response.data)
        setPatientInfo(response.data)
        setPatientName(response.data.fio.split(' '))
      })

    axios.get(`http://localhost:8080/api/v1/treatment/relationship/doctor/list/${localStorage.getItem('myiin')}`)
      .then(response => {
        console.log(response.data)
        setDoctorsList(response.data)
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
          <Box className='patient_info'>
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
                  {patientName ?
                    <p style={{ cursor: 'pointer' }} onClick={handleOpen}>{patientName[0]} {patientName[1]}</p>
                    :
                    null
                  }
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
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>


                {doctorsList.map((doctor, i) =>
                  <div onClick={() => {
                    getTreatmentDetails(localStorage.getItem('myiin'), doctor.iin)
                    setSelectedDoctor(doctor)

                  }
                  }
                    key={i} style={{ marginLeft: '30px', marginTop: '50px', width: '70%', cursor: 'pointer' }}>
                    <Grid
                      container
                      display="row"
                      className='doctor_card'
                      style={{ background: doctor.iin == selectedDoctor.iin ? '#FF725E ' : null }}
                    >
                      <Grid xs={3} item>
                        <img src={noavatar} style={{ width: '60px', height: '60px', margin: '10px' }} />

                      </Grid>
                      <Grid xs={4} item >

                        <Grid container justifyContent='flex-start' alignItems='center' className="doctor">
                          <h5 style={{ width: '100%', fontSize: '17px', color: doctor.iin == selectedDoctor.iin ? '#FFFFFF' : '#455A64' }}>{doctor.fio}</h5>
                          {/* <h6>Хирург</h6> */}
                        </Grid>
                      </Grid>
                      <Grid xs={5} item>
                        <Grid
                          container
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <LocalPhoneOutlinedIcon style={{ marginTop: '20px', marginRight: '20px', color: doctor.iin == selectedDoctor.iin ? '#FFFFFF' : null }} />

                        </Grid>
                      </Grid>

                    </Grid>
                  </div>
                )}


              </Grid>


              <Grid style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }} item xs={6}>
                {selectedDoctor.length == 0 ?
                  <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Calendar onChange={onChangeDate} value={date} />
                  </div>
                  :
                  <div className={styles.treatment}>
                    <div className={styles.treatment_patient}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={noavatar} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
                        <h6 >{selectedDoctor.fio}</h6>
                      </div>
                      <div>

                        <IconButton onClick={() => setSelectedDoctor([])}>
                          <CloseIcon />
                        </IconButton>

                      </div>
                    </div>
                    {week ?
                      <div className={styles.calendar_week}>

                        <div>
                          <div>Пн</div>
                          <div className={week.monday == week.today ? styles.today_week : null}>{week.monday}</div>
                        </div>
                        <div>
                          <div>Вт</div>
                          <div className={week.tuesday == week.today ? styles.today_week : null}>{week.tuesday}</div>
                        </div>
                        <div>
                          <div>Ср</div>
                          <div className={week.wednesday == week.today ? styles.today_week : null}>{week.wednesday}</div>
                        </div>
                        <div>
                          <div>Чт</div>
                          <div className={week.thursday == week.today ? styles.today_week : null}>{week.thursday}</div>
                        </div>
                        <div>
                          <div>Пт</div>
                          <div className={week.friday == week.today ? styles.today_week : null}>{week.friday}</div>
                        </div>
                        <div>
                          <div>Сб</div>
                          <div className={week.saturday == week.today ? styles.today_week : null}>{week.saturday}</div>
                        </div>
                        <div>
                          <div>Вс</div>
                          <div className={week.sunday == week.today ? styles.today_week : null}>{week.sunday}</div>
                        </div>
                      </div>
                      :
                      null
                    }

                    <div style={{ width: '100%', height: '500px', marginTop: '10px', alignItems: 'center' }}>
                      {times.map((item, i) =>
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
                                {item.done ?
                                  <Checkbox
                                    checked={item.done}
                                    sx={{
                                      color: grey[550],
                                      '&.Mui-checked': {
                                        color: orange[800],
                                      },
                                    }}
                                  // onClick={(e) => saveProgress(item.value, e.target.checked)}
                                  />
                                  :
                                  <Checkbox
                                    // checked={item.done}
                                    disabled={item.done}
                                    sx={{
                                      color: grey[550],
                                      '&.Mui-checked': {
                                        color: orange[800],
                                      },
                                    }}
                                    onClick={(e) => {
                                      item.done = true
                                      saveProgress(item.value, e.target.checked)
                                    }}
                                  />
                                }

                              </div>
                              <div style={{ position: 'relative' }}>
                                <ChatBubbleOutlineOutlinedIcon
                                  id={i + 'button'}
                                  aria-controls={openMenu ? i + 'menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={openMenu ? "true" : undefined}
                                  style={{ color: 'grey', cursor: 'pointer' }}
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
                                      height: '270px',
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
                                      <TextField
                                        id="filled-multiline-static"
                                        label="Заметка врачу"
                                        multiline
                                        rows={3}
                                        // value={item.pacientComment}
                                        onBlur={(e)=> setComment(e.target.value)}
                                        variant="filled"
                                      />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                      <ThemeProvider theme={theme}>
                                        <Button style={{ width: '150px' }} onClick={()=> sendComment(item.value, comment)} variant='outlined'>Отправить</Button>
                                      </ThemeProvider>
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
                      )}


                    </div>

                  </div>
                }


              </Grid>


            </Grid>

          </Box>
        </Grid>




      </Box>
      <div className='footer'>
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
                    <h6 style={{ textAlign: 'center' }}>Возраст: {getAge(patientInfo.birthDate)}</h6>
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
                      {patientName && patientInfo ?
                        <div>
                          <h6>{patientName[0]}</h6>
                          <h6>{patientName[1]}</h6>
                          <h6>{patientName[2]}</h6>
                          <h6>{patientInfo.city.toUpperCase()}</h6>
                          <h6>{patientInfo.iin}</h6>
                          {patientInfo.gender == 'male' ?
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



      </div>
    </div >
  )
}
