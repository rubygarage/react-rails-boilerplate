RSpec.describe Auth::Registration::Contract::Create do
  let(:missed_params) { { username: user.username, password: user.password } }
  let(:subject) { described_class.new(User.new) }
  let(:user) { build(:user) }
  let(:valid_params) do
    {
      username: user.username,
      password: user.password,
      password_confirmation: user.password,
      email: user.email,
      provider: 'email'
    }
  end

  describe 'user registration' do
    it 'validates user params' do
      expect(subject.validate(valid_params)).to eq true
    end

    it 'fails on missed params' do
      expect(subject.validate(missed_params)).to eq false
      expect(subject.errors[:password_confirmation]).to include "doesn't match"
      expect(subject.errors[:email]).to include 'must be filled'
    end

    context 'persisted user' do
      let!(:persisted_user) { create(:user) }
      before do
        subject.validate(
          username: persisted_user.username,
          email: persisted_user.email
        )
      end

      it 'fails' do
        %i[email username].each do |key|
          expect(subject.errors[key]).to include 'is not unique'
        end
      end
    end
  end
end
