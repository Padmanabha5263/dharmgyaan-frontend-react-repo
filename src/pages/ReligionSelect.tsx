import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, Container, Typography } from "@mui/material";
import { Religion, useReligion } from "../utils/features/religion.ts";

export default function ReligionSelect() {
  const navigate = useNavigate();
  const religion = useReligion({ initialLoad: true });

  const handleSelect = (religion: Religion) => {
    navigate("/quiz", { state: religion });
  };

  return (
    <Box
      sx={{
        minHeight: '200px',
        display: 'grid',
        bgcolor: 'background.default',
        py: 2,
        px: 2,
        gap: 2,
        width: { xs: '100%', sm: 400, md: 600 },
        mx: 'auto'
      }}
    >
      <h1>Choose Your Spiritual Path</h1>
      <p>This helps us personalize your quiz experience.</p>
      {
        religion.data.length && religion.data.map((religion, index) => {
          return (
            <Card key={religion.religion_id}>
              <CardActionArea
                onClick={() => handleSelect(religion)}
                data-active={true}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography variant="h5" component="div">
                    {religion.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {religion.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      }
    </Box>
  );
}