class Auth::Registration::Create < Trailblazer::Operation
  DEFAULT_PROVIDER = 'email'
  step :set_default_provider!
  step Model(User, :new)
  step Contract::Build(constant: Auth::Registration::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
  step :send_confirmation_email!

  def set_default_provider!(options, **)
    options['params'][:provider] ||= DEFAULT_PROVIDER
  end

  def send_confirmation_email!(_options, model:, **)
    ConfirmationMailer.confirmation_email(model).deliver_later
  end
end
