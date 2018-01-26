require 'rails_helper'

RSpec.describe Avatar do
  let(:avatar) { create(:avatar) }

  describe 'ActiveRecord associations' do
    it { expect(avatar).to belong_to(:user) }
  end
end
