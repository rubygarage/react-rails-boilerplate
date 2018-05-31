class Customer::Policies::AvatarPolicy < Customer::Policies::ApplicationPolicy
  def destroy?
    user.id == record.user.id
  end
end
