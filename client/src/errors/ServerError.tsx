
import { Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";


export default function ServerError () {

    const {state} = useLocation();
    return (
        //<div component={Paper}>
        <div>
            {state?.error? (
                <div style={{margin:'2%'}}>
                <Typography sx={{marginTop:'3%'}} gutterBottom variant="h3" color="secondary">{state.error.title}</Typography>
                <Divider/>
                <Typography variant="body1">{state.error.detail || 'Internal server error'}</Typography>
                </div>
            ):(
                <Typography gutterBottom variant="h5">Server error</Typography> 
            )}
        </div>
    )
}