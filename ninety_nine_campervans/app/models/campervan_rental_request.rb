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
    CampervanRentalRequest.where.not(id: self.id) # current request we are trying to validate should not appear in list of #overlapping_requests.
    .where(campervan_id: campervan.id) # returns campervan
    .where(<<-SQL, start_date: start_date, end_date: end_date)
      NOT( (start_date > :end_date OR end_date < :start_date) )
    SQL
  end

  def overlapping_approved_requests
    overlapping_requests.where(status: "APPROVED")
  end

  def does_not_overlap_approved_request
    overlapping_approved_requests.exists?
  end

  # All the work of #approvec! should occur in a single transaction
  def approve!
    self.status = "APPROVED"
    self.save
  end

  def overlapping_pending_requests
    overlapping_requests.where(status: "PENDING")
  end

  def deny!
    self.status = "DENIED"
    self.save
  end
end
