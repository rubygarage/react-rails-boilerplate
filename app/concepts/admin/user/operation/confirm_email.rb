class Admin::User::ConfirmEmail < Trailblazer::Operation
  step :set_user!
  success :confirm_email!

  def set_user!(options, user:, **)
    options['model'] = user
  end

  def confirm_email!(_options, model:, **)
    model.update(confirmed_at: Date.current) unless model.confirmed_at?
  end
end
