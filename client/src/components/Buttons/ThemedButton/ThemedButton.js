import React, { Component } from "react";
import {Button, withStyles} from "@mui/material";
import {styled} from "@mui/material/styles";

// const styles = theme => {
//     return ({
//         myTab: {
//             fontFamily: 'Courier New',
//         });
// }
//
// class MyTab extends Component {
//
//     render() {
//         return (
//         const {classes, ...other} = this.props
//         <Tab {...other} className={classes.myTab} label="Home" />
//     }
// }

// export default withStyles(styles)(MyTab);


const StyledButton = styled(Button)(({theme}) =>({
    color: theme.palette.primary.main
}));

const StyledOutlinedButton = styled(Button)(({theme}) => ({
    color: theme.palette.button.outlined.main,
}));

export const ThemedOutlineButton = (props) => <StyledOutlinedButton variant={`outlined`} {...props}/>;

export default function ThemedButton(props){
    return <StyledButton {...props}>
    </StyledButton>
}