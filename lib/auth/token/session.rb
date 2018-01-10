module Auth
  module Token
    class Session
      SESSION_AUD_CLAIM = 'session'.freeze
      REMEMBER_ME_EXPIRATION_TIME = 2.weeks
      DEFAULT_EXPIRATION_TIME = 1.day

      class << self
        def generate(user, remember_me = false)
          expiration_interval = remember_me ? REMEMBER_ME_EXPIRATION_TIME : DEFAULT_EXPIRATION_TIME

          payload = {
            aud: SESSION_AUD_CLAIM,
            sub: user.id,
            exp: (Time.current + expiration_interval).to_i
          }
          JWT.encode(payload, Figaro.env.jwt_signature)
        end

        def user_by_token(token)
          token = JWT.decode(token, Figaro.env.jwt_signature, true, aud: SESSION_AUD_CLAIM, verify_aud: true)
          user_id = token[0]['sub']

          User.find_by(id: user_id)
        end
      end
    end
  end
end
