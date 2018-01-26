RSpec.describe Avatar::Destroy do
  let(:subject) { described_class.call(params, { 'current_user' => user}) }
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }
  let!(:other_user_avatar) { create(:avatar, user: other_user)}
  let(:params) { { 'user_id' => user.id } }

  context 'user has avatar' do
    let!(:avatar) { create(:avatar, user: user)}

    it 'destroys user avatar' do
      expect(subject['model']).to eq avatar
      expect(subject['model'].persisted?).to be false
      expect(subject).to be_success
    end
  end

  context 'user has no avatar' do
    it 'operation fails' do
      expect(subject['model']).to eq nil
      expect(subject).to be_failure
    end
  end

  describe "can not delete other user's avatar" do
    let(:params) { { 'user_id' => other_user.id } }
    it 'operation fails' do
      expect(subject['model']).to eq other_user_avatar
      expect(subject['model'].persisted?).to be true
      expect(subject).to be_failure
    end
  end
end
