RSpec.describe User::Contract::Update do
  let(:subject) { described_class.new(user) }
  let!(:user) { create(:user) }

  describe 'validations' do
    context 'valid params' do
      let(:valid_params) { { id: user.id, avatar: { image: 'image' }  } }

      before do
        subject.validate(valid_params)
      end

      it 'is success' do
        expect(subject).to be_valid
        expect(subject.errors).to be_empty
      end
    end
  end
end
