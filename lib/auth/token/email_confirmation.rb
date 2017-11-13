module Auth
  module Token
    class EmailConfirmation
      CONFIRMATION_AUD_CLAIM = 'confirmation'.freeze

      class << self
        def generate(user)
          payload = {
            aud: CONFIRMATION_AUD_CLAIM,
            sub: user.id
          }
          JWT.encode(payload, Figaro.env.jwt_signature)
        end

        def user_by_token(token)
          token = JWT.decode(token, Figaro.env.jwt_signature, true, aud: CONFIRMATION_AUD_CLAIM, verify_aud: true)
          user_id = token[0]['sub']

          User.find_by(id: user_id)
        end
      end
    end
  end
end
