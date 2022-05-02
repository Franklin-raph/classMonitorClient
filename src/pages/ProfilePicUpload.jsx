import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
    uploadButton :{
        width: '100%',
        outline: 'none',
        fontSize: '20px',
        background: 'rgb(0, 33, 65)',
        color: '#fff',
        // marginTop: '1rem',
        // marginBottom:'18px',
        borderRadius: "50px"
    }
})

const ProfilePicUpload = () => {

    const studentDetails = useSelector(state => state.student)
    const navigate = useNavigate();
    const { id } = useParams();

    const [file, setFile] = useState();
    const [imageError, setImageError] = useState("");
    const [firstName, setFirstName] = useState(studentDetails.value.signedInStudent.firstName);
    const [lastName, setLastName] = useState(studentDetails.value.signedInStudent.lastName);
    const [email, setEmail] = useState(studentDetails.value.signedInStudent.email);
    const [phoneNum, setPhoneNum] = useState(studentDetails.value.signedInStudent.phoneNum);
    const [address, setAddress] = useState(studentDetails.value.signedInStudent.address);
    const [gender, setGender] = useState(studentDetails.value.signedInStudent.gender);
    const [github, setGithub] = useState(studentDetails.value.signedInStudent.github);
    
    const classes = useStyles();

    const handleFileSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', file)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('phoneNum', phoneNum)
        formData.append('address', address)
        formData.append('gender', gender)
        formData.append('github', github)

        if(file === undefined){
            setImageError("The field is empty")
            setTimeout(() => setImageError(""), 5000)

        }else if(formData.get("image").size > 100000){
            setImageError("Images size is more than 100kb")
            setTimeout(() => setImageError(""), 5000)
        } else {
            try {
                // https://classmonitorapp.herokuapp.com
                const resp = await fetch(`https://classmonitorapp.herokuapp.com/student/uploadprofilepic/${id}`,{
                    method: "PUT",
                    body: formData,
    
            })
                const data = await resp.json();
                console.log(data)
                localStorage.setItem('studentDetails', JSON.stringify(data))
                navigate(`/dashboard`)
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }

        
    }
  return (
      <Container sx={{marginTop: '2rem'}}>
          <p style={{ color: 'red' }}>{imageError}</p>
          <form onSubmit={handleFileSubmit} style={{marginTop:'16px'}}>
              <input type="file" className={classes.uploadButton} onChange={(e) => setFile(e.target.files[0])}/>
        <Button variant="contained" color="success" size="md" sx={{marginTop:'16px', outline:'none !important'}} onClick={handleFileSubmit}>
            Upload Image
        </Button>
        {/* <img src="" alt="" srcset={file.name} /> */}
          </form>
        
      </Container>
  )
}

export default ProfilePicUpload