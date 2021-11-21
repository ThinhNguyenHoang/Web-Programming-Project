import * as React from 'react';
import {Box,Typography,Card, Grid} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FoodCard from '../components/News/FoodCard';
import Nofication from '../components/News/Nofication';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { get_news_actions,selectors } from '../redux/slices/food/FoodSlice'
import { useEffect } from 'react';
import NewsCard from '../components/News/newscard';

const fake_news = {
    title: "This is title",
    img : "https://codelearn.io/Upload/Blog/database-change-notification-oracle-63742419191.3747.jpg",
    description: "this is descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
}

function News (){
    return (
        
    );
}

export default News;