import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          hometitle: {
            sub: "welcome to",
            project_name: "3D Acupuncture Healthcare Data Management And Treatment System",
            instruction: "interact with the model to start"
          },
          footer_bar: {
            start_quiz: "Start Quiz"
          },
          auth_bar: {
            sign_up: "Sign Up",
            log_in: "Log In",
            menu: {
              user_records: "User Records",
              data_management: "Data Management",
              log_out: "Log Out"
            }
          },
          create_account_page: {
            title: "Create an Account",
            already_have_account: "already have an account?",
            click_here: "click here",
            fields: {
              name: "Name",
              email: "Email",
              password: "Password",
              confirm_password: "Confirm Password"
            },
            button_captions: {
              create_account: "Create account",
              sign_up_with_google: "Sign up with Google"
            },
            messages: {
              account_created: "Your account is created! Please check your email to verify your account!",
              type_in_email: "Please type in your email!",
              invalid_email: "Your email is invalid!",
              duplicated_email: "Email is already in use!",
              invalid: "Invalid!",
              fill_name: "Please fill in your name!",
              invalid_password: "Your password is invalid!",
              invalid_confirmation: "Invalid confirmation!",
            }
          },
          login_page: {
            title: "Log in",
            dont_have_account: "don't have an account?",
            click_here: "click here",
            fields: {
              email: "Email",
              password: "Password",
            },
            button_captions: {
              login: "Log in",
              sign_in_with_google: "Sign in with Google"
            },
            messages: {
              invalid_email: "Your email is invalid!",
              invalid: "Invalid!",
              invalid_password: "Your password is invalid!",
              not_verified: "Please verify your account through email!",
              not_found: "Your login information is not correct!"
            }
          }
        }
      },
      vi: {
        translation: {
          hometitle: {
            sub: "chào mừng đến với",
            project_name: "Hệ Thống Điều Trị Và Quản Lý Dữ Liệu Châm Cứu 3D",
            instruction: "tương tác với mô hình để bắt đầu"
          },
          footer_bar: {
            start_quiz: "Kiểm tra"
          },
          auth_bar: {
            sign_up: "Đăng Ký",
            log_in: "Đăng Nhập",
            menu: {
              user_records: "Cá nhân",
              data_management: "Quản lý Dữ liệu",
              log_out: "Đăng xuất"
            }
          },
          create_account_page: {
            title: "Tạo tài khoản",
            already_have_account: "đã có tài khoản?",
            click_here: "bấm vào đây",
            fields: {
              name: "Tên",
              email: "Email",
              password: "Mật khẩu",
              confirm_password: "Xác nhận mật khẩu"
            },
            button_captions: {
              create_account: "Tạo tài khoản",
              sign_up_with_google: "Đăng ký bằng tài khoản Google"
            },
            messages: {
              account_created: "Tài khoản đã được tạo thành công! Vui lòng kiểm tra Email để xác thực tài khoản!",
              type_in_email: "Vui lòng nhập Email!",
              invalid_email: "Email không hợp lệ!",
              duplicated_email: "Email đã được sử dụng!",
              invalid: "Không hợp lệ!",
              fill_name: "Vui lòng nhập tên!",
              invalid_password: "Mật khẩu không hợp lệ!",
              invalid_confirmation: "Xác thực mật khẩu không hợp lệ!",
            }
          },
          login_page: {
            title: "Đăng nhập",
            dont_have_account: "chưa có tài khoản?",
            click_here: "bấm vào đây",
            fields: {
              email: "Email",
              password: "Mật khẩu",
            },
            button_captions: {
              login: "Đăng nhập",
              sign_in_with_google: "Đăng nhập bằng tài khoản Google"
            },
            messages: {
              invalid_email: "Email không hợp lệ!",
              invalid: "không hợp lệ!",
              invalid_password: "Mật khẩu không hợp lệ!",
              not_verified: "Vui lòng xác thực tài khoản qua Email đã đăng ký!",
              not_found: "Thông tin đăng nhập không đúng!"
            }
          }
        }
      }
    }
  });

export default i18n;
