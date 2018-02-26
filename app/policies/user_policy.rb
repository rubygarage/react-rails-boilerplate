class UserPolicy < ApplicationPolicy
  def show?
    user.id == record.id
  end

  def update?
    user.id == record.id
  end
end
