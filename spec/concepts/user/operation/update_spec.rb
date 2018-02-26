RSpec.describe User::Update do
  let(:subject) { described_class.call(params, 'current_user' => user) }
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }

  describe 'update user' do
    let(:params) { { id: user.id, avatar: { image: 'image' } } }

    it 'updates user' do
      expect(subject['model']).to eq user
      expect(subject).to be_success
    end
  end

  describe 'other user' do
    let(:params) { { id: other_user.id, avatar: { image: 'image' } } }

    it 'does not allow to access other user' do
      expect(subject['model']).to eq other_user
      expect(subject).to be_failure
    end
  end
end
