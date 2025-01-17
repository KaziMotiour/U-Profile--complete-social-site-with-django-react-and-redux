import {GET_POST_START, GET_POST_SUCCESS, SHARE_POST_SUCCESS, GET_USER_WON_POST_SUCCESS, GET_SINGLE_POST} from './ActionTypes'
import axios from 'axios'


export const GetPostStart = () =>({
    type:GET_POST_START
})
export const GetPostSuccess = (posts) =>({
    type:GET_POST_SUCCESS,
    posts:posts
})
export const SharePostSuccess = (shareInfo) =>(
    console.log(shareInfo,'helloooo'),
    {
    
    type:GET_USER_WON_POST_SUCCESS,
    shareInfo:shareInfo
}
)

export const UserWonPost = (posts) =>(
    {
    type: GET_USER_WON_POST_SUCCESS,
    userWonPost : posts
})

export const getSinglePost = (post) =>(
    {
        type:GET_SINGLE_POST,
        post:post
    }
)

export const GetPostList = (config) => async dispatch => {

    try{
        dispatch(GetPostStart)
        axios.get('https://kmotiour.pythonanywhere.com/post/list/',config).then(res =>{
                
                dispatch(GetPostSuccess(res.data))
        }
        )
    }catch(err){
        console.log(err);
    }

}

export const CreatePost = (data, config) => async dispatch =>{

    try{
        axios.post('https://kmotiour.pythonanywhere.com/post/create/',data, config).then(res =>{
           
            dispatch(GetPostList(config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}

export const LikePost = (id, username, config) => async dispatch =>{

    try{
        axios.get(`https://kmotiour.pythonanywhere.com/post/like/${id}`, config).then(res =>{
           
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username,  config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}

export const CommentPost = (id, username, data, config) => async dispatch =>{
    console.log(id, data.get('comment'), config);
    try{
        axios.post(`https://kmotiour.pythonanywhere.com/post/comment/${id}`, data, config).then(res =>{
           
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username,  config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}

export const CommentUpdate = (id, username, data, config) => async dispatch =>{
    console.log(id, data.get('comment'), config);
    try{
        axios.put(`https://kmotiour.pythonanywhere.com/post/comment/rud/${id}`, data, config).then(res =>{
            
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username,  config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}
export const CommentDelete = (id, username, config) => async dispatch =>{
    try{
        axios.delete(`https://kmotiour.pythonanywhere.com/post/comment/rud/${id}`, config).then(res =>{
            
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username,  config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}



export const ChangePrivacy = (id, username, data, config) => async dispatch =>{
    console.log(data.get('privacy'),'privacy');
    try{
        axios.put(`https://kmotiour.pythonanywhere.com/post/detail/${id}`, data, config).then(res =>{
            
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username,  config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}


export const SharePost = (id, username, data, config) => async dispatch =>{
    console.log(data.get('sharePostContent'));
    try{
        axios.post(`https://kmotiour.pythonanywhere.com/post/rePost/${id}`, data, config).then(res =>{
           
            
            localStorage.setItem('RePost', res.data.RePost)
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username, config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}

export const EditPost = (id, username, data, config) => async dispatch =>{
   
    try{
        axios.put(`https://kmotiour.pythonanywhere.com/post/detail/${id}`, data, config).then(res =>{
           
            localStorage.setItem('updated','success')
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
            dispatch(GetUserWonPostList(username, config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                localStorage.setItem('updated','failed')
            }
        })
    }catch(e){
        console.log(e);
    }
}
export const DeletePosts = (id, username, config) => async dispatch =>{
    try{
        axios.delete(`https://kmotiour.pythonanywhere.com/post/detail/${id}`, config).then(res =>{
           
    
            localStorage.setItem('deleted','Deleted')
            dispatch(GetPostList(config))
            dispatch(GetSinglePost(id, config))
           {username && dispatch(GetUserWonPostList(username, config))}
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
                localStorage.setItem('deleted','failed')
            }
        })
    }catch(e){
        console.log(e);
    }
}


export const GetUserWonPostList = (username, config) => async dispatch => {

    try{
        axios.get(`https://kmotiour.pythonanywhere.com/post/${username}`, config).then(res =>{
                
                dispatch(UserWonPost(res.data))
        }
        )
    }catch(err){
        console.log(err);
    }

}

export const GetSinglePost = (id, config) => async dispatch => {

    try{
        axios.get(`https://kmotiour.pythonanywhere.com/post/detail/${id}`, config).then(res =>{
                
                dispatch(getSinglePost(res.data))
        }
        )
    }catch(err){
        console.log(err);
    }

}

