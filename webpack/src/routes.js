import Landing from 'components/static/Landing'
import NotFound from 'components/static/NotFound'
import SignIn from 'containers/SignIn'
import SignUp from 'containers/SignUp'
import ResetPasswordRequestForm from 'containers/resetPassword/RequestForm'
import ChangePasswordForm from 'containers/resetPassword/ChangePasswordForm'
import ConfirmationInstructions from 'components/static/ConfirmationInstructions'
import Confirmation from 'containers/Confirmation'

import UserShow from 'containers/user/Show'
import UserEdit from 'containers/user/Edit'

export default [
  {
    path: '/',
    exact: true,
    component: Landing
  },
  {
    path: '/sign_in',
    exact: true,
    component: SignIn
  },
  {
    path: '/sign_up',
    exact: true,
    component: SignUp
  },
  {
    path: '/sign_up/success',
    component: ConfirmationInstructions
  },
  {
    path: '/email_confirmation/:confirmation_token',
    component: Confirmation
  },
  {
    path: '/reset_password',
    exact: true,
    component: ResetPasswordRequestForm
  },
  {
    path: '/reset_password/:reset_password_token',
    exact: true,
    component: ChangePasswordForm
  },
  {
    path: '/user/:id',
    exact: true,
    component: UserShow
  },
  {
    path: '/user/:id/edit',
    component: UserEdit
  },
  {
    path: '/*',
    component: NotFound
  }
]
