class Storefront::Policies::UserPolicy < Storefront::Policies::ApplicationPolicy
  def show?
    user.id == record.id
  end

  def update?
    user.id == record.id
  end
end
