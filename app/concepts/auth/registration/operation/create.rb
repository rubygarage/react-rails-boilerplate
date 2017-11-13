class Auth::Registration::Create < Trailblazer::Operation
  step Model(User, :new)
  step Contract::Build(constant: Auth::Registration::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
  step :send_confirmation_email!

  def send_confirmation_email!(_options, model:, **)
    ConfirmationMailer.confirmation_email(model).deliver_later
  end
end
