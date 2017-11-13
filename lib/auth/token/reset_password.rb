module Auth
  module Token
    class ResetPassword
      RESET_PASSWORD_AUD_CLAIM = 'reset_password'.freeze

      class << self
        def generate(user)
          payload = {
            aud: RESET_PASSWORD_AUD_CLAIM,
            sub: encrypt(user.password_digest)
          }
          JWT.encode(payload, Figaro.env.jwt_signature)
        end

        def user_by_token(token)
          token = JWT.decode(token, Figaro.env.jwt_signature, true, aud: RESET_PASSWORD_AUD_CLAIM, verify_aud: true)
          password_digest = decrypt(token[0]['sub'])
          User.find_by(password_digest: password_digest)
        end

        private

        def encrypt(subject)
          cryptor.encrypt_and_sign(subject)
        end

        def decrypt(subject)
          cryptor.decrypt_and_verify(subject)
        end

        def cryptor
          secret = Rails.application.secrets.secret_key_base[0...32]
          signature_secret = Rails.application.secrets.secret_key_base

          ActiveSupport::MessageEncryptor.new(secret, signature_secret)
        end
      end
    end
  end
end
