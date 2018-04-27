RSpec.describe Admin::Auth::Session::Delete do
  subject { described_class.call({}, cookies) }
  let(:cookies) { { cookies: { authToken: 'token' } } }

  describe 'delete session' do
    it 'deletes session' do
      expect(subject[:cookies]).not_to have_key(:authToken)
      expect(subject).to be_success
    end
  end
end
