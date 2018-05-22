class Avatar::Destroy < Trailblazer::Operation
  step :set_model!
  step Policy::Pundit(AvatarPolicy, :destroy?)
  step :destroy_avatar!

  def set_model!(options, params:, **)
    options['model'] = Avatar.find_by(user_id: params['user_id'])
  end

  def destroy_avatar!(options, *)
    options['model'].destroy
  end
end
