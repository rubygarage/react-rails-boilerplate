class Storefront::Concepts::CurrentProfile::Operation::Show < Trailblazer::Operation
  step :set_profile!

  def set_profile!(options, params:, current_user:, **)
    binding.pry
  end
end
