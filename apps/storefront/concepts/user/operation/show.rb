class User::Show < Trailblazer::Operation
  step Model(User, :find_by)
  step Policy::Pundit(UserPolicy, :show?)
end
