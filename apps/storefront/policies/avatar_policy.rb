class Storefront::Policies::AvatarPolicy < Storefront::Policies::ApplicationPolicy
  def destroy?
    user.id == record.user.id
  end
end
