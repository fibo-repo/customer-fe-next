import { useState } from "react";

import { Row, Col, notification } from "antd";
// import { AuthContext } from 'context/AuthProvider';/

// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import {app} from "../../firebase"
import { useFirebase } from "context/FireAuth";
import axios from "axios";
import { API_BASE_URI } from "library/constants/api";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const firebase = useFirebase();
  // const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state] = useState({
    facebook: false,
    github: false,
    // firebase: false,
    google: false,
  });

  const handleGmailLogin = (dataobj) => {
    const url = `${API_BASE_URI}/auth/gmail/login/`;
    const payload = dataobj;
    axios
      .post(url, payload)
      .then((response) => {
        const user_exist = response.data.result[0].user_exist;
        if (user_exist === false) {
          notification.error({
            message: "This email does not exist. Please Signup first.",
            description: response.data.responseInformation.responseMessage,
          });
          setTimeout(() => {
            navigate("/sign-up");
          }, 2000);
        } else {
          const jwtToken = response.data.result[0].jwtToken;
          const userDetails = response.data.result[0].userDetails;
          localStorage.setItem("jwtToken", jwtToken);
          localStorage.setItem("userDetails", JSON.stringify(userDetails));

          notification.success({
            message: "Google Login Succees!!",
            description: response.data.responseInformation.responseMessage,
          });
          setTimeout(() => {
            const redirectUrl =
              localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectUrl);
          }, 2000);
        }
        // TODO: as of now BE is breaking in firbase response.
        // 1. once fixed. data to be set in local, just like otpflow.
        // Handle response here, e.g., save token to localStorage or navigate
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleSocialAuth = async (key) => {
    try {
      const res = await firebase.SigninGoogle();
      const dataobj = {};
      dataobj.email = res.user.email;
      dataobj.firebase_token = res.user.accessToken;
      handleGmailLogin(dataobj);
    } catch (e) {}
  };
  // firebase.putData("users/"+"ss",{user})
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // console.log(user)
  //     // ...
  //   }).then((v)=>alert("suceess"))
  //   // .then(() => {
  //   //   navigate('/', { replace: true });
  //   // })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // setState({
  //   ...state,
  //   [key]: true,
  // });
  // setTimeout(() => {
  //   setState({
  //     ...state,
  //     [key]: false,
  //   });
  //   signUp({});
  // }, 600);

  // if (loggedIn) {
  //   return <Navigate to="/" replace={true} />;
  // }

  return (
    <div>
      {/**  <Row gutter={16}>
        <Col span={12}>
          <Button
            loading={state.facebook}
            className="facebook-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('facebook')}
          >
            Facebook
          </Button>
        </Col>
        <Col span={12}>
          <Button
            loading={state.github}
            className="github-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('github')}
          >
            Mobile No.
          </Button>
        </Col>
      </Row> */}
      <Row style={{ marginBottom: "37px" }}>
        {/* <Col span={12}>
          <Button
            loading={state.firebase}
            className="firebase-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('firebase')}
          >
            Firebase
          </Button>
        </Col> */}
        <Col span={24}>
          <Button
            loading={state.google}
            className="google-btn"
            type="primary"
            style={{ width: "100%", marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth("google")}
          >
            Google
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SocialLogin;
