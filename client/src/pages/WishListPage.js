import React from 'react';
import Box from "@mui/material/Box";
import {WishListGrid} from "../components/Food/RecommendationGrid";

const WishListPage = () => {
    return (
        <Box bgcolor={`elevation.layer0.main`}>
            <WishListGrid/>
        </Box>
    );
};

export default WishListPage;
