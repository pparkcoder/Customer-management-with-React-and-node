import {post} from 'axios';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display : 'none'
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : null, //byte 형태
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false // 다이어로그 창이 열려 있는지 확인 변수
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault() 
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); //응답을 받고나서 Refresh 실행
            })
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false // 데이터를 받은 후, 즉 사진 업로드 후 창이 닫히게 설정
        })
        //window.location.reload(); // react는 spa형태로 동작함 
                                    // 전체 페이지 새로고침은 비효율적
    }

    handleFileChange = (e) => {
       this.setState({
           file : e.target.files[0],
           fileName : e.target.value
       })
    }

    handleValueChange = (e) => {
        let nextState= {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () =>{
        const url = '/api/customers';
        const formData = new FormData();
        //const formData = new URLSearchParams();
        formData.append('image',this.state.file); // byte 형태의 파일을 image라는 이름으로 전송
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);

        const config = { //전달하고 하는 데이터에 파일이 포함되어 있는 경우
            headers : {
                //'content-type' : 'multipart/form-data' 
            }
        }
        return post(url,formData,config); //실제 서버로 데이터 전송
    }

    handleClickOpen = () => { // 고객 추가버튼을 누른 경우
        this.setState({
            open : true
        });
    }

    handleClose = () => { // 닫기 창을 누른 경우
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        })
    }
    render (){
        const {classes} = this.props;
        return (
            <div>
                <Button variant = 'contained' color = "primary" onClick = {this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open = {this.state.open} onClose = {this.handleClose}> 
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className = {classes.hidden} accept = "image/*" id = "raised-button-file" type = "file" file = {this.state.file} value = {this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor = "raised-button-file">
                            <Button variant = "contained" color = "primary" component = "span" name = "file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label = "이름" type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange}/><br/>
                        <TextField label = "생년월일" type = "text" name = "birthday" value = {this.state.birthday} onChange = {this.handleValueChange}/><br/>
                        <TextField label = "성별" type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange}/><br/>
                        <TextField label = "직업" type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "contained" color = "primary" onClick = {this.handleFormSubmit}>추가</Button>
                        <Button variant = "outlined" color = "primary" onClick = {this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(CustomerAdd);