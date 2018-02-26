class User::Contract::Update < Reform::Form
  include Dry
  property :avatar, populator: lambda { |fragment:, **|
    self.avatar = Avatar.new(image: fragment['image']) if fragment['image']
  }

  validation :default, with: { form: true } do
    configure do
      option :form
      config.messages = :i18n
      config.namespace = :user

      def avatar_valid?(value)
        return true if value.persisted?
        attacher = ImageUploader::Attacher.new(form.avatar, :image)
        attacher.validate
      end
    end

    optional(:avatar).maybe(:avatar_valid?)
  end
end
