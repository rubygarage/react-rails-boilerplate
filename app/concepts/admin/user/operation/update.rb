class Admin::User::Update < Trailblazer::Operation
  step :set_user!
  step Contract::Build(constant: Admin::User::Contract::Update)
  step Contract::Validate()
  step Contract::Persist()

  def set_user!(options, user:, **)
    options['model'] = user
  end
end
