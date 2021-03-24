import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ProfileInfo from './profileInfo/ProfileInfo'
import ProfilePost from './profilePost/profilePost'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {VerifyJwtToken} from '../../store/actions/Auth'

import Nav from '../../component/Nav'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width:'100%',
        ['@media (max-width: 920px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%',
            
          },
    },
    profileInfo:{
        width:'100%',
        margin:0,
        padding:0,
       
    },
    profilePost:{
        width:'100%',
        margin:0,
        padding:0,
        marginTop:20,
       
    }
  })
)

function ProfilePage() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [openGallery, setOpenGalley] = useState(false) 
    const [openFollwoing, setOpenFollwoing] = useState(false)
    const [openFollower, setOpenFollower] = useState(false)
    const [openTimeline, setOpenTimeline] = useState(false)

    const config = { headers: {'Authorization': "Bearer " + localStorage.getItem('access_token')}}
    useEffect(()=>{
        dispatch(VerifyJwtToken(config))
    },[])

    useEffect(()=>{
        checkAuthenticatin()
    },[])




    const checkAuthenticatin =()=>{
        const access_token = localStorage.getItem('access_token')
        if(!access_token){
            history.push({
                pathname: '/login',
                state: { detail: 'session expired, Try to login again' }
              })
        }
      }
    return (
        <div className={classes.root}>
            <Nav />


            {/* profile info */}
            <div className={classes.profileInfo}>
            <ProfileInfo />
            </div>
            
            {/*  */}
            <div className={classes.profilePost}>
            <ProfilePost />
            </div>
            
        </div>
    )
}

export default ProfilePage