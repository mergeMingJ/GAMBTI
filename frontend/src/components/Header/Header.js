import React, { useContext } from 'react';
import styles from './Header.module.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import { useHistory } from 'react-router';
import routerInfo from 'src/constants/routerInfo';
import Button from '@material-ui/core/Button';
import fire from 'src/fire';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { UserContext } from 'src/Context/UserContext';

export default function Header({ isLogin }) {
  const history = useHistory();
  const user = useContext(UserContext);
  const [isShownNoti, setIsShownNoti] = React.useState(false);

  // 로그아웃
  const logout = (event) => {
    fire.auth
      .signOut()
      .then(() => {
        history.push('/');
        window.localStorage.clear();
        alert('로그아웃 되었습니다 !!');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div
          className={styles.header_logo}
          onClick={() => {
            history.push(routerInfo.PAGE_URLS.HOME);
          }}
        >
          <img className={styles.header_logo_icon} src="/images/gambti_icon.png" alt="icon" />
          <img className={styles.header_logo_text} src="/images/gambti_logo.png" alt="logo" />
        </div>
      </div>
      <div className={styles.header_center}>
        <div className={styles.search_icon}>
          <SearchIcon />
        </div>
        <InputBase
          className={styles.input_root}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>

      <div className={styles.header_right}>
        {/* 로그아웃 상태 */}
        {!isLogin && (
          <>
            {/* 로그인 버튼 */}
            <div
              className={styles.header_right_item}
              style={{ height: '54px', width: '65px' }}
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.LOGIN);
              }}
            >
              <div className={styles.header_right_account_button}>Login</div>
            </div>
            {/* 회원가입 버튼 */}
            <div
              className={styles.header_right_item}
              style={{ height: '54px', width: '65px' }}
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.CHECK_GAMBTI);
              }}
            >
              <div className={styles.header_right_account_button}>Sign Up</div>
            </div>
          </>
        )}
        {/* 로그인 상태 */}
        {isLogin && (
          <>
            {/* 알림 버튼 */}
            <div
              className={styles.header_right_item}
              onMouseEnter={() => setIsShownNoti(true)}
              onMouseLeave={() => setIsShownNoti(false)}
            >
              <NotificationsIcon
                className={styles.header_right_icon}
                style={{ color: '#d1d1d1' }}
              />
              {isShownNoti && <div className={styles.textarea}>Notifications</div>}
            </div>
            {/* 프로필 버튼 */}
            <div className={styles.header_right_item}>
              <div className={styles.dropdown}>
                <AvatarComp
                  className={styles.dropbtn}
                  size="xsmall"
                  textvalue={user.nickName.substring(0, 1)}
                ></AvatarComp>
                <div className={styles.dropdown_content}>
                  <div className={styles.dropdown_menu}>
                    <p>
                      <FaceIcon />
                    </p>
                    <p>Profile</p>
                  </div>
                  <div onClick={logout} className={styles.dropdown_menu}>
                    <p>
                      <ExitToAppIcon />
                    </p>
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
