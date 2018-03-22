require 'rails_helper'

RSpec.describe ImageUploader do
  let(:subject) { described_class.new(:store) }
  let(:image) { File.open('spec/support/test_avatar.jpg') }
  let!(:user) { create(:user) }

  before :all do
    described_class.storages = {
      cache: Shrine::Storage::Memory.new,
      store: Shrine::Storage::Memory.new
    }
  end

  describe 'uploader process works fine' do
    it 'resize image', shrine: true do
      expect_any_instance_of(described_class).to receive(:resize_to_limit!).and_call_original

      Sidekiq::Testing.inline! do
        # #reload is necessary because Shrine's after_commit hook
        # leaves #create result in inconsistent state
        Avatar.create(image: image, user: user).reload
      end
    end
  end

  describe 'uploader processes the file' do
    before do
      allow_any_instance_of(described_class).to receive(:process).and_wrap_original do |_m, io, context|
        { original: io, thumb: io.download } if context[:phase] == :store
      end
    end

    it 'has original and thumb versions', shrine: true do
      Sidekiq::Testing.inline! do
        # #reload is necessary because Shrine's after_commit hook
        # leaves #create result in inconsistent state
        avatar = Avatar.create(image: image, user: user).reload
        expect(avatar.image.keys).to eq %i[original thumb]
      end
    end
  end

  describe 'uploader validates the file mime-type' do
    let(:invalid_image) { File.open('spec/support/test_avatar.txt') }

    it 'successfully validates with right mime-type', shrine: true do
      avatar = Avatar.new(image: image, user: user)
      expect(avatar).to be_valid
    end

    it 'fails validation with wrong mime-type', shrine: true do
      avatar = Avatar.new(image: invalid_image, user: user)
      expect(avatar).not_to be_valid
    end
  end
end
