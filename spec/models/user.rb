require 'rails_helper'

RSpec.describe User do
  let(:user) { create(:user) }

  describe 'ActiveRecord associations' do
    it { expect(user).to have_one(:avatar) }
  end

  describe 'ActiveRecord secure password' do
    it { expect(user).to have_secure_password }
  end
end
