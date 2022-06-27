import { Grid } from '@mui/material'

export default function AuthLayout(props: { children: JSX.Element }) {
    return (
        <Grid sx={{marginTop:"20px",
        justifyContent:"space-around"}} container spacing={2}>
            <Grid item xs={3}>
                {props.children}
            </Grid>
            <Grid item xs={9}>
                Ảnh minh họa
            </Grid>
        </Grid>
    )
}
