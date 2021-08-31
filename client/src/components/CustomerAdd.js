import {post} from 'axios';
import React from 'react';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : null, //byte 형태
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
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
            fileName : ''
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
    render (){
        return (
            <form onSubmit = {this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type = "file" name = "file" file = {this.state.file} value = {this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange}/><br/>
                생년월일 : <input type = "text" name = "birthday" value = {this.state.birthday} onChange = {this.handleValueChange}/><br/>
                성별 : <input type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange}/><br/>
                직업 : <input type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/><br/>
                 <button type = "submit">추가하기</button>
            </form>
        )
    }
}
export default CustomerAdd;