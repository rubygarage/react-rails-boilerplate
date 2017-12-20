class Admin::User::UnconfirmEmail < Trailblazer::Operation
  step :set_user!
  success :unconfirm_email!

  def set_user!(options, user:, **)
    options['model'] = user
  end

  def unconfirm_email!(_options, model:, **)
    model.update(confirmed_at: nil)
  end
end
