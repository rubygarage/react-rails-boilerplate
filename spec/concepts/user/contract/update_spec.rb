RSpec.describe User::Contract::Update do
  let(:subject) { described_class.new(user) }
  let!(:user) { create(:user) }

  describe 'validations' do
    context 'valid params' do
      let(:valid_params) { { id: user.id, avatar: attributes_for(:avatar, :with_image).with_indifferent_access } }

      before do
        subject.validate(valid_params)
      end

      it 'is success' do
        expect(subject).to be_valid
        expect(subject.errors).to be_empty
      end
    end

    context 'invalid params' do
      let(:invalid_params) { { id: user.id, avatar: attributes_for(:avatar, :with_wrong_filetype).with_indifferent_access } }

      before do
        subject.validate(invalid_params)
      end

      it 'is failure' do
        expect(subject).not_to be_valid
        expect(subject.errors).not_to be_empty

      end
    end

    context 'no avatar params' do
      let(:params) { { id: user.id } }

      before do
        subject.validate(params)
      end

      it 'is success' do
        expect(subject).to be_valid
        expect(subject.errors).to be_empty
      end
    end
  end
end
