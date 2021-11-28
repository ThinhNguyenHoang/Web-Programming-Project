import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import default_food_image from "../../assets/images/defaul_food_image.jpg";
import {Button, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import ThemedButton, {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";

// ? Food Combo Schema
const data = [
    {
        FoodID: '4',
        FoodName: 'Canh chua thịt',
        Picture: null,
        Price: '60000',
        Description: 'Món canh cà chua thịt bằm là một trong những món ăn phổ biến và dễ làm nhất trong các bữa ăn hàng ngày. Món ăn này sẽ mang lại hương vị thơm ngon, ăn mãi không chán bất kể trời nóng hay lạnh cho người thân của bạn. Bạn có thể ăn kèm món canh này cùng với món tôm chiên giòn cho bữa ăn thêm tròn vị.',
        Instruct: null
    },
    {
        FoodID: '5',
        FoodName: 'Bò nướng lá lốt',
        Picture: null,
        Price: '270000',
        Description: 'Bò nướng lá lốt hay còn gọi là bò lá lốt hoặc là thịt bò lá lốt hay bò cuốn lá lốt là một món ăn trong ẩm thực Việt Nam, thịnh hành ở vùng Nam bộ, nguyên liệu chính là thịt bò và lá lốt được chế biến theo phương pháp nướng, có thể kèm theo mỡ chài. Các loại rau sống ăn kèm rất phong phú như: xà lách, húng quế, diếp cá, chuối chát, dưa leo, khế và chấm mắm nêm. Món này đặc trưng bởi vị hấp dẫn với vị ngon của thịt bò nướng lá lốt, béo của đậu phộng hòa chung vị chát của chuối, chua của khế, vị thanh thanh của nhiều loại rau giòn mát, cùng hương mắm nêm cay cay',
        Instruct: null
    }
]

const FoodBriefInfo = ({food_item}) => {
    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 345,
            bgcolor: `elevation.layer2.main`,
            boxShadow: 2
        }}>
            <CardMedia
                component="img"
                height="194"
                image={food_item.picture_uri ? food_item.picture_uri : default_food_image}
                alt={food_item.name ? food_item.name : "No food image info"}
            />
            <CardHeader
                sx={{color: 'elevation.layer2.contrast'}}
                title={<Typography variant={`body1`} color={`info.main`}>
                    {food_item.name ? food_item.name : "No food name info"}
                </Typography>
                }
                subheader={<Typography variant={`body2`} color={`primary.main`}>
                    {food_item.price ? `${food_item.price.substring(0, food_item.price.length - 3)} K` : `Not available`}
                </Typography>}
            />
        </Card>
    );
}

function TabPanel({children, value, index, ...other}) {
    console.log("TAB WITH INDEX:",index);
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function ComboItemCard({combo_item}, ...props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log("SET NEW VALUE: ",newValue);
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const handleAddCart=()=>{
        
    }

    return (
        <Card sx={{maxWidth:345}}>
            <Box sx={{borderBottom: 1, borderColor: "divider",mx:2}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {combo_item.food_in_combo.map((item, index) => {
                        return <Tab label={item.name} key={index}/>
                    })
                    }
                </Tabs>
                {combo_item.food_in_combo.map((item,index) => {
                    console.log("INDEX IS: ",index);
                    return <TabPanel  value={value} index={index}  children={<FoodBriefInfo food_item={item} key={index}/>}>
                    </TabPanel>
                })}
            </Box>
            <CardContent>
                    <Typography variant={`h6`} color={`primary.main`}>
                        {combo_item.name || "COMBO NAME"}
                    </Typography>
                    <Typography variant={`body1`}  color={`primary.main`}>
                        {combo_item.price || "39999K"}
                    </Typography>
            </CardContent>

            <CardContent>
                <CardActions disableSpacing>
                    <ThemedOutlineButton onClick={handleAddCart}>
                        ORDER NOW
                    </ThemedOutlineButton>
                </CardActions>
            </CardContent>
        </Card>
    );
}

