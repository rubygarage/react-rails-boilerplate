require "reform/form/dry"

class BaseForm < Reform::Form
  include Reform::Form::Dry

  validation :default, with: { form: true } do
    configure do
      option :form
      config.messages = :i18n
    end
  end
end
