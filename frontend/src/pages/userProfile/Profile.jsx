import React from "react";
import "./profile.scss";
import { AddCircleOutline, CameraAlt, Edit } from "@material-ui/icons";
import { useState } from "react";
import { storage } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "../../authContext/apiCalls";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import Navbar from '../../components/navbar/Navbar'
import Footer from "../../components/footer/Footer";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const history =useHistory()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userPic, setUserPic] = useState(null);
  const [uploaded, setUploaded] = useState("");
  const [progress, setProgress] = useState(false);
  const [userinfoUpload, setUserinfoUpload] = useState(0);
  const userLocalStorage = localStorage.getItem("user");
  const userinfo = JSON.parse(userLocalStorage)?.user;

  const upload = (items) => {
    items.forEach((item) => {
      const uploadTask = storage
        .ref(`items/${new Date().getTime() + "-" + item.name}`)
        .put(item.file);
      uploadTask.on(
        "state_changes",
        (snapshot) => {
          const progres =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progres);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUploaded((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUserinfoUpload((prev) => prev + 1);
          });
        }
      );
    });
  };

  const updateProfileData = {
    name,
    email,
    password,
    profilePic: uploaded.profilePic,
  };

  const handleUpdateprofile = async (e) => {
    e.preventDefault();
    upload([{ file: userPic, label: "profilePic"}]);
  };

  if (userinfoUpload === 1) {
    if(name !== "" && email !== "" && password !== ""){
      updateProfile(userinfo._id, updateProfileData, user, dispatch);
      setUserinfoUpload((prev) => prev - 1);
      toast.success("Profile Sucsess fully updated")
      history.push("/")
      return;
    }else{
      return toast.error("please fill in all lines ")  
    }
  }
  const handleErrorInputNotValue = (e) => {
    return toast.error("please fill in all lines ")
  }

  return (
  <>
  <Navbar user={user}/>
    <div className="profiles">
        <ToastContainer />
      <div className="container">
        <div className="row -spacing-a"></div>
        <div className="row -spacing-a">
          <div className="col-md-6">
            <div className="profile-image">
              {userinfo.profilePic === "" ? (
                <img
                  src="https://freesvg.org/storage/img/thumb/abstract-user-flat-4.png"
                  className="fullwidth"
                />
              ) : (
                <img src={userinfo?.profilePic} className="fullwidth" />
              )}
              <label htmlFor="userPicUpdate" className="edit-profile-image">
                <span className="edit-profile-image__information">
                  <span className="edit-profile-image__label">
                    <CameraAlt className="btn__icon"  style={{fontSize:"25px",}}/>
                  </span>
                </span>
              </label>
              <input
                onChange={(e) => setUserPic(e.target.files[0])}
                id="userPicUpdate"
                ccept=".jpg,.png,.jpeg"
                type="file"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <h5>My Profile</h5>
            <div className="row -spacing-b">
              <div className="col-md-4">
                <label htmlFor="userName">Name</label>
                <input
                  id="userName"
                  className="form-control -typo-copy"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={userinfo?.name}
                />
                <label htmlFor="userEnail">Email</label>
                <input
                  id="userEnail"
                  className="form-control -typo-copy"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userinfo?.email}
                />
                <label htmlFor="userPassword">Password</label>
                <input
                  id="userPassword"
                  className="form-control -typo-copy"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <div className="col-md-8 m-auto ml-auto">
                {name !== "" &&
                email !== "" &&
                password !== "" &&
                userPic !== null ? (
                  <button
                    onClick={handleUpdateprofile}
                    className="btn btn--green"
                  >
                    <AddCircleOutline className="btn__icon" />
                    <span className="btn__label">Create</span>
                  </button>
                ) : (
                  <button
                    onClick={handleErrorInputNotValue}
                    className="btn btn--green"
                  >
                    <Edit className="btn__icon" />
                    <span className="btn__label">Eite Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Profile;
