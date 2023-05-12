import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export const CardComp=({title,btn})=>{
    return(
        <Card sx={{ minWidth: 150, }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {title}
        </Typography>
        
      </CardContent>
      <CardActions sx={{ m:10 }}>
        <Button size="large">{btn}</Button>
      </CardActions>
    </Card>
    );
}

// {/* <Box className="dets">
//             <CardComp title="View Patient Details" btn="View"/>
//             <CardComp title="Appointments" btn="View"/>
//             <CardComp title="Manage Doctors" btn="View"/>
// </Box> */}