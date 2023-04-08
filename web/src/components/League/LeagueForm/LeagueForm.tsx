import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditLeagueById, UpdateLeagueInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormLeague = NonNullable<EditLeagueById['league']>

interface LeagueFormProps {
  league?: EditLeagueById['league']
  onSave: (data: UpdateLeagueInput, id?: FormLeague['id']) => void
  error: RWGqlError
  loading: boolean
}

const LeagueForm = (props: LeagueFormProps) => {
  const onSubmit = (data: FormLeague) => {
    props.onSave(data, props?.league?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormLeague> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.league?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.league?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="sport"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sport
        </Label>

        <TextField
          name="sport"
          defaultValue={props.league?.sport}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="sport" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LeagueForm
