class Customer::Concepts::CustomerAvatar::Operation::Destroy < Trailblazer::Operation
  step :set_model!
  step Policy::Pundit(Customer::Policies::CustomerAvatarPolicy, :destroy?)
  step :destroy_avatar!

  def set_model!(options, params:, **)
    options['model'] = Customer::Models::CustomerAvatar.find_by(user_id: params['user_id'])
  end

  def destroy_avatar!(options, *)
    options['model'].destroy
  end
end
