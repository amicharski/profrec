import {
  CreateLeagueMutation,
  CreateLeagueMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  Label,
  SelectField,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_LEAGUE = gql`
  mutation CreateLeagueMutation($input: CreateLeagueInput!) {
    createLeague(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  description: string
  sport: string
}

const NewLeaguePage = () => {
  const [create] = useMutation<
    CreateLeagueMutation,
    CreateLeagueMutationVariables
  >(CREATE_LEAGUE)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
    navigate(routes.LeaguesPage())
  }

  return (
    <>
      <MetaTags title="NewLeague" description="NewLeague page" />

      <section className="dark_text-gray-50 p-6 dark:bg-gray-800">
        <Form
          onSubmit={onSubmit}
          className="ng-untouched ng-pristine ng-valid container mx-auto flex flex-col space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm dark:bg-gray-900">
            <div className="col-span-full space-y-2 lg:col-span-1">
              <p className="font-medium">Basic Information</p>
              <p className="font-xs">
                This is where you put in basic information regarding your
                league&apos;s name, description, and sport
              </p>
            </div>
            <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <Label name="name" errorClassName="error" className="text-sm">
                  League Name
                </Label>{' '}
                <TextField
                  name="name"
                  validation={{
                    required: true,
                    pattern: {
                      value: /^[A-Za-z ]{6,}$/,
                      message:
                        'Use alphabetic characters and spaces only, and this must be at least 6 characters',
                    },
                  }}
                  errorClassName="error"
                  className="w-full rounded-md focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                />
                <div className="text-red-500">
                  <FieldError name="name" className="error" />
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label name="sport" errorClassName="error" className="text-sm">
                  Sport
                </Label>
                <SelectField
                  name="sport"
                  validation={{
                    required: true,
                    validate: {
                      matchesInitialValue: (value) => {
                        return (
                          value !== 'Please select an option' ||
                          'Select an option'
                        )
                      },
                    },
                  }}
                  className="w-full rounded-md focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                >
                  <option value="BASKETBALL">Basketball</option>
                  <option value="FOOTBALL">Football</option>
                  <option value="BASEBALL">Baseball</option>
                </SelectField>
                <div className="text-red-500">
                  <FieldError name="sport" className="error" />
                </div>
              </div>
              <div className="col-span-full sm:col-span-6">
                <Label
                  name="description"
                  errorClassName="error"
                  className="text-sm"
                >
                  League Description
                </Label>{' '}
                <TextAreaField
                  name="description"
                  validation={{
                    required: true,
                    pattern: {
                      value: /^.{20,}$/,
                      message: 'Minimum of 20 characters',
                    },
                  }}
                  errorClassName="error"
                  className="w-full rounded-md focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                />
                <div className="text-red-500">
                  <FieldError name="description" className="error" />
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <a href="/">
                  <Submit className="dark:bg-primary hidden rounded px-6 py-2 font-semibold dark:text-gray-900 lg:block">
                    Create league
                  </Submit>
                </a>
              </div>
            </div>
          </fieldset>
        </Form>
      </section>
    </>
  )
}

export default NewLeaguePage
