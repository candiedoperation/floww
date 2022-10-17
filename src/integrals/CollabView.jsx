import { Box, Grid } from "@mui/material";
import DrawingBoard from "../components/DrawingBoard";

function CollabView() {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <DrawingBoard></DrawingBoard>
        </Grid>
        <Grid item xs={3}>
          <p>ABC</p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CollabView;
