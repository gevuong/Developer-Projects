# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: { message: "Password can't be blank" }

    # we want :password validation to pass even if @password = nil. The only time @password is not nil is when password has changed using #password setter method. If not, then @password = nil because attribute only lives in ivar, and not persisted to DB.
    validates :password, length: { minimum: 6 }, allow_nil: true

    # callback is called when AR object is instantiated using #new (i.e. User.new) or loads a record from DB (i.e. User.first). Callback generates session token only if one hasn't been set.
    after_initialize :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by_email(email)
        return user if user && user.is_password?(password)
        nil
    end

    # setter method to hash and persist pw to DB. #create factory method creates a Password object by hashing input
    def password=(password)
        @password = password # necessary to validate length of password, and ivar will not persist
        self.password_digest = BCrypt::Password.create(password)
    end

    # verify password. because password_digest is already hashed, use #new factory method, which builds a Password object from an existing, hashed password_digest
    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token
        self.session_token = User.generate_unique_session_token
        self.save!
        self.session_token
    end

    private

    # returns a 16 digit pseudorandom string
    def self.generate_unique_session_token
        new_session_token = SecureRandom.urlsafe_base64(16)
        while User.find_by_session_token(new_session_token)
            new_session_token = SecureRandom.urlsafe_base64(16)
        end
        new_session_token
    end

    # use ||= operator instead of = or ||, otherwise we will end up with a new session token every time we create a new instance of the User class. This includes finding it in the DB!
    def ensure_session_token
        self.session_token ||= User.generate_unique_session_token
    end
end
