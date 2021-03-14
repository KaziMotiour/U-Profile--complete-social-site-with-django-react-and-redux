import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";


function SnackBer(props) {
  
    const [state, setState] = React.useState({
        snackBerOpen: false,
        vertical: 'top',
        horizontal: 'center',
      });

      const info = props.success_info
      const {horizontal, vertical, snackBerOpen} = state;

      useEffect(()=>{
          setState({...state, snackBerOpen:props.open})
      },[])

      let confirmInfo = 'No comments'

      if (props.success_info === 'True'){
        confirmInfo="SuccessFully Shared"
        closeDialog()
      }else if(props.success_info === 'success'){
        confirmInfo="Successfully Updated"
        closeDialog()
      }else if(props.success_info === 'Deleted'){
        confirmInfo="Successfully Deleted"
        closeDialog()
      }else if(props.success_info === 'False') {
        confirmInfo="Already shared for today"
        closeDialog()
      }
      const handleOpen = () =>{
        setState({ ...state, snackBerOpen: true });
      }

      async function closeDialog (){
        await new Promise((resolve) => setTimeout(() => { 
            setState({ ...state, snackBerOpen: false });

          
        }, 2000))
      }

  
    
    return (
        <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={snackBerOpen}
                    key={vertical + horizontal}>
                      
                      <SnackbarContent
                        aria-describedby="message-id2"
                        // className={classes.snackbarStyleViaNestedContent}

                        style={props.success_info === 'False' ? {backgroundColor:'rgb(71, 73, 82)'}: {backgroundColor:'green'}}
                        message={
                          <span id="message-id2">
                            <div>{confirmInfo}</div>
                          </span>
                      }
                      />
                    </Snackbar>
                
        </div>
    )
}

export default SnackBer
