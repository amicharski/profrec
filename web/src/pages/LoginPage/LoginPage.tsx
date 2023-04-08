import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const WELCOME_MESSAGE = 'Welcome back!'
const REDIRECT = routes.home()

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth()
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  )

  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(routes.home())
    }
  }, [isAuthenticated, shouldShowWebAuthn])

  // if WebAuthn is enabled, show the prompt as soon as the page loads
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate()
    }
  }, [loading, isAuthenticated])

  // focus on the username field as soon as the page loads
  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current && usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const webAuthnSupported = await webAuthn.isSupported()

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true)
    }
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message)
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error)
    } else {
      // user logged in
      if (webAuthnSupported) {
        setShowWebAuthn(true)
      } else {
        toast.success(WELCOME_MESSAGE)
      }
    }
  }

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate()
      await reauthenticate()
      toast.success(WELCOME_MESSAGE)
      navigate(routes.home())
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        toast.error(
          'Device not found, log in with Username/Password to continue'
        )
        setShowWebAuthn(false)
      } else {
        toast.error(e.message)
      }
    }
  }

  const onRegister = async () => {
    try {
      await webAuthn.register()
      toast.success(WELCOME_MESSAGE)
      navigate(routes.home())
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onSkip = () => {
    toast.success(WELCOME_MESSAGE)
    setShouldShowWebAuthn(false)
  }

  const AuthWebAuthnPrompt = () => {
    return (
      <div className="mx-4 mt-6 mb-4 leading-snug">
        <h2 className="mb-4 text-4xl font-bold">WebAuthn Login Enabled</h2>
        <p>Log in with your fingerprint, face or PIN</p>
        <div className="my-3 mx-2 flex justify-center">
          <button
            type="button"
            className="dark:bg-primary hidden rounded px-6 py-2 font-semibold dark:text-gray-900 lg:block"
            onClick={onAuthenticate}
          >
            Open Authenticator
          </button>
        </div>
      </div>
    )
  }

  const RegisterWebAuthnPrompt = () => (
    <div className="mx-4 mt-6 mb-4 leading-snug">
      <h2 className="mb-4 text-4xl font-bold">No more Passwords!</h2>
      <p>
        Depending on your device you can log in with your fingerprint, face or
        PIN next time.
      </p>
      <div className="my-3 mx-2 flex justify-center">
        <button
          type="button"
          className="dark:bg-primary hidden rounded px-6 py-2 font-semibold dark:text-gray-900 lg:block"
          onClick={onRegister}
        >
          Turn On
        </button>
        <button
          type="button"
          className="dark:text-primary hidden rounded px-6 py-2 font-semibold dark:bg-slate-900 lg:block"
          onClick={onSkip}
        >
          Skip for now
        </button>
      </div>
    </div>
  )

  const PasswordForm = () => (
    <Form onSubmit={onSubmit} className="mt-4 box-border text-sm">
      <Label
        name="username"
        className="mt-6 block text-left font-semibold text-slate-300"
        errorClassName="block mt-6 text-slate-300 font-semibold text-left"
      >
        Username
      </Label>
      <TextField
        name="username"
        className="mt-2 block w-full rounded border border-solid border-slate-100 p-2 text-slate-900 outline-0"
        errorClassName="block mt-2 w-full p-2 border border-solid border-slate-100 text-slate-900 rounded outline-0"
        ref={usernameRef}
        autoFocus
        validation={{
          required: {
            value: true,
            message: 'Username is required',
          },
        }}
      />

      <FieldError
        name="username"
        className="mt-1 block text-xs font-semibold uppercase"
      />

      <Label
        name="password"
        className="mt-6 block text-left font-semibold text-slate-300"
        errorClassName="block mt-6 text-slate-300 font-semibold text-left"
      >
        Password
      </Label>
      <PasswordField
        name="password"
        className="mt-2 block w-full rounded border border-solid border-slate-100 p-2 text-slate-900 outline-0"
        errorClassName="block mt-2 w-full p-2 border border-solid border-slate-100 text-slate-900 rounded outline-0"
        autoComplete="current-password"
        validation={{
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
      />

      <div className="mt-1 text-right text-xs text-slate-400">
        <Link to={routes.forgotPassword()} className="">
          Forgot Password?
        </Link>
      </div>

      <FieldError
        name="password"
        className="mt-1 block text-xs font-semibold uppercase"
      />

      <div className="my-3 mx-2 flex justify-center">
        <Submit className="dark:bg-primary hidden rounded px-6 py-2 font-semibold dark:text-gray-900 lg:block">
          Login
        </Submit>
      </div>
    </Form>
  )

  const formToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return <AuthWebAuthnPrompt />
      } else {
        return <RegisterWebAuthnPrompt />
      }
    } else {
      return <PasswordForm />
    }
  }

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <div className="mt-4 basis-full text-center text-sm text-slate-400">
            <span>or login with </span>{' '}
            <a href="?type=password" className="text-primary underline">
              username and password
            </a>
          </div>
        )
      }
    } else {
      return (
        <div className="my-4 basis-full text-center text-sm text-slate-400">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="text-primary underline">
            Sign up!
          </Link>
        </div>
      )
    }
  }

  if (loading) {
    return null
  }

  return (
    <div className="h-screen w-screen bg-slate-800">
      <MetaTags title="Login" />

      <main className="ml-4 mr-4 pb-4">
        <Toaster
          toastOptions={{
            className: 'bg-slate-900 text-primary',
            duration: 60000,
          }}
        />
        <div className="mx-16 my-auto flex w-96 flex-wrap items-center justify-center bg-slate-700 text-center">
          <div className="w-full overflow-hidden rounded-lg border border-slate-400">
            <header className="bg-slate-900 px-3 py-4 text-slate-400">
              <h2 className="text-lg font-semibold">Login</h2>
            </header>

            <div className="bg-slate-700 p-4">
              <div className="box-border text-sm">{formToRender()}</div>
            </div>
          </div>
          {linkToRender()}
        </div>
      </main>
    </div>
  )
}

export default LoginPage
