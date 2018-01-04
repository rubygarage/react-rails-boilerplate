RSpec.describe Auth::Confirmation::Create do
  let!(:params) { {} }
  let(:subject) { described_class.call(params) }
  let!(:user) { create(:user) }

  describe 'confirmation' do
    context 'valid token' do
      before do
        allow(Auth::Token::EmailConfirmation).to receive(:user_by_token) { user }
      end

      it 'confirms' do
        expect(subject).to be_success
        expect(subject['model']).to eq user
        expect(subject['model']).to be_confirmed_at
      end
    end

    context 'invalid token' do
      before do
        allow(Auth::Token::EmailConfirmation).to receive(:user_by_token) { nil }
      end

      it 'stays unconfirmed' do
        expect(subject).to be_failure
        expect(subject['model']).to be_nil
        expect(subject['model']).not_to receive(:update)
      end
    end
  end
end
