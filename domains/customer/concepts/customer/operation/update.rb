class Storefront::Concepts::User::Operation::Update < Trailblazer::Operation
  step Model(Storefront::Models::User, :find_by)
  step Policy::Pundit(Storefront::Policies::UserPolicy, :update?)
  step Contract::Build(constant: Storefront::Concepts::User::Contract::Update)
  step Contract::Validate()
  step Contract::Persist()
end
