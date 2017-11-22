# == Schema Information
#
# Table name: campervan_rental_requests
#
#  id           :integer          not null, primary key
#  start_date   :date             not null
#  end_date     :date             not null
#  campervan_id :integer          not null
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class CampervanRentalRequest < ApplicationRecord
  validates :campervan_id, :start_date, :end_date, presence: true
  validates :status, inclusion: %w(APPROVED DENIED PENDING)
  validate :does_not_overlap_approved_request
  validate :start_must_come_before_end

  # Remember, 'belongs_to' association is a class method, where first arg is association instance method, and second arg is options hash. Also, Rails 5 auto validates association methods.
  belongs_to :campervan,
  primary_key: :id,
  foreign_key: :campervan_id,
  class_name: :Campervan

  after_initialize :assign_pending_status

  def assign_pending_status
    self.status ||= "PENDING"
  end

  # A single campervan cannot be rented out to two people at once! Write a custom validation fo this. Get all requests that overlap with the ones we are trying to validate. Should return an ActiveRecord Relation object so we can chain more methods to it later.
  def overlapping_requests
    CampervanRentalRequest
      .where.not(id: self.id) # current request we are trying to validate should not appear in list of #overlapping_requests.
      .where(campervan_id: campervan.id) # returns campervan
      .where(<<-SQL, start_date: start_date, end_date: end_date)
        NOT( (start_date > :end_date OR end_date < :start_date) )
      SQL
  end

  def overlapping_approved_requests
    overlapping_requests.where(status: "APPROVED")
  end

  def does_not_overlap_approved_request
    # A denied request doesn't need to be checked. A pending request
    # should be checked; users shouldn't be able to make requests for
    # periods during which a campervan has already been spoken for.
    return if self.status == "DENIED"

    if overlapping_approved_requests.exists?
      # Use this method when you want to say that the object is invalid. Since errors[:base] is an array, you can simply add a string to it and it will be used as an error message.
      errors[:base] << "Request conflicts with existing approved request"
    end
  end

  def overlapping_pending_requests
    overlapping_requests.where(status: "PENDING")
  end

  # All the work of #approve! should occur in a single transaction. when you want to make several related updates to the DB, you want to do them grouped in a transaction.
  def approve!
    transaction do
      self.status = "APPROVED"
      self.save

      # when we approve this request, we reject all other overlapping requests for this cat. #update_all updates all records with details given
      overlapping_pending_requests.update_all(status: "DENIED")
    end
  end

  def denied?
    self.status == "DENIED"
  end

  def deny!
    self.status = "DENIED"
    self.save
  end

  def pending?
    self.status == "PENDING"
  end

  def start_must_come_before_end
    return if start_date < end_date
    errors[:start_date] << "must come before end date"
    errors[:end_date] << "must come before start date"
  end
end
