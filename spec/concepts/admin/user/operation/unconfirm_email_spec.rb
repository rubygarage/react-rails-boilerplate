require 'rails_helper'

RSpec.describe Admin::User::UnconfirmEmail do
  let!(:params) { Hash.new }
  let(:subject) { described_class.call(params, user: user) }
  let(:user) { create(:user, confirmed_at: Date.current) }

  describe 'unconfirmation' do
    it 'setup user as model' do
      expect(subject['model']).to eq user
    end

    it 'reset confirmed_at' do
      expect(subject['model']).not_to be_confirmed_at
    end
  end
end
