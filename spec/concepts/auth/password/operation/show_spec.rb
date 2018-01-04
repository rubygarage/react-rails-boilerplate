RSpec.describe Auth::Password::Show do
  let(:params) { ActionController::Parameters.new }
  let(:subject) { described_class.call(params) }
  let(:user) { build(:user) }

  describe 'validate token' do
    context 'valid token' do
      it 'is valid' do
        allow(Auth::Token::ResetPassword).to receive(:user_by_token) { user }
        expect(subject).to be_success
      end
    end

    context 'invalid token' do
      it 'fails' do
        allow(Auth::Token::ResetPassword).to receive(:user_by_token) { nil }
        expect(subject).not_to be_success
      end
    end
  end
end
