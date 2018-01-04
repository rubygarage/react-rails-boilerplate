RSpec.describe Admin::User::UnconfirmEmail do
  let(:params) { {} }
  let(:subject) { described_class.call(params, user: user) }
  let(:user) { create(:user, confirmed_at: Date.current) }

  describe 'unconfirmation' do
    it 'sets model as user' do
      expect(subject['model']).to eq user
    end

    it 'resets confirmation' do
      expect(subject['model']).not_to be_confirmed_at
    end
  end
end
