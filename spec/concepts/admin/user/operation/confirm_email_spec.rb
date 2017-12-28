require 'rails_helper'

RSpec.describe Admin::User::ConfirmEmail do
  let(:params) { {} }
  let(:subject) { described_class.call(params, user: user) }
  let(:user) { create(:user, confirmed_at: nil) }

  describe 'confirmation' do
    it 'sets model as user' do
      expect(subject['model']).to eq user
    end

    it 'updates confirmation' do
      expect(subject['model']).to be_confirmed_at
    end
  end
end
