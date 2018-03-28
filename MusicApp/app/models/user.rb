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

    # we want :password validation to pass even if @password = nil. The only time @password is not nil is when password has changed using #password setter method. If not, then @password = nil because attribute only lives in an ivar, and not persisted in DB. 
    validates :password, length: { minimum: 6 }, allow_nil: true 

    # only generate session token for User only if one hasn't been set
    after_initialize :ensure_session_token

    attr_reader :password

    # setter method to hash password and persist to DB. #create factory method creates a Password object by hashing input
    def password=(password)
        @password = password # necessary to validate length of password, and ivar will not persist
        self.password_digest = BCrypt::Password.create(password)
    end 

    # verify password. because password_digest is already hashed, use #new factory method, which builds a Password object from an existing, hashed password_digest
    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end 

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return user if user && user.is_password?(password)
        nil 
    end 

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16) # generates a random urlsafe base64 string
    end 

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end 

    private 
    def ensure_session_token 
        user.session_token ||= User.generate_session_token
    end 
end
