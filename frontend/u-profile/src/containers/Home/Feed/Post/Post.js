import React, {forwardRef, useState, useEffect} from "react";
import { Avatar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';   
import  VerifiedUserIcon  from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShareIcon from '@material-ui/icons/Share';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

// drop down import
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//end drop down import
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {GetPostList, LikePost, CommentPost, ChangePrivacy} from '../../../../store/actions/PostCrud'
import {VerifyJwtToken} from '../../../../store/actions/Auth'
import "./Post.css";
import { CommentTwoTone } from "@material-ui/icons";
import Comment from './comment/Comment'
import SharedPost from './sharePost/SharePost'
import EditPost from './editPost/EditPost'
import DeletePost from './deletePost/DeletePost'

// dropdown style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    text:{
      width:'70%',
    }
    
  }),
);

const Privacyoptions = [
  'public',
  'friends',
  'onlyme',
];
const postOptions = [
  'Edit',
  'Delete',
];
// end dropdown style



const Post  = forwardRef(({id, user, parent, content, image, privacy, is_retweet, is_saved, likes, postComment, timestamp, is_liked, shared_user }, ref) =>{


  // drop down
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector(state => state.user.loggedinUserInfo)
  const [opneEditOption, setOpenEditOption] = useState(false)
  const [opnePrivacyOption, setOpenPrivacyOption] = useState(false)
  const [opneSharePost, setOpenSharePost] = useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [openDeleteForm, setOpenDeleteForm] = React.useState(false)
  const [postComments, setPostComments] = useState('');
  const number_of_comment = postComment.length
  const [commentOpen, setCommentOpen] = useState(false)
  const loggedin_user_info = useSelector(state=> state.user.loggedinUserInfo)
  const shared_users = shared_user.length
 
  const commentControl = () =>{
    setCommentOpen(!commentOpen)

  }

  const HandleLikePost = () =>{
    dispatch(VerifyJwtToken())
    checkAuthenticatin()
    const config = { headers: { 
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    dispatch(LikePost(id, config))

  }
  const HandleCommetPost = (e, id) =>{
    dispatch(VerifyJwtToken())
    checkAuthenticatin()
    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    if(e.code==='Enter'){
      const formData = new FormData()
      formData.append('comment', postComments)
      dispatch(CommentPost(id, formData, config))
      setPostComments('')
    }
    
  }

  const HandlePrivacyChange =(id, option) =>{
    dispatch(VerifyJwtToken())
    checkAuthenticatin()
   
    const config = { headers: { 
      'Content-Type':'application/json',
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }}
    let formData = new FormData()
      formData.append('privacy', option)
      dispatch(ChangePrivacy(id, formData, config))
      
    
  }

  const HandleShareOpen = () =>{
    setOpenSharePost(!opneSharePost)
  }

  const  HandleEditOpen = (option) =>{
    console.log(option, 'optionss');
    if (option==='Edit'){
      setOpenEditForm(!openEditForm)
    }else if(option==='Delete'){
      setOpenDeleteForm(!openDeleteForm)
    }    
}
 


  const closeEditForm = () =>{
    setOpenEditForm(!openEditForm)
  }
  const closeDeleteForm = () =>{
    setOpenDeleteForm(!openDeleteForm)
  }
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
  
    <div className="post" ref={ref} onClick={() =>opneEditOption && setOpenEditOption(false)} >
      {/* {opneEditOption === true && setOpenEditOption(false)} */}
      {!parent ? (
        
      <div className="particular-post" onClick={() =>opnePrivacyOption && setOpenPrivacyOption(false)}>
        {/* Post header part begain */}
        <div className='post-header'>
        
        <div className="post_avatar">
          <Avatar src={user.profile.image} className={classes.large}/>
        </div>
      
        <div className="post__headerText">
            <h3> {user.full_name!=='None None'? user.full_name : user.username}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> @{user.username} </span> 

            </h3 >
            {timestamp.substr(0,10)} {timestamp.substr(10,6)}
        
        </div>
        <div style={{marginLeft:'auto'}} className="nav">
       {loggedin_user_info &&  loggedin_user_info.username === user.username && <nav role="navigation">
                <ul>
                  <li onClick={()=> setOpenEditOption(!opneEditOption)} ><h2>...</h2>
                <ul class="dropdown">
                  {opneEditOption &&
                    postOptions.map( (option) =>(
                    <li onClick={e => HandleEditOpen(option)}  className="option"><p>{option}</p></li>
                    ))
                  }
                  
                  
                </ul>
                  </li>
                </ul>
        </nav>}

        {openEditForm && <EditPost open={true} id={id} postUsername={user.username}
                postUserFullname={user.full_name && user.full_name} postUserImage={user.profile.image} content={content} image={image} loggedInUsername={loggedin_user_info.full_name} loggedInUserImage={loggedin_user_info.profile.image}
                hondleEditFormOpen={closeEditForm} />}
        
        {openDeleteForm && <DeletePost open={true} id={id}  hondleDeleteFormOpen={closeDeleteForm}/>}
        </div>
        </div>
          {/* Post header part end */}
        
        {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> {content} </p>
            
          </div>
          {image && <img style={{width:'90%', height:"350px", marginLeft:'30px'}}  src={image} /> }
              
        </div>
        {/* Post body part end */}

          {/* Post footer part begain */}
          <div className="post_footer">
          <div className="likes" >
            {is_liked ?<FavoriteIcon onClick={id =>HandleLikePost(id)} fontSize="samll" style={{color:'blue', cursor:'pointer'}}/> : <FavoriteIcon onClick={id =>HandleLikePost(id)}  fontSize="samll" style={{ cursor:'pointer'}}/> } &nbsp; {likes}
              </div>
              <div className="comments" style={{display:'flex'}}>
                <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/> &nbsp;{number_of_comment}
              </div>
              {/* privracy begain */}
              <div className="privacy"> 
               <nav role="navigation">
                <ul>
                 <li> 
                   <div onClick={() => setOpenPrivacyOption(!opnePrivacyOption)} style={{display:'flex',marginTop:'-10px'}}> 
                   <PublicIcon fontSize="samll" aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  style={{cursor:'pointer'}}
                    /> &nbsp;<p> {privacy}</p>
                </div>
                {loggedin_user_info && loggedin_user_info.username === user.username && <ul class="dropdown">
                  
                  {opnePrivacyOption &&( <div onClick={() =>setOpenPrivacyOption(!opnePrivacyOption)}>
                  {Privacyoptions.map( (option) =>(
                    <li onClick={e => HandlePrivacyChange(id, option)}  className="option"><p>{option}</p></li>
                  ))} </div>)
                    }

                </ul>}
                  </li>
                </ul>
        </nav>
                
              </div>
              {/* privracy end */}
              <div className="shared" style={{display:'flex', cursor:'pointer'}}>
               
                <ShareIcon onClick={HandleShareOpen} fontSize="default"/>&nbsp; {shared_users} share

                {opneSharePost && (
                <SharedPost open={true} id={id} postUsername={user.username}
                postUserFullname={user.full_name && user.full_name} postUserImage={user.profile.image} content={content} image={image} loggedInUsername={loggedin_user_info.full_name} loggedInUserImage={loggedin_user_info.profile.image}
                hondleShareOpen={HandleShareOpen}
                />)}
                </div>
          </div>
           {/* Post footer part end */}
          
          {/* Comment section */}
          {commentOpen &&
        <div className='comment-section'> 
        <h2 style={{marginLeft:'15px'}}>Commnets</h2>
          
            {postComment && postComment.map(comments => (
             <Comment comment={comments} />
              
            ))}
          
          <div className="comment-input">
          <Avatar  src={ loggedInUser && loggedInUser.profile.image} className={classes.small} style={{marginRight:'10px'}}/> 
          <TextField className={classes.text} onKeyDown={e =>HandleCommetPost(e, id)} onChange={e => setPostComments(e.target.value)} value={postComments}  placeholder="What's you'r mind ?"/>
          </div>


        </div>
        
        }
        {/* Comment section end*/}

      </div>

      ):(

      <div className="particular-post" onClick={() =>opnePrivacyOption && setOpenPrivacyOption(false)}>
        {/* share post part */}
        {/* Post header part begain */}
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={user.profile.image}/>
        </div>
      
        <div className="post__headerText">
            <h3> {user.full_name!=='None None'? user.full_name : user.username}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> shared </span> 
               {parent.user.username}'s post
            </h3 >
            {timestamp.substr(0,10)} {timestamp.substr(10,6)}
        </div>
        {/* post edit options begain */}
        <div style={{marginLeft:'auto'}}>
        {loggedin_user_info &&  loggedin_user_info.username === user.username && <nav role="navigation">
                <ul>
                  <li onClick={()=> setOpenEditOption(!opneEditOption)} ><h2>...</h2>
                <ul class="dropdown">
                  {opneEditOption &&
                    postOptions.map( (option) =>(
                    <li onClick={e => HandleEditOpen(option)}  className="option"><p>{option}</p></li>
                    ))
                  }
                  
                  
                </ul>
                  </li>
                </ul>
        </nav>}
        {openEditForm && <EditPost open={true} id={id} parent={parent} postUsername={parent.user.username} postUserFullname={parent.user.full_name} postUserImage={parent.user.profile.image} content={content} image={parent.image} loggedInUsername={loggedin_user_info && loggedin_user_info.full_name} loggedInUserImage={loggedin_user_info && loggedin_user_info.profile.image} hondleEditFormOpen={closeEditForm} />}

        {openDeleteForm && <DeletePost open={true} id={id}  hondleDeleteFormOpen={closeDeleteForm}/>}
        
      </div>
      {/* post edit options ended */}

        </div>
         {/* Post header part ended */}
         {/* Post body part begain */}
        <div className="post_body">    
          <div className="post__headerDescription">
            <p> 
               {content}</p>
          </div>

          {/* parent post  */}
          <div style={{width:'100%',  height:'auto'}}> 
          <div className="particular-shared-post">
        <div className='post-header'>
        <div className="post_avatar">
          <Avatar src={parent.user.profile.image}/>
        </div>
      
        <div className="post__headerText">
            <h3>{parent.user.full_name !=='None None' ? parent.user.full_name : parent.user.username}
                {/* {varified && <VerifiedUserIcon className="post_badge" /> } */}
                <span className="post_username"> @{parent.user.username}</span> 

            </h3 >
            {parent.timestamp.substr(0,10)} {parent.timestamp.substr(10,6)}
        </div>
        </div>
        <div className="post_body">    
          <div className="post__headerDescription">
            <p>  {parent.content}</p>
          
          </div>
          {parent.image && <img style={{width:'90%', height:"350px", marginLeft:'20px'}}  src={parent.image} /> }
          
              
        </div>


      </div>

          </div>
          {/* parent post  end */}
              
       
        </div>
        {/* Post body part ended */}

        {/* Post fotter part begain */}
          <div className="post_footer">
              <div className="likes">
              {is_liked ?<FavoriteIcon onClick={id =>HandleLikePost(id)} fontSize="samll" style={{color:'blue', cursor:'pointer'}}/> : <FavoriteIcon onClick={id =>HandleLikePost(id)} fontSize="samll" style={{cursor:'pointer'}}/> }&nbsp; {likes}
              </div>
              <div className="comments" style={{display:'flex'}}>
              <ChatBubbleOutlineIcon fontSize="samll" style={{cursor:'pointer'}} onClick={commentControl}/> &nbsp;{number_of_comment}
              </div>
               {/* Post privacy part begain */}
              <div className="privacy"> 
              <nav role="navigation">
                <ul>
                <li  >
                <div onClick={() => setOpenPrivacyOption(!opnePrivacyOption)} style={{display:'flex',marginTop:'-10px'}}> 
                   <PublicIcon fontSize="samll" aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  style={{cursor:'pointer'}}
                    /> &nbsp;<p> {privacy}</p>
                </div>
                <ul class="dropdown">
                  
                  {loggedin_user_info &&  loggedin_user_info.username === user.username && <ul class="dropdown">
                  
                  {opnePrivacyOption &&( <div onClick={() =>setOpenPrivacyOption(!opnePrivacyOption)}>
                  {Privacyoptions.map( (option) =>(
                    <li onClick={e => HandlePrivacyChange(id, option)}  className="option"><p>{option}</p></li>
                  ))} </div>)
                    }

                </ul>}
                </ul>
                </li>
                </ul>
        </nav>
         
      
      </div>
      {/* Post privacy part  */}
              <div className="shared" style={{display:'flex', cursor:'pointer'}}>
                <ShareIcon onClick={() => setOpenSharePost(!opneSharePost)} fontSize="default"/> &nbsp; {shared_users} share
              
                {opneSharePost && (<SharedPost open={true} id={id} postUserFullname={parent.user.full_name} postUserImage={parent.user.profile.image} content={parent.content} image={parent.image} loggedInUsername={loggedin_user_info && loggedin_user_info.full_name} loggedInUserImage={loggedin_user_info && loggedin_user_info.profile.image} hondleShareOpen={HandleShareOpen} 
                
                /> )}

              </div>
          </div>
          {/* Post body part ended */}

          {/* Comment section */}
          {commentOpen &&
        <div className='comment-section'> 
        <h2 style={{marginLeft:'15px'}}>Commnets</h2>
        {postComment && postComment.map(comments => (
              <Comment comment={comments} />
              
            ))}
  
          <div className="comment-input">
          <Avatar src={ loggedInUser && loggedInUser.profile.image} className={classes.small} style={{marginRight:'10px'}}/> 
          <TextField onKeyDown={e =>HandleCommetPost(e, id)}className={classes.text} onChange={e => setPostComments(e.target.value)} value={postComments}  placeholder="What's you'r mind ?"/>
          </div>
        </div>}
        {/* Comment section end*/}

      </div>)}


    </div>
  );
})

export default Post;
