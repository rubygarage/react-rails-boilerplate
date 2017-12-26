require 'rails_helper'

RSpec.describe Admin::User::ConfirmEmail do
  let!(:params) { Hash.new }
  let(:subject) { described_class.call(params, user: user) }
  let(:user) { FactoryGirl.create(:user, confirmed_at: nil) }

  describe 'confirmation' do
    it 'setup user as model' do
      expect(subject['model']).to eq user
    end

    it 'update confirmed_at' do
      expect(subject['model']).to be_confirmed_at
    end
  end
end
