class User::Show < Trailblazer::Operation
  step Model(User, :find_by)
end
