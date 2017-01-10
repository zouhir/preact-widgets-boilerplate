import { h, Component } from 'preact'
import style from './style.scss'

export default class SigninWidget extends Component {
  render () {
    return (
      <div class={style.signinWidget}>
        <h3>External Signin Widget</h3>

        <a href='' class={`${style.basebtn} ${style.google}`}>Continue using Google</a>
        <a href='' class={`${style.basebtn} ${style.facebook}`}>Continue using Facebook</a>
        <hr />
        <input type='text' placeholder='Email address' />
        <input type='password' placeholder='Password' />
        <div class={style.wrapper}>
          <a href='#' class={`${style.basebtn} ${style.default}`}>Sign in</a>
          <a class={style.formFooter}>Forgot your password</a>
          <a class={style.formFooter}>I don't have an account</a>
        </div>
      </div>
    )
  }
}
