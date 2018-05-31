class Storefront::Concepts::User::Operation::Show < Trailblazer::Operation
  step Model(Storefront::Models::User, :find_by)
  step Policy::Pundit(Storefront::Policies::UserPolicy, :show?)
end
